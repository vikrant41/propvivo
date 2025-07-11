import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  query getAllBlog($request: GetAllBlogRequestInput!) {
    blogQueries {
      getAllBlog(request: $request) {
        message
        statusCode
        success
        data {
          blogs {
            blogCategory
            blogId
            description
            displayBlogCategory
            keywords
            metaDescription
            seoUrl
            status
            title
            userContext {
              createdByUserId
              createdByUserName
              createdOn
              modifiedByUserId
              modifiedByUserName
              modifiedOn
              profilePicture
            }
            document {
              containerName
              contentType
              fileExtension
              fileName
              filePath
              fileSize
              folderName
              mediaId
              mediaType
              status
              subFolderName
              thumbnailPath
              thumbnailUri
              uri
            }
          }
          categories {
            blogCategory
            blogCount
            displayBlogCategory
          }
          keywords {
            blogCount
            keyword
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
