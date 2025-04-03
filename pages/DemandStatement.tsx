import React, { useEffect, useState } from "react";
import TopBanner from "../components/CommonComponents/TopBanner";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { AttchmentIcon, CloseIcon, FaDollar } from "../components/shared/Icons";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "../components/CommonComponents/Button";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_DEMAND_REQUEST } from "../graphql/mutations/DemandMutations";
import SearchTextBox from "../components/Condo/SearchTextBox";
import { GET_ALL_LEGALENTITY } from "../graphql/queries/LegalEntityQueries";
import apiClient from "../apollo/apiClient";
import { GET_ALL_MASTER } from "../graphql/queries/AddressMasterQueries";

const validationSchema = Yup.object({
  requestorType: Yup.string().required("Request Type is Required"),
  associationName: Yup.string().required("Name is Required"),
  propertyAddress: Yup.string().required("Address is Required"),
  requesterFirstName: Yup.string().required("First Name is Required"),
  requesterLastName: Yup.string().required("Last Name is Required"),
  requesterCompany: Yup.string().required("Company Name is Required"),
  escrowNumber: Yup.string().required("Escrow Number is Required"),
  requesterEmail: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  requesterPhone: Yup.string().required("Phone Number is Required"),
  buyerFirstName: Yup.string().required("First Name is Required"),
  buyerLastName: Yup.string().required("Last Name is Required"),
  buyerEmail: Yup.string().email("Invalid email").required("Email is Required"),
  buyerPhone: Yup.string().required("Phone Number is Required"),
  closingDate: Yup.string().required("Closing Date is Required"),
  orderType: Yup.string().required("Order Type is Required"),
});

