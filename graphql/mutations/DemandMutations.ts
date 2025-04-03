import { gql } from "@apollo/client";

export const CREATE_DEMAND_REQUEST = gql`
  mutation CreateDemandStatement($request : CreateDemandStatementRequestInput!) {
    demandStatementMutation {
      createDemandStatement(request: $request) {
        message
        statusCode
        success
        data {
          demandStatementId
        }
      }
    }
  }
`;
