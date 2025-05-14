import { gql } from "@apollo/client";

export const MARKET_PLACE_QUERY = gql`
  query getAllMarketPlaceAds($request: GetAllMarketPlaceAdsRequestInput!) {
    marketPlaceQuery {
      getAllMarketPlaceAds(request: $request) {
        message
        statusCode
        success
        meta {
          totalCount
        }
        data {
          marketPlaceAds {
            category
            categoryId
            cityId
            cityName
            countryId
            countryName
            legalEntityId
            description
            enquiries {
              email
              enquiryId
              enquiryStatus
              message
              name
              offerPrice
              phoneNo {
              countryId
              countryName
              number
              phoneCode
              }
              userContext {
                createdByUserId
                createdByUserName
                createdOn
                modifiedByUserId
                modifiedByUserName
                modifiedOn
              }
            }
            legalEntityCode
            legalEntityName
            marketPlaceAdId
            price
            productStatus
            soldDate
            soldPrice
            stateId
            stateName
            title
            userId
            userName
            zipCode
            zipId
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
              userContext {
                createdByUserId
                createdByUserName
                createdOn
                modifiedByUserId
                modifiedByUserName
                modifiedOn
              }
            }
            userContext {
              createdByUserId
              createdByUserName
              createdOn
              modifiedByUserId
              modifiedByUserName
              modifiedOn
            }
          }
        }
      }
    }
  }
`;
// export const MARKET_PLACE_INQUIRY_QUERY = gql`
//   query GetAllMarketPlacesInquiry($request: GetAllEnquiryRequestsInput!) {
//     marketPlaceQuery {
//       Enquiry(request: $request) {
//         message
//         statusCode
//         success
//         meta {
//           totalCount
//         }
//         data {
//           enquiries {
//             email
//             enquiryStatus
//             id
//             message
//             name
//             offerPrice
//             otp{
//             createdTime
//             otp
//             }
//             phoneNo {
//               countryId
//               countryName
//               number
//               phoneCode
//             }
//             title
//             userContext {
//               createdByUserId
//               createdByUserName
//               createdOn
//               modifiedByUserId
//               modifiedByUserName
//               modifiedOn
//             }
//           }
//         }
//       }
//     }
//   }
// `;