function DemandStatement() {
  const { setBreadcrumbs } = useBreadcrumbs();
  const [files, setFiles] = useState<File[]>([]);
  const [isPayment, setIsPayment] = useState(false);

  /* GQL mutation calling for POST */
  const [
    PostDemandStatementRequest,
    { data: addData, loading: demandStatementLoading, error },
  ] = useMutation(CREATE_DEMAND_REQUEST, {
    onCompleted: () => {
      // refetch();
    },
  });

  // funstion for handle form
  const handleSubmit = async () => {
    // Formulate payload for the GraphQL request
    const payload = {
      amountCharged: parseFloat(formik?.values?.price), // Ensure it's a number
      attachments:
        formik?.values?.attachments?.map((file) => ({
          fileName: file.name,
          fileUrl: file.url || "", // Adapt based on actual file structure
          fileType: file.type, // Adapt based on your file structure
        })) || [],
      buyer: {
        firstName: formik?.values?.buyerFirstName,
        lastName: formik?.values?.buyerLastName,
        email: formik?.values?.buyerEmail,
        phone: {
          number: formik?.values?.buyerPhone,
        },
      },
      closingDate: formik?.values?.closingDate || null,
      demandRequestorType: formik?.values?.requestorType || "Escrow Company",
      escrowNumber: formik?.values?.escrowNumber,
      legalEntityCode: formik?.values?.associationName || "",
      legalEntityId: formik?.values?.associationName || "",
      legalEntityName: formik?.values?.associationName,
      orderType: formik?.values?.orderType || "Normal",
      paymentStatus: "Pending",
      propertyAddress: {
        address: formik?.values?.propertyAddress,
      },
      requestor: {
        firstName: formik?.values?.requesterFirstName,
        lastName: formik?.values?.requesterLastName,
        companyName: formik?.values?.requesterCompany,
        email: formik?.values?.requesterEmail,
        phone: {
          number: formik?.values?.requesterPhone,
        },
      },
    };
    // console.log("payload", payload);
    try {
      // Await the GraphQL mutation request
      const response = await PostDemandStatementRequest({
        variables: {
          request: {
            requestParam: payload,
            requestSubType: "Add",
            requestType: "Demand Request",
          },
        },
      });
      // showToast(
      //   "success",
      //   response?.data?.?.createARCSubmittalProcess
      //     ?.message || "Request submitted successfully"
      // );
    } catch (error) {
      // showToast("error", error?.message || "An unexpected error occurred");
      console.log(error?.message || "An unexpected error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      requestorType: "",
      associationName: "",
      propertyAddress: "",
      requesterFirstName: "",
      requesterLastName: "",
      requesterCompany: "",
      escrowNumber: "",
      requesterEmail: "",
      requesterPhone: "",
      buyerFirstName: "",
      buyerLastName: "",
      buyerEmail: "",
      buyerPhone: "",
      closingDate: "",
      orderType: "Normal",
      attachments: [],
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "PropVivo", href: "/" },
      { name: "Request Document" },
      { name: "Demand Request" },
    ]);
  }, [setBreadcrumbs]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles([...files, ...newFiles]);
      formik.setFieldValue("attachments", [...files, ...newFiles]);
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    formik.setFieldValue("attachments", updatedFiles);
  };

  //Change status isPayment
  const handleProceedToPay = () => {
    setIsPayment(true);
  };

  //GQL Query Calling for legalEntity
  const { data: getAllLegalEntityData, loading: loadinglegalEntityList } =
    useQuery(GET_ALL_LEGALENTITY, {
      variables: {
        request: {
          pageCriteria: {
            enablePage: false,
            pageSize: 10,
            skip: 0,
          },
          requestParam: {},
          requestSubType: "List",
          requestType: "LegalEntity",
        },
      },
      client: apiClient,
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-and-network",
    });
  const legalEntityList =
    getAllLegalEntityData?.legalEntityQueries?.getAllLegalEntity;
  // console.log("legalEntityList", legalEntityList);

  const { data: getAllAddressMster, loading: addressDataLoading } = useQuery(
    GET_ALL_MASTER,
    {
      variables: {
        request: {
          pageCriteria: {
            enablePage: false,
            pageSize: 10,
            skip: 0,
          },
          requestSubType: "List",
          requestType: "AddressMst",
          requestParam: {},
        },
      },
      client: apiClient,
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-and-network",
    }
  );
  const addresss = getAllAddressMster?.addressMstQueries?.getAddressMst;
  // console.log("addresss",addresss)

  useEffect(() => {
    const demandStatementFee = formik.values.orderType === "Rush" ? 200 : 100;
    const transferFee = 10;
    const totalAmount = (demandStatementFee + transferFee).toFixed(2);
    formik.setFieldValue("price", totalAmount);
  }, [formik.values.orderType]);

  return (
    <>
      <TopBanner backgroundImage="./img/Banner.jpg" title="Demand Statement" />
      <div className="max-w-3xl mx-auto my-14">
        <FormikProvider value={formik}>
          {/* {console.log("formik values", formik?.values)} */}
          <Form className="">
            <div className="w-full space-y-6">
              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Requestor Type <span className="text-red-500">*</span>
                </label>
                <div className="col-span-2">
                  <div className="flex items-center border-b border-gray-o-60">
                    <Field
                      as="select"
                      name="requestorType"
                      className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                    >
                      <option value="">Select</option>
                      <option value="Escrow Company">Escrow Company</option>
                      <option value="Title Company">Title Company</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 absolute"
                  />
                </div>
              </div>

              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Association Information{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="col-span-4 space-y-6">
                  {/* <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        id="name"
                        name="associationName"
                        placeholder="Association Name"
                        className="w-full bg-transparent py-1 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="associationName"
                      component="div"
                      className="text-red-500 absolute"
                    />
                  </div> */}

                  <SearchTextBox
                    // title={""}
                    name={"associationName"}
                    placeholder={"Association Name"}
                    maxLength={50}
                    errors={
                      formik.errors.associationName &&
                      formik.touched.associationName &&
                      formik.errors.associationName
                    }
                    searchAfterChar={3}
                    data={legalEntityList?.data?.legalEntities?.map((res) => {
                      return {
                        code: res?.companyCode || "",
                        name: res?.legalEntityName || "",
                        id: res?.legalEntityId || "",
                        // coutryId: res?.countryId || "",
                        // countryName: res?.country || "",
                        // stateId: res?.stateId || "",
                        // stateName: res?.state || "",
                        // cityId: res?.cityId || "",
                        // cityName: res?.city || "",
                        // address1: res?.address1 || "",
                        // address2: res?.address2 || "",
                        // addressId: res?.addressId || "",
                        // contactNo: res?.phone || "",
                        // email: res?.email || "",
                      };
                    })}
                    selectionAllow={true}
                    onChangeValue={(values) => {
                      formik.setFieldValue("associationName", values);
                    }}
                    handleSetValue={(x) => {
                      // formik.setFieldValue("country", {
                      //   id: x?.coutryId,
                      //   name: x?.countryName,
                      // });
                      formik.setFieldValue("state", {
                        id: x?.stateId,
                        name: x?.stateName,
                      });
                      formik.setFieldValue("city", {
                        id: x?.cityId,
                        name: x?.cityName,
                      });
                      formik.setFieldValue("address1", x?.address1);
                      formik.setFieldValue("address2", x?.address2);
                      formik.setFieldValue("vendorContactNumber", x?.contactNo);
                      formik.setFieldValue("vendorEmail", x?.email);
                    }}
                    selectedValue={
                      formik?.values?.associationName
                        ? formik?.values?.associationName
                        : ""
                    }
                  />

                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        id="name"
                        name="propertyAddress"
                        placeholder="Property Address"
                        className="w-full bg-transparent py-1 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="propertyAddress"
                      component="div"
                      className="text-red-500 absolute"
                    />
                  </div>
                </div>
              </div>

              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Requester Information <span className="text-red-500">*</span>
                </label>
                <div className="col-span-4 grid grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="requesterFirstName"
                        placeholder="First Name"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="requesterFirstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="requesterLastName"
                        placeholder="Last Name"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="requesterLastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="requesterCompany"
                        placeholder="Company Name"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="requesterCompany"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="escrowNumber"
                        placeholder="Escrow Number"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="escrowNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="email"
                        name="requesterEmail"
                        placeholder="Email Address"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="requesterEmail"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="requesterPhone"
                        placeholder="Phone Number"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="requesterEmail"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Buyer Information <span className="text-red-500">*</span>
                </label>
                <div className="col-span-4 grid grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="buyerFirstName"
                        placeholder="First Name"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="buyerFirstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="buyerLastName"
                        placeholder="Last Name"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="buyerLastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="email"
                        name="buyerEmail"
                        placeholder="Email Address"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="buyerEmail"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="buyerPhone"
                        placeholder="Phone Number"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="buyerPhone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Closing Date <span className="text-red-500">*</span>
                </label>
                <div className="col-span-4 grid grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="date"
                        name="closingDate"
                        placeholder="First Name"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="closingDate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Attachments
                </label>
                <div className="col-span-4">
                  <div className="cursor-pointer text-accent1 flex items-center gap-2 relative">
                    <AttchmentIcon /> Add Attachments
                    <input
                      id="attchments"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="opacity-0 absolute top-0 left-0 cursor-pointer w-full"
                    />
                  </div>
                  <ErrorMessage
                    name="attachments"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  {files.length > 0 && (
                    <ul className="mt-2">
                      {files.map((file, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded mt-2"
                        >
                          <span>{file.name}</span>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => removeFile(index)}
                          >
                            <CloseIcon />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Order Type <span className="text-red-500">*</span>
                </label>
                <div className="col-span-4 grid grid-cols-2 gap-5 text-pvBlack">
                  <label>
                    <Field
                      type="radio"
                      name="orderType"
                      value="Normal"
                      className="mr-2"
                    />
                    Normal (3-5 business days)
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="orderType"
                      value="Rush"
                      className="mr-2"
                    />
                    Rush (24-36 hours)
                  </label>
                </div>
              </div>

              <div className="relative grid grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Amount Charged
                </label>
                <div className="col-span-2 space-y-5 text-pvBlack">
                  <div>
                    <div className="flex items-center border-b border-gray-o-60 text-22">
                      <FaDollar />
                      <Field
                        type="text"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        disabled
                        placeholder="Enter Price"
                        className="w-full bg-transparent pl-2 py-3 outline-none text-22 placeholder:text-accent2 text-pvBlack flex-1"
                      />
                    </div>
                    <div className="mt-2">
                      {/* Show the breakdown for the pricing */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-accent2 font-karla">
                          Demand Statement Fees
                        </div>
                        <div>
                          {formik.values.orderType === "Rush" ? "$200" : "$100"}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-accent2 font-karla">
                          + Transfer Fees
                        </div>
                        <div>$10</div>
                      </div>
                    </div>
                  </div>
                  <ReCAPTCHA sitekey="your-recaptcha-site-key" />
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-6 mt-10">
              <div className="col-span-2"></div>
              <div className="col-span-4 flex gap-2">
                <Button type="submit" className="" onClick={handleProceedToPay}>
                  Submit
                </Button>
                <button className="!text-accent2 border !border-associationLightgray !bg-white !shadow-none btn">
                  Reset Form
                </button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
}

export default DemandStatement;
