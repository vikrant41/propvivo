import React, { useEffect, useState } from "react";
import TopBanner from "../components/CommonComponents/TopBanner";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { AttchmentIcon, CloseIcon, FaDollar } from "../components/shared/Icons";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "../components/CommonComponents/Button";
import PaymentCardForm from "../components/Condo/PaymentCardForm";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CONDO_REQUEST } from "../graphql/mutations/CondoMutations";
import { formatDate } from "../Utils/Utils";
import SearchTextBox from "../components/Condo/SearchTextBox";
import apiClient from "../apollo/apiClient";
import { GET_ALL_LEGALENTITY } from "../graphql/queries/LegalEntityQueries";
import { GET_ALL_LEGALENTITY_ADDRESS_MAPPING } from "../graphql/queries/LegalEntityAddressMappingQueries";
import { GET_ALL_ORDER_TYPE } from "../graphql/queries/OrderTypeQueries";
import { BULK_UPLOAD_REQUESTS } from "../graphql/mutations/MediaMutations";
import { GET_ALL_REQUESTOR_TYPE } from "../graphql/queries/RequestorTypeQueries";
import { GET_PROPERTY_ID_BY_ADDRESS_ID } from "../graphql/mutations/ResaleCertificationMutations";
import { GET_PROPERTY_ID_REQUEST } from "../graphql/mutations/OneTimePaymentMutations";
import { containerName } from "../components/Helper/Helper";

