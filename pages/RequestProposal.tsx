import React, { useEffect, useState } from "react";
// Components
import TopBanner from "../components/CommonComponents/TopBanner";
import { Button } from "../components/CommonComponents/Button";

// Formik
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";

// GraphQL Queries & Mutations
import { CREATE_DEMAND_REQUEST } from "../graphql/mutations/DemandMutations";
import { useBreadcrumbs } from "../contexts/BreadCrumbContext";
import ReCAPTCHA from "react-google-recaptcha";

const validationSchema = Yup.object({
  buyerFirstName: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "First Name can only contain letters and spaces")
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  buyerLastName: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "Last Name can only contain letters and spaces")
    .min(1, "Last Name must be at least 1 character")
    .required("Last Name is required"),
  buyerEmail: Yup.string().email("Invalid email").required("Email is required"),
  buyerPhone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  associationName: Yup.string()
    .min(3, "Association Name must be at least 3 characters")
    .required("Association Name is required"),

  address1: Yup.string().required("Address Line 1 is required"),
  address2: Yup.string().notRequired(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
});

const RequestProposal = () => {
  // all state management
  const [formData, setFormData] = useState<any>(null);
  const [condoResponse, setCondoResponse] = useState(null);
  const { setBreadcrumbs } = useBreadcrumbs();

  // Google ReCAPTCHA key
  const captcha_siteKey = process.env.NEXT_PUBLIC_G_CAPTCHA_KEY;

  // formik
  const formik = useFormik({
    initialValues: {
      buyerFirstName: "",
      buyerLastName: "",
      buyerEmail: "",
      buyerPhone: "",
      associationName: "",
      address: { id: "", name: "" },
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setFormData(values);
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
    const payload = {
      documentType: "DemandStatement",
      buyer: {
        firstName: formik?.values?.buyerFirstName,
        lastName: formik?.values?.buyerLastName,
        email: formik?.values?.buyerEmail,
        phone: {
          number: formik?.values?.buyerPhone,
        },
      },
    };

    try {
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
        response?.data?.documentRequestMasterMutation?.createDocumentRequest
          ?.statusCode === 200
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

  // Reset Demand Form
  const handleReset = () => {
    formik.resetForm();
    setFormData(null);
  };

  const handleProceedToPay = async () => {
    const isValid = await formik.validateForm();
    if (Object.keys(isValid).length === 0) {
      setFormData(formik.values);
      // formik.submitForm();
    }
  };

  useEffect(() => {
      setBreadcrumbs([
        { name: "propVIVO", href: "/" },
        { name: "Request for Proposal" },
      ]);
    }, [setBreadcrumbs]);

  return (
    <>
      <TopBanner backgroundImage="./img/Banner.jpg" title="Request for Proposal" />
      <div className="max-w-3xl mx-auto my-14 px-5">
        <FormikProvider value={formik}>
          <Form autoComplete="off" className="">
            <div className="w-full space-y-6">
              {/* <div className="text-pvBlack text-3xl font-bold">
                REQUEST FOR PROPOSAL
              </div> */}
              <div className="relative grid grid-cols-1 md:grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Proposal Request Form<span className="text-red-500">*</span>
                </label>
                <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        placeholder="Email"
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
                              placeholder="Phone"
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

              <div className="relative grid grid-cols-1 md:grid-cols-6">
                <label className="text-pvBlack text-base font-medium font-outfit col-span-2">
                  Association Details <span className="text-red-500">*</span>
                </label>
                <div className="col-span-4 space-y-4">
                  <div>
                    <div className="flex items-center border-b border-gray-o-60">
                      <Field
                        type="text"
                        name="associationName"
                        placeholder="Association Name"
                        className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                      />
                    </div>
                    <ErrorMessage
                      name="associationName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="col-span-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <div className="flex items-center border-b border-gray-o-60">
                          <Field
                            type="text"
                            name="address1"
                            placeholder="Address Line 1"
                            className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                          />
                        </div>
                        <ErrorMessage
                          name="address1"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <div className="flex items-center border-b border-gray-o-60">
                          <Field
                            type="text"
                            name="address2"
                            placeholder="Address Line 2"
                            className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                          />
                        </div>
                        <ErrorMessage
                          name="address2"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* ✅ City, State, Zip - Full Row with Equal Widths */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="w-full">
                        <div className="flex items-center border-b border-gray-o-60">
                          <Field
                            type="text"
                            name="city"
                            placeholder="City"
                            className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                          />
                        </div>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex items-center border-b border-gray-o-60">
                          <Field
                            type="text"
                            name="state"
                            placeholder="State"
                            className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                          />
                        </div>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex items-center border-b border-gray-o-60">
                          <Field
                            type="text"
                            name="zip"
                            placeholder="ZipCode"
                            className="w-full bg-transparent py-2 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                          />
                        </div>
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <ReCAPTCHA sitekey={captcha_siteKey} />
                    </div>
                  </div>
                </div>
              </div>
              {/* <ReCAPTCHA sitekey={captcha_siteKey} /> */}
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-6 mt-10">
              <div className="col-span-2"></div>
              <div className="col-span-4 flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="" onClick={handleProceedToPay}>
                  Submit
                </Button>
                <button
                  className="px-8 py-1 rounded-full text-accent2 hover:text-white border border-associationLightgray bg-white hover:bg-accent1 shadow-none transition-all duration-300 justify-center font-outfit"
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
    </>
  );
};

export default RequestProposal;
