import { gql } from "@apollo/client";

export const CREATE_DEMAND_REQUEST = gql`
  mutation CreateDemandStatement($request: CreateDocumentRequestRequestInput!) {
    documentRequestMasterMutation {
      createDocumentRequest(request: $request) {
        message
        statusCode
        success
        data {
          documentRequestId
        }
      }
    }
  }
`;