const validationSchema = Yup.object({
  requestorType: Yup.string().required("Requestor Type is Required"),
  associationName: Yup.string().required("Association Name is Required"),
  association: Yup.object().shape({
    id: Yup.string().required("Association name is required"),
    name: Yup.string().required("Association name is required"),
    code: Yup.string().required("Association code is required"),
  }),
  propertyAddress: Yup.string().required("Address is Required"),
  address: Yup.object().shape({
    id: Yup.string().required("Address is required"),
    name: Yup.string().required("Address is required"),
  }),
  requesterFirstName: Yup.string()
    .min(3, "First Name min length should be 3")
    .when("requestorType", {
      is: (val) => val !== "Homeowner",
      then: (schema) => schema.required("First Name is Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  requesterLastName: Yup.string().when("requestorType", {
    is: (val) => val !== "Homeowner",
    then: (schema) => schema.required("Last Name is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  requesterCompany: Yup.string().when("requestorType", {
    is: (val) => val !== "Homeowner" && val !== "RealEstateManager",
    then: (schema) => schema.required("Company Name is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // escrowNumber: Yup.string().when("requestorType", {
  //   is: (val) => val !== "Homeowner",
  //   then: (schema) => schema.required("Escrow Number is Required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  requesterEmail: Yup.string()
    .email("Invalid email")
    .when("requestorType", {
      is: (val) => val !== "Homeowner",
      then: (schema) => schema.required("Email is Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  requesterPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number length should be 10")
    .when("requestorType", {
      is: (val) => val !== "Homeowner",
      then: (schema) => schema.required("Phone Number is Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  buyerFirstName: Yup.string()
    .min(3, "First Name min length should be 3")
    .when("requestorType", {
      is: (val) => val !== "Homeowner",
      then: (schema) => schema.required("First Name is Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  buyerLastName: Yup.string().when("requestorType", {
    is: (val) => val !== "Homeowner",
    then: (schema) => schema.required("Last Name is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  buyerEmail: Yup.string()
    .email("Invalid email")
    .when("requestorType", {
      is: (val) => val !== "Homeowner",
      then: (schema) => schema.required("Email is Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  buyerPhone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number length should be 10")
    .when("requestorType", {
      is: (val) => val !== "Homeowner",
      then: (schema) => schema.required("Phone Number is Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  // closingDate: Yup.date().when("requestorType", {
  //   is: (val) => val !== "Homeowner",
  //   then: (schema) => schema.required("Closing Date is Required"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  orderType: Yup.string().required("Order Type is Required"),
});

function CondoQuestionnaire() {
  // ALL HOOKS
  const { setBreadcrumbs } = useBreadcrumbs();
  const [filesPdf, setFilesPdf] = useState<any>([]);
  const [isPayment, setIsPayment] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [requestStatus, setRequestStatus] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [demandStatementFee, setDemandStatementFee] = useState(0);
  const [transferFee, setTransferFee] = useState(0);
  const [condoResponse, setCondoResponse] = useState(null);
  const [storePropertyId, setStorePropertyId] = useState("");
  const [isUnitDataEmpty, setIsUnitDataEmpty] = useState(false);

  // Google ReCAPTCHA key
  const captcha_siteKey = process.env.NEXT_PUBLIC_G_CAPTCHA_KEY;

  // Condo InitialValues
  const formik = useFormik({
    initialValues: {
      requestorType: "Homeowner",
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
      // escrowNumber: "",
      requesterEmail: "",
      requesterPhone: "",
      buyerFirstName: "",
      buyerLastName: "",
      buyerEmail: "",
      buyerPhone: "",
      // closingDate: "",
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

  useEffect(() => {
    setBreadcrumbs([
      { name: "propVIVO", href: "/" },
      { name: "Request Document" },
      { name: "Condo Questionnaire" },
    ]);
  }, [setBreadcrumbs]);

  //GQL for bulk upload media
  const [addMedia, { data: addMediaResponse, loading: addMediaLoading }] =
    useMutation(BULK_UPLOAD_REQUESTS, {
      context: {
        headers: {
          "GraphQL-Preflight": 1,
        },
      },
    });

  // Handle file selection
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
                  containerName: containerName.CondoQuestionnaire,
                  formFiles: validFiles,
                },
                requestSubType: "Upload",
                requestType: "resale",
              },
            },
          });
          if (response?.data?.mediaMutations?.bulkUpload?.statusCode === 200) {
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

  //Change status isPayment
  const handleProceedToPay = async () => {
    const isValid = await formik.validateForm();
    if (Object.keys(isValid).length === 0) {
      setFormData(formik.values);
      // formik.submitForm();
      setIsPayment(true);
    }
  };

  // Handle going back to form from payment
  const handleBackToForm = () => {
    setIsPayment(false);
    if (condoResponse) {
      handleReset();
    }
  };

  // Restore form data when going back from payment
  useEffect(() => {
    if (!isPayment && formData) {
      // Restore all form values
      Object.keys(formData).forEach((key) => {
        if (key !== "attachments") {
          // Skip attachments as they're handled separately
          formik.setFieldValue(key, formData[key]);
        }
      });

      // Restore files if they exist
      if (formData.attachments && formData.attachments.length > 0) {
        setFilesPdf(formData.attachments);
      }

      // Restore selected order type
      if (formData.orderType) {
        setSelectedOrderType(formData.orderType);
      }
    }
  }, [isPayment, formData]);

  /*************** ALL GQL Query *********************** */

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
  const orderTypeList =
    getAllOrderType?.documentRequestMasterQuery?.getAllOrderTypes;

  const { data: getAllRequestorType } = useQuery(GET_ALL_REQUESTOR_TYPE, {
    variables: {
      request: {
        requestParam: { documentType: "CondoQuestionnaire" },
        requestSubType: "List",
        requestType: "RequestorType",
      },
    },
    client: apiClient,
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });
  const getRequestorTypeList =
    getAllRequestorType?.documentRequestMasterQuery?.getAllRequestorTypes;

  // OrderType api Calling
  useEffect(() => {
    if (orderTypeList?.data?.orderTypes?.length > 0) {
      const fees = orderTypeList.data.orderTypes[0];
      const demandFee = fees.fees || 0;
      const transferFeeVal = fees.transferFees || 0;
      const totalAmount = (demandFee + transferFeeVal).toFixed(2);

      setDemandStatementFee(demandFee);
      setTransferFee(transferFeeVal);
      formik.setFieldValue("price", totalAmount);
    }
  }, [orderTypeList]);

  /* GQL mutation calling for POST */
  const [
    PostCondoQuestionnaireRequest,
    { data: addData, loading: demandStatementLoading, error },
  ] = useMutation(CREATE_CONDO_REQUEST, {
    onCompleted: () => {},
  });

  const storedLegalEntityId = formik?.values?.association?.id;

  // const [PostAddressId, { data: getData }] = useMutation(
  //   GET_PROPERTY_ID_BY_ADDRESS_ID,
  //   {
  //     onCompleted: (data) => {
  //       const userLegalEntities =
  //         data?.userMutations?.addressOrActivationCode?.data?.userProfile
  //           ?.userLegalEntities || [];

  //       const matchedEntity = userLegalEntities.find(
  //         (entity) => entity.legalEntityId === storedLegalEntityId
  //       );

  //       const matchedUnit = matchedEntity?.userLegalEntityUnits?.find(
  //         (unit) =>
  //           unit.propertyAddress?.addressId === formik?.values?.address?.id
  //       );

  //       if (matchedUnit?.propertyId) {
  //         setStorePropertyId(matchedUnit.propertyId);
  //       } else {
  //         console.warn("No matching propertyId found");
  //       }
  //     },
  //     onError: (error) => {
  //       console.error("Mutation error:", error);
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (formik?.values?.address?.id) {
  //     PostAddressId({
  //       variables: {
  //         request: {
  //           requestParam: {
  //             addressId: formik?.values?.address.id,
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, [formik?.values?.address?.id]);

  const { data: unitsResponse, error: unitsError } = useQuery(
    GET_PROPERTY_ID_REQUEST,
    {
      variables: {
        request: {
          requestParam: {
            addressId: formik?.values?.address?.id,
            legalEntityId: formik?.values?.association?.id,
          },
        },
      },
      skip: !formik?.values?.address?.id, // only run when addressId is present
      client: apiClient, // optional, if using multiple clients
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        const unitList = data?.userQueries?.getUnits?.data?.unitData || [];
        setIsUnitDataEmpty(unitList.length === 0);

        const matchedUnit = unitList.find(
          (unit) =>
            unit.addressId === formik?.values?.address?.id &&
            unit.legalEntityId === storedLegalEntityId
        );

        if (matchedUnit?.propertyId) {
          setStorePropertyId(matchedUnit.propertyId);
        } else {
          console.warn("No matching propertyId found");
        }
      },
      onError: (error) => {
        console.error("Query error:", error);
      },
    }
  );

  useEffect(() => {
    // Clear propertyId when address changes
    if (formik?.values?.address?.id) {
      setStorePropertyId(undefined);
    }
  }, [formik?.values?.address?.id]);

  const handleSubmit = async () => {
    // Formulate payload for the GraphQL request
    const payload = {
      documentType: "CondoQuestionnaire",
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
      // closingDate: formik?.values?.closingDate
      //   ? formatDate(formik?.values?.closingDate)
      //   : null,
      requestorType: formik?.values?.requestorType || "Escrow",
      // escrowNumber: formik?.values?.escrowNumber,
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
      paymentInformation: {
        additionalFee: paymentData?.additionalFee,
        amount: paymentData?.amount,
        amountCurrency: paymentData?.amountCurrency,
        effectiveDate: paymentData?.effectiveDate
          ? new Date(paymentData?.effectiveDate)
          : null,
        paymentMethodLabel: paymentData?.paymentMethodLabel,
        paymentMethodLast4: paymentData?.paymentMethodLast4,
        propertyId: paymentData?.propertyId,
        totalAmount: paymentData?.totalAmount,
        transactionDate: paymentData?.transactionDate
          ? new Date(paymentData?.transactionDate)
          : null,
        transactionDesc: paymentData?.transactionDesc,
        transactionId: paymentData?.transactionId,
        transactionStatus: paymentData?.transactionStatus,
      },
    };
    try {
      // Await the GraphQL mutation request
      const response = await PostCondoQuestionnaireRequest({
        variables: {
          request: {
            requestParam: payload,
            requestSubType: "Add",
            requestType: "CondoRequest",
          },
        },
      });
      if (
        response?.data?.documentRequestMasterMutation?.createDocumentRequest
          ?.success
      ) {
        setCondoResponse(
          response?.data?.documentRequestMasterMutation?.createDocumentRequest
        );
      }
    } catch (error) {
      console.log(
        error?.graphQLErrors?.[0]?.extensions?.message || error?.message
      );
    }
  };

  const handlePaymentSuccess = () => {
    formik.submitForm();
  };

  // Reset Demand Form
  const handleReset = () => {
    formik.resetForm();
    setFormData(null);
    setFilesPdf([]);
    setSelectedOrderType("Normal");
  };

  // Clear fields when requestorType changes
  useEffect(() => {
    if (formik?.values?.requestorType === "Homeowner") {
      // Clear requester and buyer fields when switching to Homeowner
      formik.setFieldValue("requesterFirstName", "");
      formik.setFieldValue("requesterLastName", "");
      formik.setFieldValue("requesterCompany", "");
      // formik.setFieldValue("escrowNumber", "");
      formik.setFieldValue("requesterEmail", "");
      formik.setFieldValue("requesterPhone", "");
      formik.setFieldValue("buyerFirstName", "");
      formik.setFieldValue("buyerLastName", "");
      formik.setFieldValue("buyerEmail", "");
      formik.setFieldValue("buyerPhone", "");
      // formik.setFieldValue("closingDate", "");
    } else if (formik?.values?.requestorType === "RealEstateManager") {
      // Clear company name if switching to RealEstateManager
      formik.setFieldValue("requesterCompany", "");
    }
  }, [formik?.values?.requestorType]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const [selectedOrderType, setSelectedOrderType] = useState("Normal");

  // Update the price when an order type is selected
  const handleOrderTypeChange = (orderType) => {
    setSelectedOrderType(orderType);

    // Find the selected order type from the list and calculate total
    const selectedOrder = orderTypeList?.data?.orderTypes.find(
      (order) => order.orderType === orderType
    );
    if (selectedOrder) {
      const totalAmount = (
        selectedOrder.fees + selectedOrder.transferFees
      ).toFixed(2);
      formik.setFieldValue("price", totalAmount);
      setDemandStatementFee(selectedOrder.fees);
      setTransferFee(selectedOrder.transferFees);
    }
  };
  return (
    <>
      <TopBanner
        backgroundImage="./img/aboutBanner.jpg"
        title="Condo Questionnaire"
      />
      {!isPayment ? (
        <div className="max-w-3xl mx-auto py-9 lg:py-14 px-5">
          <FormikProvider value={formik}>
            <Form autoComplete="off" className="">
              <div className="w-full space-y-7 md:space-y-11">
                <div className="relative grid grid-cols-1 md:grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2 mb-3 md:mb-0">
                    Requestor Type <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        as="select"
                        name="requestorType"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      >
                        {/* Map over the fetched data to create options dynamically */}
                        {getRequestorTypeList?.data?.requestorTypes?.map(
                          (type) => (
                            <option
                              key={type.requestorType}
                              value={type.requestorType}
                            >
                              {type.requestorTypeDisplayValue}
                            </option>
                          )
                        )}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="requestorType"
                      component="div"
                      className="text-red-500 absolute text-sm"
                    />
                  </div>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2 mb-3 md:mb-0">
                    Association Information{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-4 space-y-5 md:space-y-10">
                    <SearchTextBox
                      name={"associationName"}
                      placeholder={"Association Name"}
                      maxLength={50}
                      errors={
                        formik.errors.association?.id &&
                        formik.touched.association?.id &&
                        formik.errors.association?.id
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
                      onManualInputChange={(text) => {
                        formik.setFieldValue("association", {
                          id: "",
                          name: "",
                          code: "",
                        });
                        formik.setFieldTouched("association.id", true);
                        formik.validateField("association.id");
                      }}
                      handleSetValue={(x) => {
                        formik.setFieldValue("association", {
                          id: x?.id,
                          name: x?.name,
                          code: x?.code,
                        });
                        formik.setFieldTouched("association.id", true);
                        formik.validateField("association.id");
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
                        formik.errors.address?.id &&
                        formik.touched.address?.id &&
                        formik.errors.address?.id
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
                      onManualInputChange={(text) => {
                        formik.setFieldValue("address", {
                          id: "",
                          name: "",
                        });
                        formik.setFieldTouched("address.id", true);
                        formik.validateField("address.id");
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
                        formik.setFieldTouched("address.id", true);
                        formik.validateField("address.id");
                      }}
                      selectedValue={
                        formik?.values?.propertyAddress
                          ? formik?.values?.propertyAddress
                          : ""
                      }
                    />
                    {/* Show the message if no unitData, but do not hide any fields */}
                    {isUnitDataEmpty && (
                      <div className="text-red-500 text-center my-8">
                        No units found for the selected property.
                      </div>
                    )}
                  </div>
                </div>

                {/* Requester Information */}
                {formik?.values?.requestorType !== "Homeowner" && (
                  <div className="relative grid grid-cols-1 md:grid-cols-6">
                    <label className="text-pvBlack text-base font-medium font-outfit col-span-2 mb-3 md:mb-0">
                      Requester Information{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-10 gap-x-5">
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
                      {formik?.values?.requestorType !==
                        "RealEstateManager" && (
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
                      )}
                      {/* <div>
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
                      </div> */}
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
                )}
                {/* Buyer Information */}
                {formik?.values?.requestorType !== "Homeowner" && (
                  <div className="relative grid grid-cols-1 md:grid-cols-6">
                    <label className="text-pvBlack text-base font-medium font-outfit col-span-2 mb-3 md:mb-0">
                      Buyer Information <span className="text-red-500">*</span>
                    </label>
                    <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-10 gap-x-5">
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
                )}

                {/* <div className="relative grid grid-cols-1 md:grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                    Closing Date <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-14">
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
                </div> */}

                <div className="relative grid grid-cols-1 md:grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2 mb-3 md:mb-0">
                    Attachments
                  </label>
                  <div className="col-span-4">
                    <div className="cursor-pointer text-accent1 hover:text-accent flex items-center gap-2 relative transition-all duration-300">
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

                    {filesPdf?.length > 0 && (
                      <ul className="mt-2">
                        {filesPdf?.map((file, index) => (
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

                <div className="relative grid grid-cols-1 md:grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2 mb-3 md:mb-0">
                    Order Type <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-4 flex flex-col md:flex-row justify-between gap-3 text-pvBlack">
                    {/* Dynamically render radio buttons based on the order types */}
                    {orderTypeList?.data?.orderTypes?.map((order) => (
                      <label
                        key={order.orderType}
                        className="flex items-center"
                      >
                        <Field
                          type="radio"
                          name="orderType"
                          value={order.orderType}
                          checked={selectedOrderType === order.orderType}
                          onChange={() =>
                            handleOrderTypeChange(order.orderType)
                          } // Handle change
                          className="mr-2"
                        />
                        {order.orderTypeDisplayValue} (
                        {order.processingDuration})
                      </label>
                    ))}
                  </div>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-6">
                  <label className="text-pvBlack text-base font-medium font-outfit col-span-2 mb-3 md:mb-0">
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
                          className="w-full bg-transparent pl-2 py-1 outline-none text-22 font-medium placeholder:text-accent2 text-pvBlack flex-1"
                        />
                      </div>
                      <div className="mt-2">
                        {/* Show the breakdown for the pricing */}
                        {selectedOrderType && (
                          <>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-accent2 font-karla">
                                Fees
                              </div>
                              <div>
                                $
                                {
                                  orderTypeList?.data?.orderTypes?.find(
                                    (order) =>
                                      order.orderType === selectedOrderType
                                  )?.fees
                                }
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-accent2 font-karla">
                                + Transfer Fees
                              </div>
                              <div>
                                $
                                {
                                  orderTypeList?.data?.orderTypes?.find(
                                    (order) =>
                                      order.orderType === selectedOrderType
                                  )?.transferFees
                                }
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <ReCAPTCHA sitekey={captcha_siteKey} />
                  </div>
                </div>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-6 mt-7 md:mt-10">
                <div className="col-span-2"></div>
                <div className="col-span-4 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    className=""
                    onClick={handleProceedToPay}
                  >
                    Proceed to pay
                  </Button>
                  <button
                    className="!text-accent2 hover:!text-white border !border-associationLightgray !bg-white hover:!bg-pvBlack !shadow-none transition-all duration-300 justify-center btn"
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
          condoResponse={condoResponse}
          demandStatementFee={demandStatementFee}
          transferFee={transferFee}
          associationDetails={{
            id: formik.values.association.id,
            name: formik.values.association.name,
            code: formik.values.association.code,
          }}
          message={"condo"}
          propertyId={storePropertyId}
          onBackToForm={handleBackToForm}
        />
      )}
    </>
  );
}

export default CondoQuestionnaire;
