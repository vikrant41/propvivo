import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { CustomTextField } from "./CustomTextField";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../slices/MarketPlace";
import { ArrowIcon, AssociationOtpIcon } from "../shared/Icons";
import { useMutation } from "@apollo/client";
import { RESEND_OTP, VERIFY_OTP } from "../../graphql/mutations/MarketplaceMutations";
import { generateBodyPayload } from "../../slices/apiSlice";
import { requestSubType, requestType } from "../Helper/Helper";


type Props = {
  hideModal?: () => void;
  nextStep?: () => void;
  marketPlaceId?: string | string[];
  formData: any;
  setFormData: any;
  inquiryId: string;
  initialTime?: number;
};

function VerifyOTP({
  hideModal,
  marketPlaceId,
  setFormData,
  formData,
  nextStep,
  inquiryId,
  initialTime = 10,
}: Props) {
  const [isResendOtp, setisResendOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimeUp, setIsTimeUp] = useState(false);
  // const [
  //   addOtp,
  //   {
  //     data: addInquiryResponse,
  //     isLoading: addInquiryLoading,
  //     isError: addInquiryError,
  //     error: addInquiryErrorData,
  //   },
  // ] = useVerifyOtpMutation();

  // const [
  //   resendOtp,
  //   {
  //     data: resendResponse,
  //     isLoading: resendLoading,
  //     isError: resendError,
  //     error: resendErrorData,
  //   },
  // ] = useResendOtpMutation();

  const [addOtp, { loading:addotpLoading, error:addotpErrorData, data:addotpResponse }] = useMutation(VERIFY_OTP);
  const [resendOtp, { loading:addResendOtpLoading, error:addResendOtpErrorData, data:addResendOtpResponse }] = useMutation(RESEND_OTP);

  // formik validation schema
  const validationSchema = () =>
    Yup.object({
      otp: Yup.string().required(
        "Invalid One-Time-Password (OTP). Try again or re-generate new."
      ),
    });

  //formik hook
  const formik = useFormik({
    initialValues: formData.step2,
    validationSchema: !isResendOtp ? validationSchema : "",
    // enableReinitialize: isEdit ? true : false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // function for submit form
  // const handleSubmit = (values) => {
  //   if (isResendOtp) {
  //     resendOtp({
  //       enqiuryId: inquiryId,
  //       marketPlaceAdId: marketPlaceId,
  //     });
  //     // .then((res)=>{
  //     //   if (response?.data?.statusCode === 200) {
  //     //     nextStep();
  //     //   }
  //     // });
  //     setTimeLeft(initialTime);
  //     setIsTimeUp(false);
  //   } else {
  //     addOtp({
  //       enqiuryId: inquiryId,
  //       marketPlaceAdId: marketPlaceId,
  //       otp: values?.otp,
  //     }).then((response: any) => {
  //       if (response?.data?.statusCode === 200) {
  //         nextStep();
  //       }
  //     });
  //   }
  // };

  const handleSubmit = (values) => {
    if (isResendOtp) {
      const payload = {
        enqiuryId: inquiryId,
        marketPlaceAdId: marketPlaceId,
      };
      const finalPayload = generateBodyPayload(
        requestSubType.Add,
        requestType.MarketPlace,
        payload
      );
      resendOtp({ variables: { request: finalPayload } });
      // .then((res)=>{
      //   if (response?.data?.statusCode === 200) {
      //     nextStep();
      //   }
      // });
      setTimeLeft(initialTime);
      setIsTimeUp(false);
    } else {
      const otpPayload = {
        enqiuryId: inquiryId,
        marketPlaceAdId: marketPlaceId,
        otp: values?.otp,
      };
      const finalPayload = generateBodyPayload(
        requestSubType.Add,
        requestType.MarketPlace,
        otpPayload
      );
      addOtp({ variables: { request: finalPayload } }).then((response: any) => {
        if (response?.data?.marketPlaceMutation?.VerifyOtp?.success) {
          nextStep();
        }
      });
    }
  };  

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsTimeUp(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <div className="font-karla text-associationGray text-lg">
            OTP sent on xxxxxxxx90 Phone number.
          </div>
          <CustomTextField
            type="text"
            name="otp"
            placeholder="One-Time-Password (OTP)"
            maxLength="50"
            required
            value={formik.values?.otp}
            errors={
              formik.touched.otp && formik.errors.otp && formik.errors.otp
            }
            icon={<AssociationOtpIcon />}
          />
          <div className="text-btnDarkBlue font-karla text-lg mb-4">
            OTP will expire in {formatTime(timeLeft)} ms.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              onClick={() => setisResendOtp(false)}
              className="px-8 py-3 flex items-center gap-2 text-white rounded-full group font-outfit bg-btnDarkBlue border border-btnDarkBlue shadow-associationBtnshadow text-base cursor-pointer"
            >
              Verify
              <ArrowIcon className="group-hover:translate-x-1 transition-all duration-300" />
            </button>
            {isTimeUp && (
              <button
                onClick={() => setisResendOtp(true)}
                type="submit"
                className="px-8 py-3 flex items-center gap-2 text-btnDarkBlue rounded-full group font-outfit bg-white text-base border border-btnDarkBlue hover:bg-btnDarkBlue hover:text-white transition-all duration-300 cursor-pointer"
              >
                Resend
              </button>
            )}
          </div>
        </Form>
      </FormikProvider>
    </>
  );
}

export default VerifyOTP;
