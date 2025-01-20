import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  CallGreenIcon,
  DocShapeIcon,
  FaCall,
  FaEnvelope,
  FaPencil,
  FaToggle,
  FaUser,
  LocationIcon,
  MailGreenIcon,
  TimeGreenIcon,
} from "../shared/Icons";
import { Button } from "../CommonComponents/Button";
import SocialIcons from "../CommonComponents/SocialIcons";
import SocialContactIcon from "../CommonComponents/SocialContactIcon";

const validationSchema = Yup.object({
  name: Yup.string().required("Please enter Name"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter Email"),
});

const initialValues: any = {
  name: "",
  email: "",
};

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    // console.log(values);
    setIsModalOpen(true);
    resetForm();
  };

  return (
    <>
      <section className="relative">
        <div className="py-12 md:py-16 relative">
          <div className="container">
            <div className="grid lg:grid-cols-2 items-end gap-y-8 lg:gap-x-14">
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
                        <CallGreenIcon /> +1 (888) 392-3515
                      </li>
                      <li className="relative flex gap-2 ">
                        <MailGreenIcon /> services@propvivo.com
                      </li>
                      <li className="relative flex gap-2 ">
                        <TimeGreenIcon /> 2018 156th Ave NE, Bellevue WA 98007
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <SocialContactIcon />
                  </div>
                </div>
                <div>
                  <h5 className="font-medium">Our Office Address</h5>
                  <div className="grid md:grid-cols-2 items-center gap-5 md:gap-10">
                    <div>
                      <div className="text-lg text-pvBlack mb-1">USA</div>
                      <div className="flex items-start gap-1">
                        <LocationIcon />
                        <p className="flex-1">
                          2018 156th Ave NE, Bellevue, WA 98007, United States.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="text-lg text-pvBlack mb-1">India</div>
                      <div className="flex items-start gap-1">
                        <LocationIcon />
                        <p className="flex-1">
                          Office 612-614, Homeland City Tower, Vesu, Surat.
                        </p>
                      </div>
                    </div>
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
                            className="text-red-500 absolute"
                          />
                        </div>

                        <div className="relative">
                          <div className="flex items-center border-b border-gray-o-60">
                            <FaCall className="ml-1" />
                            <Field
                              type="text"
                              id="phone"
                              name="phone"
                              placeholder="Phone"
                              className="w-full bg-transparent pl-3 py-3 outline-none text-17 placeholder:text-accent2 text-pvBlack"
                            />
                          </div>
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
                            className="text-red-500 absolute"
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
                        </div>

                        <Button type="submit" className="!mt-11">
                          Submit Inquiry
                        </Button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.85212323911!2d-122.1348702079786!3d47.62900571215861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906da169af3cc9%3A0xfd27894e48cf2b93!2sPropVIVO!5e0!3m2!1sen!2sin!4v1733737652587!5m2!1sen!2sin"
          width="100%"
          height="450"
        ></iframe>
      </section>
    </>
  );
};

export default ContactSection;
