import { gql } from "@apollo/client";

export const GET_ALL_REQUESTOR_TYPE = gql`
  query getAllRequestorTypes($request: GetAllRequestorTypesRequestInput!) {
    documentRequestMasterQuery {
      getAllRequestorTypes(request: $request) {
        message
        statusCode
        success
        data {
          requestorTypes {
            requestorType
            requestorTypeDisplayValue
          }
        }
      }
    }
  }
`;
