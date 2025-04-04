import { gql } from "@apollo/client";

export const CREATE_CONDO_REQUEST = gql`
  mutation CreateCondoQuestion($request: CreateCondoQuestionRequestInput!) {
    condoQuestionMutation {
      createCondoQuestion(request: $request) {
        message
        statusCode
        success
        data {
          condoQuestionId
        }
      }
    }
  }
`;
