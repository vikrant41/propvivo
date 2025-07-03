import { gql } from "@apollo/client";

export const CONTACT_US_REQUEST = gql`
  mutation createContractUs($request: CreateContactUsRequestInput!) {
    contactUsMutations {
      createContractUs(request: $request) {
        message
        statusCode
        success
        data {
          contactUsId
        }
      }
    }
  }
`;
