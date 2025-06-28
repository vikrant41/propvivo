import { gql } from "@apollo/client";

export const ONE_TIME_PAYMENT_REQUEST = gql`
  mutation oneTimePayment($request: OneTimePaymentRequestInput!) {
    paymentMutation {
      oneTimePayment(request: $request) {
        message
        statusCode
        success
        data {
          additionalFee
          amount
          amountCurrency
          effectiveDate
          paymentMethodLabel
          paymentMethodLast4
          propertyId
          totalAmount
          transactionDate
          transactionDesc
          transactionId
          transactionStatus
        }
      }
    }
  }
`;

export const VALIDATE_CARD_NUMBER = gql`
  mutation validateCreditCard($request: ValidateCardNumberRequestInput!) {
    paymentMutation {
      validateCreditCard(request: $request) {
        message
        statusCode
        success
        data {
          isValidCardNumber
        }
      }
    }
  }
`;

export const GET_PROPERTY_ID_REQUEST = gql`
  query getUnits($request: GetAllUnitsRequestInput!) {
    userQueries {
      getUnits(request: $request) {
        message
        statusCode
        success
        data {
          unitData {
            addressId
            fullAddress
            isAddressActive
            legalEntityId
            propertyId
            propertyNumber
            unitId
            userId
          }
        }
      }
    }
  }
`;
