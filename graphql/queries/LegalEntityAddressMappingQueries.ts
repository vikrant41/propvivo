import { gql } from "@apollo/client";

export const GET_ALL_LEGALENTITY_ADDRESS_MAPPING = gql`
  query GetAllLegalEntityAddressMappingQuery(
    $request:  GetAllLegalEntityPropertyAddressRequestInput!
  ) {
    legalEntityAddressMappingQueries {
      legalEntityAddressMapping(request: $request) {
        message
        statusCode
        success
        data {
          legalEntityPropertyAddresses {
            allocationInterest
            isExcludeFromAssessment
            legalEntityCode
            legalEntityId
            legalEntityName
            legalEntityPropertyAddressMappingId
            status
            propertyAddress {
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
