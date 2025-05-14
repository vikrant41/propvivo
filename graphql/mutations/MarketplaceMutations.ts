import { gql } from "@apollo/client";

export const NOT_LOGGEDIN_ENQUIRY = gql`
  mutation guestUserMarketPlaceEnquiry($request:  GuestUserMarketPlaceEnquiryRequestInput!) {
    marketPlaceMutation {
      guestUserMarketPlaceEnquiry(request: $request) {
        data {
          enquiryId
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
  mutation guestUserResendOTP($request: GuestUserResendOTPRequestInput!) {
    marketPlaceMutation {
      guestUserResendOTP(request: $request) {
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
  mutation guestUserVerifyOTP($request: GuestUserVerifyOTPRequestInput!) {
    marketPlaceMutation {
      guestUserVerifyOTP(request: $request) {
        data {
          enquiryId
        }
        message
        statusCode
        success
      }
    }
  }
`;
