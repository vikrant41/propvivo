import { gql } from "@apollo/client";

export const CONTACT_US_REQUEST = gql`
  mutation createContactUs($request: CreateContactUsRequestInput!) {
    contactUsMutations {
      createContactUs(request: $request) {
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
