import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  CallBlueIcon,
  CallGreenIcon,
  ClockBlueIcon,
  FaCall,
  FaEnvelope,
  FaPencil,
  FaToggle,
  FaUser,
  LocationIcon,
  MailBlueIcon,
  MailGreenIcon,
  TimeGreenIcon,
} from "../shared/Icons";
import { Button } from "../CommonComponents/Button";
import SocialContactIcon from "../CommonComponents/SocialContactIcon";
import { useMutation } from "@apollo/client";
import { CONTACT_US_REQUEST } from "../../graphql/mutations/ContactUsMutations";
import ThankYouModal from "../CommonModals/ThankYouModal";
import CenteredLoader from "../CommonComponents/CenterLoader";
import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "../UI/ToastContext";

const locations = {
  usa: {
    name: "United States",
    address: "2018 156th Ave NE, Bellevue, WA 98007, United States.",
    flag: "/img/usflag.png",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.85212323911!2d-122.1348702079786!3d47.62900571215861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906da169af3cc9%3A0xfd27894e48cf2b93!2sPropVIVO!5e0!3m2!1sen!2sin!4v1733737652587!5m2!1sen!2sin",
  },
  india: {
    name: "India",
    address: "Office 612-614, Homeland City Tower, Vesu, Surat.",
    flag: "/img/inflag.png",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.246415461992!2d72.77462363751708!3d21.15289166411913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d8be5423ffb%3A0x1576414c0877c525!2sHomeland%20City!5e0!3m2!1sen!2sin!4v1752646490656!5m2!1sen!2sin",
  },
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Contact number length should be 10")
    .required("Contact number is required"),
  reason: Yup.string()
    .required("Reason for contact is required")
    .matches(/^(?!.*\s{2,})[^\s][\s\S]*[^\s]$/, "White space not allowed"),
  doc: Yup.string()
    .trim()
    .min(3, "Please specify the document or description.")
    .required("Document description is required.")
    .matches(
      /^(?!\s*$).+$/,
      "Document description cannot be empty or just spaces."
    ),
  // recaptcha: Yup.string().required("Please verify that you are not a robot"),
});

const initialValues: any = {
  name: "",
  email: "",
  phone: "",
  reason: "",
  doc: "",
  recaptcha: "",
};

const ContactSection = () => {
  const [selected, setSelected] = useState<"usa" | "india">("usa");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Google ReCAPTCHA key
  const captchaSiteKey = process.env.NEXT_PUBLIC_G_CAPTCHA_KEY;
  const { showToast } = useToast();

  const [
    PostContactEnquiryRequest,
    {
      data: contactUsEnquiryResponse,
      loading: contactUsEnquiryResponseLoading,
      error: error,
    },
  ] = useMutation(CONTACT_US_REQUEST, {
    onCompleted: () => {
      // refetch();
    },
  });

  const handleSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    const rawPhoneNumber = values.phone.replace(/\D/g, "");
    resetForm();

    const payLoad = {
      contactReason: values?.reason,
      email: values?.email,
      message: values?.doc,
      name: values?.name,
      phoneNumber: rawPhoneNumber,
    };

    try {
      const response = await PostContactEnquiryRequest({
        variables: {
          request: { requestParam: payLoad },
          requestSubType: "Add",
          requestType: "ContactUs",
        },
      });
      if (
        response?.data?.contactUsMutations?.createContactUs?.statusCode === 200
      ) {
        setIsModalOpen(true);
      } else {
        showToast("error", "Something went wrong while creating Case Type.");
      }
    } catch (error) {
      showToast(
        "error",
        error?.graphQLErrors?.[0]?.extensions?.message || error?.message
      );
    } finally {
      // setIsLoading(false);
    }
  };

  if (contactUsEnquiryResponseLoading) {
    return <CenteredLoader />;
  }

  return (
    <>
      <section className="relative">
        <div className="py-12 md:py-16 relative">
          <div className="container">
            <div className="grid lg:grid-cols-2 items-center gap-y-8 lg:gap-x-14">
              <div className="relative space-y-7">
                <div>
                  <h2>Contact Us</h2>
                  <p>
                    Send us a message and we will revert to you right away!!!
                    Homeowners please use your association portal to contact us
                    for faster response. Get in touch and let us know how we can
                    help.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 space-y-4 md:space-y-0 gap-x-10">
                  <div className="flex flex-col">
                    <h5 className="font-medium">Contact</h5>
                    <ul
                      className={`space-y-3 transition-all duration-500 block mxl:top-20 left-0 right-0 p-0`}
                    >
                      <li className="relative flex gap-2 ">
                        <CallBlueIcon /> <a href="tel:+1 (888) 392-3515">+1 (888) 392-3515</a>
                      </li>
                      <li className="relative flex gap-2 ">
                        <MailBlueIcon /> <a href="mailto:services@propvivo.com">services@propvivo.com</a>
                      </li>
                      <li className="relative flex gap-2 ">
                        <ClockBlueIcon /> Mon - Fri : 9 am - 5 pm, <br />
                        Sat - Sun : Closed
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <SocialContactIcon />
                  </div>
                </div>
              </div>
              <div>
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
                                  const input = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
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
                              <FaToggle className="ml-1" />
                              <Field
                                type="text"
                                id="reason"
                                name="reason"
                                placeholder="Reason for Contact"
                                className="w-full bg-transparent pl-3 py-3 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                              />
                            </div>
                            <ErrorMessage
                              name="reason"
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

                          <Button
                            type="submit"
                            disabled={contactUsEnquiryResponseLoading}
                            className="!mt-8"
                          >
                            {contactUsEnquiryResponseLoading
                              ? "Submitting..."
                              : "Submit Inquiry"}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              {isModalOpen && (
                <ThankYouModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </div>
            <div className="mt-14">
              <h2 className="font-medium mb-7">Our Office Address</h2>
              <div className="grid grid-cols-1 mxl:grid-cols-11 gap-4 mxl:gap-8 items-stretch">
                {/* Google Map */}
                <iframe
                  src={locations[selected].mapSrc}
                  className="rounded-xl w-full h-full col-span-8"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>

                {/* Location Selector */}
                <div className="col-span-8 mxl:col-span-3 grid grid-cols-1 md:grid-cols-2 mxl:grid-rows-2 gap-4">
                  {(["usa", "india"] as const).map((key) => (
                    <div
                      key={key}
                      onClick={() => setSelected(key)}
                      className={`cursor-pointer mxl:min-h-44 border rounded-lg p-2 mxl:py-6 mxl:px-4 transition-all duration-200 ${
                        selected === key
                          ? "border-btnDarkBlue bg-pvLightBlue"
                          : "border-gray-o-60 hover:bg-pvLightBlue"
                      }`}
                    >
                      <div className="font-outfit text-22 mxl:text-3xl text-pvBlack mb-1 flex items-center gap-2">
                        <img
                          src={locations[key].flag}
                          alt={`${locations[key].name} Flag`}
                          className="w-5 h-5 object-contain"
                        />
                        {locations[key].name}
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <p className="flex-1">{locations[key].address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
