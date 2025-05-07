import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { CustomTextField } from "./CustomTextField";
import {
  ArrowIcon,
  AssociationCallIcon,
  AssociationEmailIcon,
  AssociationMessageIcon,
  AssociationPriceIcon,
  AssociationProfileIcon,
} from "../shared/Icons";
import { useUnAutorizeEnquiryMutation } from "../../slices/MarketPlace";
import { useMutation } from "@apollo/client";
import { generateBodyPayload } from "../../slices/apiSlice";
import { requestSubType, requestType } from "../Helper/Helper";
import { NOT_LOGGEDIN_ENQUIRY } from "../../graphql/mutations/MarketplaceMutations";

type Props = {
  hideModal?: () => void;
  isEdit?: boolean;
  marketPlaceId?: string | string[];
  price: string;
  nextStep?: () => void;
  setFormData?: any;
  formData?: any;
  setInquiryId?: (id) => void;
};

function MakeInquiry({
  hideModal,
  isEdit,
  marketPlaceId,
  price,
  nextStep,
  setFormData,
  formData,
  setInquiryId,
}: Props) {
  // formik validation schema
  const validationSchema = (price) =>
    Yup.object({
      name: Yup.string()
        .max(200, "Name must be at most 200 characters")
        .required("Name is required"),
      phoneNo: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers allowed")
        .min(10, "Phone number must be at least 10 digits")
        .max(11, "Phone number must be at most 10 digits")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      offerPrice: Yup.string()
        .required("Offer price is required")
        .matches(
          /^(?!0)\d+(\.\d{1,2})?$/,
          "Price must be a valid number with up to 2 decimal places"
        )
        // .matches(/^\d+$/, "Offer Price must contain only numbers")
        .test(
          "is-less-than-price",
          `Offer price must be smaller than the price (${price})`,
          function (value) {
            if (!value || !price) return true;
            return parseFloat(value) <= parseFloat(price);
          }
        ),
      message: Yup.string()
        .max(5000, "Message must be at most 5000 characters")
        .required("Message is required"),
    });

  //formik hook
  const formik = useFormik({
    initialValues: formData.step1,
    validationSchema: validationSchema(price),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // add inquiry API
  // const [
  //   addInquiry,
  //   {
  //     data: addInquiryResponse,
  //     isLoading: addInquiryLoading,
  //     isError: addInquiryError,
  //     error: addInquiryErrorData,
  //   },
  // ] = useUnAutorizeEnquiryMutation();

  const [addInquiry, { loading:addInquiryLoading, error:addInquiryErrorData, data:addInquiryResponse }] = useMutation(NOT_LOGGEDIN_ENQUIRY);

    const handleSubmit = (values) => {
      setFormData((prev: any) => ({ ...prev, step1: values }));
      const payload = {
        name: values?.name,
        email: values?.email,
        phoneNo: 
        {
          countryId:"",
          countryName:"",
          number:values?.phoneNo,
          phoneCode: ""
        },
        marketPlaceAdId: marketPlaceId,
        message: values?.message,
        offerPrice: parseFloat(values?.offerPrice),
      };
  
      const finalPayload = generateBodyPayload(
        requestSubType.Add,
        requestType.MarketPlace,
        payload
      );
      addInquiry({ variables: { request: finalPayload } })
        .then((res: any) => {
          if (res?.data?.marketPlaceMutation?.guestUserMarketPlaceEnquiry?.statusCode === 200) {
            setInquiryId(res?.data?.marketPlaceMutation?.guestUserMarketPlaceEnquiry?.data?.enquiryId);
            nextStep();
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} className="flex flex-col gap-7">
          <CustomTextField
            type="text"
            name="name"
            placeholder="Enter Name"
            maxLength="200"
            required
            value={formik.values?.name}
            errors={
              formik.touched.name && formik.errors.name && formik.errors.name
            }
            icon={<AssociationProfileIcon />}
          />

          <CustomTextField
            type="text"
            name="phoneNo"
            placeholder="Phone"
            title="Phone"
            required
            maxLength="10"
            value={formik.values.phoneNo}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
              formik.setFieldValue("phoneNo", onlyNumbers);
            }}
            errors={formik.touched.phoneNo && formik.errors.phoneNo}
            icon={<AssociationCallIcon />}
          />

          {/* <div>
            <HomePhoneInput
              name="phoneNo"
              placeholder={"Enter Phone Number"}
              handleCountryCode={(code) => setHomePhoneCode(code)}
              phoneCode={homePhoneCode?.phoneCode}
              error={
                formik.touched.phoneNo &&
                formik.errors.phoneNo &&
                formik.errors.phoneNo
              }
            />
          </div> */}

          <CustomTextField
            type="text"
            name="email"
            placeholder="Primary Email"
            title="Email"
            required
            value={formik.values?.email}
            errors={
              formik.touched.email && formik.errors.email && formik.errors.email
            }
            icon={<AssociationEmailIcon />}
          />

          <CustomTextField
            type="text"
            name="offerPrice"
            placeholder="Offer Price"
            title="offerPrice"
            required
            value={formik.values?.offerPrice}
            errors={
              formik.touched.offerPrice &&
              formik.errors.offerPrice &&
              formik.errors.offerPrice
            }
            icon={<AssociationPriceIcon />}
          />

          <CustomTextField
            type="text"
            name="message"
            placeholder="Drop a message here..."
            title="Message"
            // clsName="py-1"
            maxLength="5000"
            required
            value={formik.values.message}
            errors={
              formik.touched.message &&
              formik.errors.message &&
              formik.errors.message
            }
            icon={<AssociationMessageIcon />}
          />

          <div>
            <button
              // disabled={!formik?.dirty}
              type="submit"
              className="px-8 py-3 flex items-center gap-2 text-white rounded-full group font-outfit bg-btnDarkBlue shadow-associationBtnshadow text-base cursor-pointer"
            >
              Submit
              <ArrowIcon className="group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
}

export default MakeInquiry;
