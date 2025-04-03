import { gql } from "@apollo/client";

export const GET_ALL_MASTER = gql`
  query getAddressMst($request: GetAddressMstRequestInput!) {
    addressMstQueries {
      getAddressMst(request: $request) {
        message
        statusCode
        success
        data {
          getAddressMstItems {
            addressId
            addressLine1
            addressLine2
            city
            cityId
            country
            countryId
            createdBy
            createdById
            createdOn
            isActive
            modifiedBy
            modifiedById
            state
            stateId
            zipCode
            zipCodeId
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
