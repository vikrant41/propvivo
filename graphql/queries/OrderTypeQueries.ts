import { gql } from "@apollo/client";

export const GET_ALL_ORDER_TYPE = gql`
  query getAllOrderTypes($request: GetAllOrderTypesRequestInput!) {
    documentRequestMasterQuery {
      getAllOrderTypes(request: $request) {
        message
        statusCode
        success
        data {
          orderTypes {
            fees
            orderType
            orderTypeDisplayValue
            processingDuration
            transferFees
          }
        }
      }
    }
  }
`;
