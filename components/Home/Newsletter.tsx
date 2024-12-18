import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Button } from "../CommonComponents/Button";
import { NewsletterBottomShape, NewsletterTopShape } from "../shared/Icons";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter email address"),
});

const initialValues: any = {
  email: "",
};

const Newsletter = () => {
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
      <section className="relative pt-4 bg-pvLightBlue after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-accent ">
        <div className="container relative z-10">
          <div className="bg-accent1 rounded-2xl relative overflow-hidden">
            <NewsletterTopShape className="absolute top-0" />
            <NewsletterBottomShape className="absolute right-0 bottom-0 " />
            <div className="grid lg:grid-cols-2 gap-5 lg:gap-x-16 justify-between p-8 md:p-10 lg:py-14 lg:px-16 relative">
              <div>
                <h3 className="text-white mb-0">Subscribe to our Newsletter</h3>
                <p className="text-white">
                  Subscribe to our newsletter to get latest updates & benefits
                </p>
              </div>
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form className="md:flex justify-between md:bg-white rounded-full md:p-2 newsletterForm md:shadow-newsletterShadow">
                    <div className="relative flex-1 mb-3 md:mb-0">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="w-full bg-white pl-3 py-4 md:py-3 outline-none text-17 placeholder:text-accent2 rounded-full text-base font-outfit"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 absolute -bottom-8"
                      />
                    </div>

                    <Button type="submit" className="border border-white md:border-inherit md:border-0 w-full md:w-auto">
                      Subscribe
                    </Button>
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

export default Newsletter;
