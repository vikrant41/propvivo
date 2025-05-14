import { gql } from "@apollo/client";

export const CREATE_CONDO_REQUEST = gql`
  mutation createDocumentRequest($request: CreateDocumentRequestRequestInput!) {
    documentRequestMasterMutation {
      createDocumentRequest(request: $request) {
        message
        statusCode
        success
        data {
          documentRequestId
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
