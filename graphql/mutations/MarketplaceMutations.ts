import { gql } from "@apollo/client";

export const NOT_LOGGEDIN_ENQUIRY = gql`
  mutation NotLoggedIn($request:  CreateEnquiryForNotLoggedInUserRequestInput!) {
    marketPlaceMutation {
      NotLoggedInEnquiry(request: $request) {
        data {
          enqiuryId
          otp
        }
        message
        statusCode
        success
      }
    }
  }
`;
export const RESEND_OTP = gql`
  mutation ResendOtp($request: ResendOtpRequestInput!) {
    marketPlaceMutation {
      ResendOtp(request: $request) {
        data {
          otp
        }
        message
        statusCode
        success
      }
    }
  }
`;
export const VERIFY_OTP = gql`
  mutation VerifyOtp($request: VerifyActivationCodeRequestInput!) {
    marketPlaceMutation {
      VerifyOtp(request: $request) {
        data {
          enqiuryId
        }
        message
        statusCode
        success
      }
    }
  }
`;
