import React, { useEffect, useState } from "react";
import TopBanner from "../components/CommonComponents/TopBanner";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { AttchmentIcon, CloseIcon, FaDollar } from "../components/shared/Icons";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "../components/CommonComponents/Button";
import PaymentCardForm from "../components/Condo/PaymentCardForm";
import { formatDate } from "../Utils/Utils";
import SearchTextBox from "../components/Condo/SearchTextBox";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_LEGALENTITY } from "../graphql/queries/LegalEntityQueries";
import apiClient from "../apollo/apiClient";
import { GET_ALL_LEGALENTITY_ADDRESS_MAPPING } from "../graphql/queries/LegalEntityAddressMappingQueries";
import { CREATE_RESALE_CERTIFICATION_REQUEST } from "../graphql/mutations/ResaleCertificationMutations";
import { GET_ALL_ORDER_TYPE } from "../graphql/queries/OrderTypeQueries";
import { BULK_UPLOAD_REQUESTS } from "../graphql/mutations/MediaMutations";

// Resale Certification Validation
const validationSchema = Yup.object({
  requestorType: Yup.string().required("Requestor Type is Required"),
  associationName: Yup.string().required("Association Name is Required"),
  propertyAddress: Yup.string().required("Address is Required"),
  requesterFirstName: Yup.string()
    .min(3, "First Name min length should be 3")
    .required("First Name is Required"),
  requesterLastName: Yup.string().required("Last Name is Required"),
  requesterCompany: Yup.string().required("Company Name is Required"),
  escrowNumber: Yup.string().required("Escrow Number is Required"),
  requesterEmail: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  requesterPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number length should be 10")
    .required("Phone Number is Required"),
  buyerFirstName: Yup.string()
    .min(3, "First Name min length should be 3")
    .required("First Name is Required"),
  buyerLastName: Yup.string().required("Last Name is Required"),
  buyerEmail: Yup.string().email("Invalid email").required("Email is Required"),
  buyerPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number length should be 10")
    .required("Phone Number is Required"),
  closingDate: Yup.date().required("Closing Date is Required"),
  orderType: Yup.string().required("Order Type is Required"),
});

