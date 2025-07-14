import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { FaCall, FaEnvelope, FaPencil, FaUser } from "../shared/Icons";
import { Button } from "../CommonComponents/Button";
import { useMutation } from "@apollo/client";
import ThankYouModal from "../CommonModals/ThankYouModal";
import CenteredLoader from "../CommonComponents/CenterLoader";
import { useToast } from "../UI/ToastContext";
import { CONTACT_US_REQUEST } from "../../graphql/mutations/ContactUsMutations";
import ReCAPTCHA from "react-google-recaptcha";

// Validation Schema for the form fields
const validationSchema = Yup.object({
  name: Yup.string().required("Please enter Name"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter Email"),
  phone: Yup.string()
    .min(10, "Phone number should be at least 10 digits")
    .required("Please enter Phone Number"),
  doc: Yup.string()
    .required("Please specify the document you need")
    .min(3, "Document description must be at least 3 characters"),
});

// Initial form values
const initialValues: any = {
  name: "",
  email: "",
  phone: "",
  doc: "",
};

const RequestDoc = () => {
  // all state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { showToast } = useToast();
  const captchaSiteKey = process.env.NEXT_PUBLIC_G_CAPTCHA_KEY;
  // GraphQL Mutation for requesting documents
  const [
    requestDocument,
    {
      data: requestDocumentResponse,
      loading: requestDocumentLoading,
      error: requestDocumentError,
    },
  ] = useMutation(CONTACT_US_REQUEST, {
    onCompleted: () => {},
  });

  // Detect mobile screen size for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle form submission
  const handleSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    const rawPhoneNumber = values.phone.replace(/\D/g, "");
    resetForm();

    const payLoad = {
      name: values.name,
      email: values.email,
      phoneNumber: rawPhoneNumber,
      message: values.doc,
    };

    try {
      const response = await requestDocument({
        variables: {
          request: { requestParam: payLoad },
          requestSubType: "Add",
          requestType: "RequestDocument",
        },
      });

      if (
        response?.data?.contactUsMutations?.createContractUs?.statusCode === 200
      ) {
        setIsModalOpen(true);
      } else {
        showToast(
          "error",
          "Something went wrong while submitting the request."
        );
      }
    } catch (error) {
      showToast(
        "error",
        error?.graphQLErrors?.[0]?.extensions?.message || error?.message
      );
    }
  };

  if (requestDocumentLoading) {
    return <CenteredLoader />;
  }

  return (
    <>
      <section className="py-9 md:py-16 relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 items-center gap-y-8 lg:gap-x-10">
            <div className="relative">
              <img
                src="./img/requestDoc.png"
                className="w-full h-full lg:-ml-24"
                style={{
                  minWidth: isMobile ? "100%" : "650px",
                }}
              />
            </div>
            <div>
              <h2>Request Key Documents</h2>
              <p>
                Raise a request for Demand Statements, Resale Certificates,
                Condo Questionnaires. Our team will get back to you shortly, or
                you'll receive the document via E-mail.
              </p>
              <div className="relative">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue }) => (
                    <Form className="">
                      <div className="w-full space-y-6">
                        <div className="relative">
                          <div className="flex items-center border-b border-gray-o-60">
                            <FaUser className="ml-1" />
                            <Field
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Name / Company Name"
                              className="w-full bg-transparent pl-3 py-3 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                            />
                          </div>
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-sm text-red-500 absolute"
                          />
                        </div>

                        <div className="relative">
                          <div className="flex items-center border-b border-gray-o-60">
                            <FaCall className="ml-1" />
                            <Field
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="Contact Number"
                              className="w-full bg-transparent pl-3 py-3 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                              onChange={(e) => {
                                const input = e.target.value.replace(/\D/g, "");
                                const formattedPhone =
                                  input.length <= 10
                                    ? input
                                    : input.slice(0, 10);

                                // Format phone number as (XXX) XXX-XXXX if 10 digits are entered
                                let phoneFormatted = formattedPhone;
                                if (formattedPhone.length === 10) {
                                  phoneFormatted = `(${formattedPhone.slice(
                                    0,
                                    3
                                  )}) ${formattedPhone.slice(
                                    3,
                                    6
                                  )}-${formattedPhone.slice(6, 10)}`;
                                }

                                setFieldValue("phone", phoneFormatted);
                              }}
                              onKeyDown={(e) => {
                                const allowedKeys = [
                                  "Backspace",
                                  "Tab",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                ];
                                if (
                                  !/^[0-9]$/.test(e.key) &&
                                  !allowedKeys.includes(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </div>
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-sm text-red-500 absolute"
                          />
                        </div>

                        <div className="relative">
                          <div className="flex items-center border-b border-gray-o-60">
                            <FaEnvelope className="ml-1" />
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email ID"
                              className="w-full bg-transparent pl-3 py-3 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                            />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-sm text-red-500 absolute"
                          />
                        </div>

                        <div className="relative">
                          <div className="flex items-center border-b border-gray-o-60">
                            <FaPencil className="ml-1" />
                            <Field
                              type="text"
                              id="doc"
                              name="doc"
                              placeholder="Which documents you need?"
                              className="w-full bg-transparent pl-3 py-3 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                            />
                          </div>
                          <ErrorMessage
                            name="doc"
                            component="div"
                            className="text-sm text-red-500 absolute"
                          />
                        </div>

                        <div className="pt-4">
                          <ReCAPTCHA
                            sitekey={captchaSiteKey}
                            onChange={(value) =>
                              setFieldValue("recaptcha", value)
                            }
                          />
                          <ErrorMessage
                            name="recaptcha"
                            component="div"
                            className="text-sm text-red-500 absolute"
                          />
                        </div>

                        <Button type="submit" className="!mt-11">
                          Request Document
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <ThankYouModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default RequestDoc;
