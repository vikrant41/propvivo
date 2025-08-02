import React, { useState } from "react";
import { Button } from "../CommonComponents/Button";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NewsletterBottomShape, NewsletterTopShape } from "../shared/Icons";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter email address"),
});

const initialValues: any = {
  email: "",
};

const CommunitySection = () => {
  const router = useRouter();
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
      <section className="py-9 md:py-14 relative bg-pvLightBlue ">
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-x-16 justify-between relative">
          <div className="flex flex-col justify-center">
            <h3 className="leading-tight md:text-5xl">
              Ready to Transform Your Community?
            </h3>
            <p className="text-lg">
              Join the growing number of communities choosing a better way to manage with propVIVO.
            </p>
            <div className="mt-5">
              <Button onClick={() => router.push("/RequestProposal")}>
                Request for Proposal
              </Button>
            </div>
          </div>

          <div className="bg-accent1 rounded-2xl relative overflow-hidden">
            <NewsletterTopShape className="absolute top-0" />
            <NewsletterBottomShape className="absolute right-0 bottom-0 " />
            <div className="p-8 md:p-10 lg:py-12 lg:px-7 relative">
              <div>
                <h3 className="text-white mb-0 md:text-xxl">Subscribe to our Newsletter</h3>
                <p className="text-white text-lg">
                  Subscribe to our newsletter to get latest updates & benefits
                </p>
              </div>
              <div className="mt-6">
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
                        className="w-full bg-white pl-3 py-2 outline-none text-17 placeholder:text-accent2 rounded-full text-base font-outfit"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 mxl:absolute mxl:-bottom-8"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="border border-white md:border-inherit md:border-0 w-full md:w-auto h-10 !px-5"
                    >
                      Subscribe
                    </Button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunitySection;
