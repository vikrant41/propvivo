import { gql } from "@apollo/client";

export const BULK_UPLOAD_REQUESTS = gql`
  mutation bulkUploadRequests($request: BulkUploadMediaV1RequestInput!) {
    mediaMutations {
      bulkUpload(request: $request) {
        data {
          medias {
            containerName
            subFolderName
            thumbnailPath
            thumbnailUri
            uri
            userContext {
              profilePicture
              createdByUserId
              createdByUserName
              createdOn
              modifiedByUserId
              modifiedByUserName
              modifiedOn
            }
            contentType
            fileExtension
            fileName
            filePath
            fileSize
            folderName
            mediaId
            mediaType
          }
        }
        message
        statusCode
        success
      }
    }
  }
`;

export const SINGLE_UPLOAD_REQUESTS = gql`
  mutation singleUploadRequests($request: UploadMediaV1RequestInput!) {
    mediaMutations {
      Upload(request: $request) {
        data {
          error
          media {
            containerName
            subFolderName
            thumbnailPath
            thumbnailUri
            uri
            userContext {
              profilePicture
              createdByUserId
              createdByUserName
              createdOn
              modifiedByUserId
              modifiedByUserName
              modifiedOn
            }
            contentType
            fileExtension
            fileName
            filePath
            fileSize
            folderName
            mediaId
            mediaType
          }
          status
        }
        message
        statusCode
        success
      }
    }
  }
`;