function ResaleCertificate() {
  // ALL HOOKS
  const { setBreadcrumbs } = useBreadcrumbs();
  const [filesPdf, setFilesPdf] = useState<any>([]);
  const [isPayment, setIsPayment] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [requestStatus, setRequestStatus] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [demandStatementFee, setDemandStatementFee] = useState(0);
  const [transferFee, setTransferFee] = useState(0);

  // Google ReCAPTCHA key
  const captcha_siteKey = process.env.NEXT_PUBLIC_G_CAPTCHA_KEY;

  // Resale Initial Values
  const formik = useFormik({
    initialValues: {
      requestorType: "",
      associationName: "",
      association: {
        id: "",
        name: "",
        code: "",
      },
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
      address: { id: "", name: "" },
      address2: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setFormData(values);
      handleSubmit();
    },
  });

  //GQL for bulk upload media
  const [addMedia, { data: addMediaResponse, loading: addMediaLoading }] =
    useMutation(BULK_UPLOAD_REQUESTS, {
      context: {
        headers: {
          "GraphQL-Preflight": 1,
        },
      },
    });

  /* GQL mutation calling for POST */
  const [
    PostResaleCertificationRequest,
    { data: addData, loading: demandStatementLoading, error },
  ] = useMutation(CREATE_RESALE_CERTIFICATION_REQUEST, {
    onCompleted: () => {},
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      const validFiles = [];
      if (filesPdf.length + newFiles.length <= 5) {
        validFiles.push(...newFiles);
      } else {
        validFiles.push(...newFiles.slice(0, 5 - filesPdf.length));
      }

      if (validFiles.length > 0) {
        setFilesPdf([...filesPdf, ...validFiles]);
        formik.setFieldValue("attachments", [...filesPdf, ...validFiles]);

        try {
          const response: any = await addMedia({
            variables: {
              request: {
                requestParam: {
                  containerName: "resale",
                  formFiles: validFiles,
                },
                requestSubType: "Upload",
                requestType: "resale",
              },
            },
          });
          if (response?.data?.mediaMutations?.bulkUpload?.statusCode === 200) {
            // const uploadedFiles = response?.data?.mediaMutations?.bulkUpload?.data?.medias;
            const uploadedFiles =
              response?.data?.mediaMutations?.bulkUpload?.data?.medias.map(
                (fileList: any) => ({
                  filePath: fileList.filePath,
                  fileName: fileList.fileName,
                  uri: fileList.uri,
                  containerName: fileList.containerName,
                  contentType: fileList.contentType,
                  fileExtension: fileList.fileExtension,
                  mediaType: fileList.mediaType,
                  fileSize: fileList.fileSize,
                  folderName: "",
                  subFolderName: "",
                })
              );
            setFilesPdf([...filesPdf, ...uploadedFiles]);
            formik.setFieldValue("attachments", [
              ...filesPdf,
              ...uploadedFiles,
            ]);
          }
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      }
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    const updatedFiles = filesPdf.filter((_, i) => i !== index);
    setFilesPdf(updatedFiles);
    formik.setFieldValue("attachments", updatedFiles);
  };

  // ResaleCertification submit logic
  const handleSubmit = async () => {
    const payload = {
      amountCharged: parseFloat(formik?.values?.price),
      attachments: filesPdf?.map((x) => {
        const { __typename, contentType, userContext, ...rest } = x;
        return rest;
      }),
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
      resaleRequestorType: formik?.values?.requestorType || "Escrow",
      escrowNumber: formik?.values?.escrowNumber,
      legalEntityCode: formik?.values?.association.code || "",
      legalEntityId: formik?.values?.association.id || "",
      legalEntityName: formik?.values?.association.name,
      orderType: formik?.values?.orderType || "Normal",
      paymentStatus: "Completed",
      propertyAddress: {
        city: formik?.values?.city?.name || "",
        cityId: formik?.values?.city?.name || "",
        country: formik?.values?.country?.name || "",
        countryId: formik?.values?.country?.id || "",
        state: formik?.values?.state?.name || "",
        stateId: formik?.values?.state?.id || "",
        zipCode: formik?.values?.zip?.name || "",
        zipCodeId: formik?.values?.zip?.id || "",
        address1: formik?.values?.address?.name || "",
        addressId: formik?.values?.address?.id || "",
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
      paymentData: {
        accountName: paymentData?.accountName,
        accountNumber: paymentData?.accountNumber,
        accountType: paymentData?.accountType,
        amount: paymentData?.amount,
        amountCurrency: paymentData?.amountCurrency,
        bankName: paymentData?.bankName,
        bankRoutingNumber: paymentData?.bankRoutingNumber,
        effectiveDate: paymentData?.effectiveDate
          ? `${paymentData?.effectiveDate}Z`
          : "",
        transactionDesc: paymentData?.transactionDesc,
        transactionId: paymentData?.transactionId,
      },
    };
    try {
      // Await the GraphQL mutation request
      const response = await PostResaleCertificationRequest({
        variables: {
          request: {
            requestParam: payload,
            requestSubType: "Add",
            requestType: "ResaleCertification",
          },
        },
      });
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
      { name: "Resale Certificate" },
    ]);
  }, [setBreadcrumbs]);

  // Handle file selection
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = event.target.files;
  //   if (selectedFiles) {
  //     const newFiles = Array.from(selectedFiles);
  //     setFiles([...files, ...newFiles]);
  //     formik.setFieldValue("attachments", [...files, ...newFiles]);
  //   }
  // };

  // Remove a file from the list
  // const removeFile = (index: number) => {
  //   const updatedFiles = files.filter((_, i) => i !== index);
  //   setFiles(updatedFiles);
  //   formik.setFieldValue("attachments", updatedFiles);
  // };

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

  //Get All LEGALENTITYAddressMapping GQL Calling
  const { data: getAllOrderType } = useQuery(GET_ALL_ORDER_TYPE, {
    variables: {
      request: {
        requestParam: {
          orderType: formik?.values?.orderType,
        },
        requestSubType: "List",
        requestType: "LegalEntityAddressMapping",
      },
    },
    client: apiClient,
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });
  const orderTypeList = getAllOrderType?.demandStatementQuery?.OrderType;

  const handleProceedToPay = async () => {
    const isValid = await formik.validateForm();
    if (Object.keys(isValid).length === 0) {
      setFormData(formik.values);
      // formik.submitForm();
      setIsPayment(true);
    } else {
      console.log("Form is invalid");
    }
  };

  useEffect(() => {
    if (orderTypeList?.data?.orderTypesFees?.length > 0) {
      const fees = orderTypeList.data.orderTypesFees[0];
      const demandStatementFee = fees.demandFees || 0;
      const transferFee = fees.transferFees || 0;

      setDemandStatementFee(demandStatementFee);
      setTransferFee(transferFee);
      // Calculate the total price directly from the API data
      const totalAmount = (demandStatementFee + transferFee).toFixed(2);
      formik.setFieldValue("price", totalAmount);
    }
  }, [orderTypeList]);

  const handlePaymentSuccess = () => {
    formik.submitForm();
  };

  // Reset Demand Form
  const handleReset = () => {
    formik.resetForm();
  };
  // useEffect(() => {
  //   const demandStatementFee = formik.values.orderType === "Rush" ? 200 : 100;
  //   const transferFee = 10;
  //   const totalAmount = (demandStatementFee + transferFee).toFixed(2);
  //   formik.setFieldValue("price", totalAmount);
  // }, [formik.values.orderType]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // UI/UX display Code
  return (
    <>
      <TopBanner
        backgroundImage="./img/Banner.jpg"
        title="Resale Certificate"
      />
      {!isPayment ? (
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
                        <option value="Escrow">Escrow Company</option>
                        <option value="Other">Other</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      name="requestorType"
                      component="div"
                      className="text-red-500 absolute text-sm"
                    />
                  </div>
                </div>

                <div className="relative grid grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                    Association Information{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-4 space-y-4">
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
                      }}
                      selectedValue={
                        formik?.values?.associationName
                          ? formik?.values?.associationName
                          : ""
                      }
                    />

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
                        formik.setFieldValue("address", {
                          id: x?.addressId,
                          name: x?.address1,
                        });
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
                        {/* <Field
                          type="text"
                          name="requesterPhone"
                          placeholder="Phone Number"
                          className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                        /> */}
                        <Field name="requesterPhone">
                          {({ field, form }) => {
                            const formatPhone = (value) => {
                              const cleaned = value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              const match = cleaned.match(
                                /^(\d{0,3})(\d{0,3})(\d{0,4})$/
                              );
                              if (!match) return value;
                              let formatted = "";
                              if (match[1]) formatted = `(${match[1]}`;
                              if (match[2]) formatted += `) ${match[2]}`;
                              if (match[3]) formatted += `-${match[3]}`;
                              return formatted;
                            };

                            const handleChange = (e) => {
                              const input = e.target.value;
                              const cleaned = input
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              form.setFieldValue(field.name, cleaned);
                            };

                            const handleKeyDown = (e) => {
                              const allowedKeys = [
                                "Backspace",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Delete",
                              ];
                              if (
                                !/[0-9]/.test(e.key) &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            };

                            return (
                              <input
                                {...field}
                                value={formatPhone(field.value || "")}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Phone Number"
                                inputMode="numeric"
                                maxLength={14}
                                className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                              />
                            );
                          }}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="requesterPhone"
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
                        {/* <Field
                          type="text"
                          name="buyerPhone"
                          placeholder="Phone Number"
                          className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                        /> */}
                        <Field name="buyerPhone">
                          {({ field, form }) => {
                            const formatPhone = (value) => {
                              const cleaned = value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              const match = cleaned.match(
                                /^(\d{0,3})(\d{0,3})(\d{0,4})$/
                              );
                              if (!match) return value;
                              let formatted = "";
                              if (match[1]) formatted = `(${match[1]}`;
                              if (match[2]) formatted += `) ${match[2]}`;
                              if (match[3]) formatted += `-${match[3]}`;
                              return formatted;
                            };

                            const handleChange = (e) => {
                              const input = e.target.value;
                              const cleaned = input
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              form.setFieldValue(field.name, cleaned);
                            };

                            const handleKeyDown = (e) => {
                              const allowedKeys = [
                                "Backspace",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                                "Delete",
                              ];
                              if (
                                !/[0-9]/.test(e.key) &&
                                !allowedKeys.includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            };
                            return (
                              <input
                                {...field}
                                value={formatPhone(field.value)}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Phone Number"
                                inputMode="numeric"
                                maxLength={14}
                                className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                              />
                            );
                          }}
                        </Field>
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
                          min={minDate}
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
                        type="file"
                        multiple
                        id="tb-file-upload"
                        accept=".pdf ,image/jpeg, image/jpg"
                        onChange={(e) => handleFileChange(e)}
                        className="opacity-0 absolute top-0 left-0 cursor-pointer w-full"
                      />
                    </div>
                    <ErrorMessage
                      name="attachments"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {filesPdf.length > 0 && (
                      <ul className="mt-2">
                        {filesPdf.map((file, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center bg-gray-100 p-2 rounded mt-2"
                          >
                            <span>{file?.fileName}</span>
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
                            {/* {formik.values.orderType === "Rush"
                              ? "$200"
                              : "$100"} */}
                            $
                            {orderTypeList?.data?.orderTypesFees[0]?.demandFees}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-accent2 font-karla">
                            + Transfer Fees
                          </div>
                          <div>
                            $
                            {
                              orderTypeList?.data?.orderTypesFees[0]
                                ?.transferFees
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <ReCAPTCHA sitekey={captcha_siteKey} />
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
                    Proceed to pay
                  </Button>
                  <button
                    className="!text-accent2 border !border-associationLightgray !bg-white !shadow-none btn"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      ) : (
        <PaymentCardForm
          formData={formData}
          setRequestStatus={setRequestStatus}
          setPaymentData={setPaymentData}
          onPaymentSuccess={handlePaymentSuccess}
          demandStatementFee={demandStatementFee}
          transferFee={transferFee}
          associationDetails={{
            id: formik.values.association.id,
            name: formik.values.association.name,
            code: formik.values.association.code,
          }}
          addressId={formik.values.address.id}
        />
      )}
    </>
  );
}

export default ResaleCertificate;
