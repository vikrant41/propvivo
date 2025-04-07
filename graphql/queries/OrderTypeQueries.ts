import { gql } from "@apollo/client";

export const GET_ALL_ORDER_TYPE = gql`
  query getAllOrderTypeRequest($request: GetOrderTypeRequestInput!) {
    demandStatementQuery {
      OrderType(request: $request) {
        message
        statusCode
        success
        data {
          orderTypesFees {
            demandFees
            orderType
            transferFees
          }
        }
      }
    }
  }
`;
