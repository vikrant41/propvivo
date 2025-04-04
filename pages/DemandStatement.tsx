import React, { useEffect, useState } from "react";
// Components
import TopBanner from "../components/CommonComponents/TopBanner";
import SearchTextBox from "../components/Condo/SearchTextBox";
import SuccessSection from "../components/Condo/SuccessSection";
import { Button } from "../components/CommonComponents/Button";
import { AttchmentIcon, CloseIcon, FaDollar } from "../components/shared/Icons";

// Formik
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

// Apollo Client
import { useMutation, useQuery } from "@apollo/client";
import apiClient from "../apollo/apiClient";

// GraphQL Queries & Mutations
import { CREATE_DEMAND_REQUEST } from "../graphql/mutations/DemandMutations";
import { GET_ALL_LEGALENTITY } from "../graphql/queries/LegalEntityQueries";
import { GET_ALL_LEGALENTITY_ADDRESS_MAPPING } from "../graphql/queries/LegalEntityAddressMappingQueries";

// Utilities, Context & Other Libraries
import { formatDate } from "../Utils/Utils";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import ReCAPTCHA from "react-google-recaptcha";

// Validaition Schema
const validationSchema = Yup.object({
  requestorType: Yup.string().required("Request Type is Required"),
  associationName: Yup.string().required("Association Name is Required"),
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
  const [requestStatus, setRequestStatus] = useState(false);

  // formik
  const formik = useFormik({
    initialValues: {
      requestorType: "",
      association: {
        id: "",
        name: "",
        code: "",
      },
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
      country: {
        id: "",
        name: "",
        icon: "",
      },
      state: {
        id: "",
        name: "",
      },
      city: {
        id: "",
        name: "",
      },
      zip: {
        id: "",
        name: "",
      },
      address1: "",
      address2: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  /* GQL mutation calling for POST */
  const [
    PostDemandStatementRequest,
    { data: addData, loading: demandStatementLoading, error },
  ] = useMutation(CREATE_DEMAND_REQUEST, {
    onCompleted: () => {},
  });

  // funstion for handle form
  const handleSubmit = async () => {
    // Formulate payload for the GraphQL request
    const payload = {
      amountCharged: parseFloat(formik?.values?.price),
      attachments:
        formik?.values?.attachments?.map((file) => ({
          fileName: file.name,
          fileUrl: file.url || "",
          fileType: file.type,
        })) || [],
      buyer: {
        firstName: formik?.values?.buyerFirstName,
        lastName: formik?.values?.buyerLastName,
        email: formik?.values?.buyerEmail,
        phone: {
          number: formik?.values?.buyerPhone,
        },
      },
      closingDate: formik?.values?.closingDate
        ? formatDate(formik?.values?.closingDate)
        : null,
      demandRequestorType: "Escrow",
      escrowNumber: formik?.values?.escrowNumber,
      legalEntityCode: formik?.values?.association.code || "",
      legalEntityId: formik?.values?.association.id || "",
      legalEntityName: formik?.values?.association.name,
      orderType: formik?.values?.orderType || "Normal",
      paymentStatus: "Pending",
      propertyAddress: {
        city: formik?.values?.city?.name || "",
        cityId: formik?.values?.city?.name || "",
        country: formik?.values?.country?.name || "",
        countryId: formik?.values?.country?.id || "",
        // legalEntityAddressDistributionId: formik?.values?.legalEntityAddressDistributionId || "",
        // legalEntityAddressDistributionName: formik?.values?.legalEntityAddressDistributionName || "",
        // propertyNumber: formik?.values?.propertyNumber || "",
        // propertyTypeId: formik?.values?.propertyTypeId || "",
        // propertyTypeName: formik?.values?.propertyTypeName || "",
        // propertyValueTypeId: formik?.values?.propertyValueTypeId || "",
        // propertyValueTypeName: formik?.values?.propertyValueTypeName || "",
        state: formik?.values?.state?.name || "",
        stateId: formik?.values?.state?.id || "",
        zipCode: formik?.values?.zip?.name || "",
        zipCodeId: formik?.values?.zip?.id || "",
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
      if (
        response?.data?.demandStatementMutation?.createDemandStatement
          ?.statusCode === 200
      ) {
        setRequestStatus(true);
      }
    } catch (error) {
      console.log(
        error?.graphQLErrors?.[0]?.extensions?.message || error?.message
      );
    }
  };

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

  //Get All LEGALENTITYAddressMapping GQL Calling
  const {
    data: getAllData,
    loading: LegalEntityAddressMappingLoading,
    error: isError,
    refetch,
  } = useQuery(GET_ALL_LEGALENTITY_ADDRESS_MAPPING, {
    variables: {
      request: {
        requestParam: {
          legalEntityId: formik?.values?.association?.id,
        },
        requestSubType: "List",
        requestType: "LegalEntityAddressMapping",
      },
    },
    client: apiClient,
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
    skip: !formik?.values?.association?.id,
  });

  const LegalEntityAddressMappingList =
    getAllData?.legalEntityAddressMappingQueries?.legalEntityAddressMapping;

  useEffect(() => {
    const demandStatementFee = formik.values.orderType === "Rush" ? 200 : 100;
    const transferFee = 10;
    const totalAmount = (demandStatementFee + transferFee).toFixed(2);
    formik.setFieldValue("price", totalAmount);
  }, [formik.values.orderType]);

  return (
    <>
      <TopBanner backgroundImage="./img/Banner.jpg" title="Demand Statement" />
      {requestStatus ? (
        <div>
          <SuccessSection />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto my-14">
          <FormikProvider value={formik}>
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
                          coutryId: res?.address?.countryId || "",
                          countryName: res?.address?.country || "",
                          stateId: res?.address?.stateId || "",
                          stateName: res?.address?.state || "",
                          cityId: res?.address?.cityId || "",
                          cityName: res?.address?.city || "",
                          address1: res?.address?.address1 || "",
                          address2: res?.address?.address2 || "",
                          addressId: res?.address?.addressId || "",
                          contactNo: res?.address?.phone || "",
                          email: res?.address?.email || "",
                          zipCode: res?.address?.zipCode || "",
                          zipCodeId: res?.address?.zipCodeId || "",
                        };
                      })}
                      selectionAllow={true}
                      onChangeValue={(values) => {
                        formik.setFieldValue("associationName", values);
                      }}
                      handleSetValue={(x) => {
                        formik.setFieldValue("association", {
                          id: x?.id,
                          name: x?.name,
                          code: x?.code,
                        });
                        // formik.setFieldValue("country", {
                        //   id: x?.coutryId,
                        //   name: x?.countryName,
                        // });
                        // formik.setFieldValue("state", {
                        //   id: x?.stateId,
                        //   name: x?.stateName,
                        // });
                        // formik.setFieldValue("city", {
                        //   id: x?.cityId,
                        //   name: x?.cityName,
                        // });
                        // formik.setFieldValue("zip", {
                        //   id: x?.zipCodeId,
                        //   name: x?.zipCode,
                        // });
                        // formik.setFieldValue("address1", x?.address1);
                        // formik.setFieldValue("address2", x?.address2);
                      }}
                      selectedValue={
                        formik?.values?.associationName
                          ? formik?.values?.associationName
                          : ""
                      }
                    />

                    <div>
                      {/* <div className="flex items-center border-b border-gray-o-60">
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
                    /> */}
                    </div>

                    <SearchTextBox
                      name={"propertyAddress"}
                      placeholder={"Property Address"}
                      maxLength={50}
                      errors={
                        formik.errors.propertyAddress &&
                        formik.touched.propertyAddress &&
                        formik.errors.propertyAddress
                      }
                      searchAfterChar={3}
                      data={LegalEntityAddressMappingList?.data?.legalEntityPropertyAddresses?.map(
                        (res) => {
                          return {
                            id: res?.propertyAddress?.addressId,
                            name: res?.propertyAddress?.address1,
                            coutryId: res?.propertyAddress?.countryId || "",
                            countryName: res?.propertyAddress?.country || "",
                            stateId: res?.propertyAddress?.stateId || "",
                            stateName: res?.propertyAddress?.state || "",
                            cityId: res?.propertyAddress?.cityId || "",
                            cityName: res?.propertyAddress?.city || "",
                            address1: res?.propertyAddress?.address1 || "",
                            address2: res?.propertyAddress?.address2 || "",
                            addressId: res?.propertyAddress?.addressId || "",
                            contactNo: res?.propertyAddress?.phone || "",
                            email: res?.propertyAddress?.email || "",
                            zipCode: res?.propertyAddress?.zipCode || "",
                            zipCodeId: res?.propertyAddress?.zipCodeId || "",
                          };
                        }
                      )}
                      selectionAllow={true}
                      onChangeValue={(values) => {
                        formik.setFieldValue("propertyAddress", values);
                      }}
                      handleSetValue={(x) => {
                        formik.setFieldValue("association", {
                          id: x?.id,
                          name: x?.name,
                          code: x?.code,
                        });
                        formik.setFieldValue("country", {
                          id: x?.coutryId,
                          name: x?.countryName,
                        });
                        formik.setFieldValue("state", {
                          id: x?.stateId,
                          name: x?.stateName,
                        });
                        formik.setFieldValue("city", {
                          id: x?.cityId,
                          name: x?.cityName,
                        });
                        formik.setFieldValue("zip", {
                          id: x?.zipCodeId,
                          name: x?.zipCode,
                        });
                        formik.setFieldValue("address1", x?.address1);
                        formik.setFieldValue("address2", x?.address2);
                      }}
                      selectedValue={
                        formik?.values?.associationName
                          ? formik?.values?.associationName
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className="relative grid grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                    Requester Information{" "}
                    <span className="text-red-500">*</span>
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
                            {formik.values.orderType === "Rush"
                              ? "$200"
                              : "$100"}
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
                  <Button
                    type="submit"
                    className=""
                    onClick={handleProceedToPay}
                  >
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
      )}
    </>
  );
}

export default DemandStatement;
