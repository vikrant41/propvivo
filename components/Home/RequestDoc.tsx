import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  DocShapeIcon,
  FaCall,
  FaEnvelope,
  FaPencil,
  FaUser,
} from "../shared/Icons";
import { Button } from "../CommonComponents/Button";

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

const RequestDoc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <section className="py-9 md:py-16 relative">
        <DocShapeIcon className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block" />
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
                Condo Questionnaires. Our team will get back to you in some time
                or you will get document via E-mail.
              </p>
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
                        Request Document
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestDoc;
