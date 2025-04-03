import { gql } from "@apollo/client";

export const GET_ALL_LEGALENTITY = gql`
  query GetAllLegalEntityQuery($request : GetAllLegalEntityRequestInput!) {
    legalEntityQueries {
      getAllLegalEntity(request: $request) {
        message
        statusCode
        success
        data {
          legalEntities {
            alternateEmail
            amount
            billingEndDate
            billingStartDate
            businessTypeId
            businessTypeName
            businessSubTypeId
            businessSubTypeName
            communityText
            companyCode
            contractEndDate
            contractStartDate
            domain
            displayLegalEntityType
            emailAddress
            externalDomain
            internalDomain
            isActive
            isDeleted
            isMapped
            legalEntityId
            legalEntityName
            legalEntityPropertyClassficationId
            legalEntityType
            legalEntityTypeTemplateName
            legalEntityTypeTemplateId
            meetingFrequency
            paymentFrequencyId
            paymentFrequencyName
            serviceEndDate
            serviceStartDate
            status
            subscriptionId
            subscriptionName
            taxId
            totalNumberOfMeetings
            website
            address {
              address1
              address2
              addressDistributionDisplayValue
              addressId
              city
              cityId
              country
              countryId
              county
              fullAddress
              legalEntityAddressDistributionId
              legalEntityAddressDistributionName
              propertyNumber
              propertyTypeId
              propertyTypeName
              propertyValueTypeId
              propertyValueTypeName
              state
              stateId
              zipCode
              zipCodeId
            }
            legalEntityAddressDistribution {
              addressDistributionDisplayValue
              legalEntityAddressDistributionId
              legalEntityAddressDistributionName
              propertyValueTypeId
              propertyValueTypeName
            }
            license {
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
            logo {
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
            platMap {
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
            propertyTypes {
              legalEntityPropertyClassificationId
              propertyTypeId
              propertyTypeName
            }
            taxDocument {
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
        meta {
          continuationToken
          hasNextPage
          hasPreviousPage
          pageNumber
          skip
          take
          totalCount
          totalPages
          urlEncodedContinuationToken
        }
      }
    }
  }
`;
