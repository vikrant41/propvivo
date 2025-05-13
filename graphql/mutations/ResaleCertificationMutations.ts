import { gql } from "@apollo/client";

export const CREATE_RESALE_CERTIFICATION_REQUEST = gql`
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

export const GET_PROPERTY_ID_BY_ADDRESS_ID = gql`
  mutation addressOrActivationCode(
    $request: GetUserProfileByAddressOrActivationCodeRequestInput!
  ) {
    userMutations {
      addressOrActivationCode(request: $request) {
        data {
          userProfile {
            userLegalEntities {
              code
              domain
              legalEntityId
              name
              website
              userLegalEntityUnits {
                propertyId
                propertyAddress {
                  addressId
                }
              }
            }
          }
        }
        statusCode
        message
        success
      }
    }
  }
`;
