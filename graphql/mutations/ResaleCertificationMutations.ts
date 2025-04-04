import { gql } from "@apollo/client";

export const CREATE_RESALE_CERTIFICATION_REQUEST = gql`
  mutation CreateResaleCertificate($request : CreateResaleCertificateRequestInput!) {
    resaleCertificateMutation {
      createResaleCertificate(request: $request) {
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