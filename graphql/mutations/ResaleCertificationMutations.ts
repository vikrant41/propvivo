import { gql } from "@apollo/client";

export const CREATE_RESALE_CERTIFICATION_REQUEST = gql`
  mutation CreateResaleCertificate(
    $request: CreateResaleCertificateRequestInput!
  ) {
    resaleCertificateMutation {
      createResaleCertificate(request: $request) {
        message
        statusCode
        success
        data {
          resaleCertificateId
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
