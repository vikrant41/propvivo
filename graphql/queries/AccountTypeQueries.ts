import { gql } from "@apollo/client";


export const GET_ALL_ACCOUNT_TYPE_REQUEST = gql`
  query accountTypeRequests($request: GetAllAccountTypesRequestInput!) {
    paymentQuery {
      getAllAccountType(request: $request) {
        data {
          accountTypes {
            accountType
            accountTypeDisplayValue
          }
        }
        message
        statusCode
        success
      }
    }
  }
`;