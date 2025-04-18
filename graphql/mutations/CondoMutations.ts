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
          paymentReceipt {
            containerName
            contentType
            fileExtension
            fileName
            filePath
            fileSize
            folderName
            mediaId
            mediaType
            subFolderName
            thumbnailPath
            thumbnailUri
            uri
            documents {
              containerName
              contentType
              fileExtension
              fileName
              filePath
              fileSize
              folderName
              mediaId
              mediaType
              subFolderName
              thumbnailPath
              thumbnailUri
              uri
            }
            userContext {
              createdByUserId
              createdByUserName
              createdOn
              modifiedByUserId
              modifiedByUserName
              modifiedOn
              profilePicture
            }
          }
        }
      }
    }
  }
`;
