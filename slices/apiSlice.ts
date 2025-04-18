
import { getCookie } from "typescript-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";

let token: any = "";

// Function to generate the body payload
export const generateBodyPayload = (
  requestSubType,
  requestType,
  requestParam
) => {
  const sessionId = getCookie("userId");
  const userId = getCookie("userId");
  const trackingId = uuidv4();
  // const uri = window.location.href;
  const uri = `${window.location.origin}${
    window["__NEXT_DATA__"].page.split("[")[0]
  }`;

  return {
    executionContext: {
      sessionId,
      trackingId,
      uri,
      userId,
    },
    requestSubType,
    requestType,
    requestParam,
  };
};

// Function to generate the query parameters
export const generateQueryParams = (RequestSubType, RequestType, params) => {
  const sessionId = getCookie("userId");
  const userId = getCookie("userId");
  const trackingId = uuidv4();
  // const uri = window.location.href;
  const uri = `${window.location.origin}${
    window["__NEXT_DATA__"].page.split("[")[0]
  }`;

  const queryParams = {
    ...params,
    RequestType,
    RequestSubType,
    "ExecutionContext.SessionId": sessionId,
    "ExecutionContext.TrackingId": trackingId,
    "ExecutionContext.Uri": uri,
    "ExecutionContext.UserId": userId,
  };

  return queryParams;
};

export const generateQueryParamsOptional = (
  RequestSubType,
  RequestType,
  params
) => {
  const sessionId = getCookie("userId");
  const userId = getCookie("userId");
  const trackingId = uuidv4();
  // const uri = window.location.href;
  const uri = `${window.location.origin}${
    window["__NEXT_DATA__"].page.split("[")[0]
  }`;

  const queryParams = {
    ...params,
    "RequestParam.RequestType": RequestType,
    RequestSubType,
    "ExecutionContext.SessionId": sessionId,
    "ExecutionContext.TrackingId": trackingId,
    "ExecutionContext.Uri": uri,
    "ExecutionContext.UserId": userId,
  };

  return queryParams;
};

if (typeof window !== "undefined") {
  const params = new URLSearchParams(location.search);
  token = params.get("token");
  token = token || getCookie("authToken");
} else {
  console.log("we are running on the server '_app'");
}
export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders(headers) {
      let token = null;
      if (typeof window !== "undefined") {
        token = getCookie("authToken");
      }
      // headers.set("authorization", `Bearer ${token && token}`);
      return headers;
    },
  }),
  tagTypes: [
    "ServiceRequest",
    "Media",
    "CaseNotes",
    "LegalEntityBasedOnFilter",
    "Common",
    "UploadFileNew",
  ],
  endpoints: (builder) => ({}),
});

export const apiSliceTwo = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URLversion,
    // headers: {
    //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik5hbmN5IFNwYXJrcyIsInJvbGUiOiJNZW1iZXIiLCJpZCI6ImJlZDU2ZjgwLTU2ZjEtNGM1ZC04YjUwLWRhNDkzYTEwNzUwMiIsImdpdmVuX25hbWUiOiJOYW5jeSIsImZhbWlseV9uYW1lIjoiU3BhcmtzIiwiZW1haWwiOiJEYXJzaEBwcm9wdml2by5jb20iLCJMZWdhbEVudGl0eUlkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RMaXN0SXRlcmF0b3JgMltQcm9wVml2b19Db3JlLk1vZGVscy5GZWF0dXJlLlVzZXJMZWdhbEVudGl0eSxTeXN0ZW0uU3RyaW5nXSIsIkxlZ2FsRW50aXR5VW5pdElkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RFbnVtZXJhYmxlSXRlcmF0b3JgMltQcm9wVml2b19Db3JlLk1vZGVscy5GZWF0dXJlLlVzZXJMZWdhbEVudGl0eVVuaXQsU3lzdGVtLlN0cmluZ10iLCJQcm9wZXJ0eUlkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RFbnVtZXJhYmxlSXRlcmF0b3JgMltQcm9wVml2b19Db3JlLk1vZGVscy5GZWF0dXJlLlVzZXJMZWdhbEVudGl0eVVuaXQsU3lzdGVtLlN0cmluZ10iLCJuYmYiOjE2ODk3NDY3NDAsImV4cCI6MTY5MjMzODc0MCwiaWF0IjoxNjg5NzQ2NzQwfQ.cnZlV7JbiMSYdE6Y6ceQCdJ5kmM8nAiWbrSm5CCTCS0`,
    // },
    // prepareHeaders(headers) {
    //   headers.set("authorization", token == null ? "" : `Bearer ${token}`);
    //   // headers.set("Content-Type", "application/json");
    //   return headers;
    // },
    prepareHeaders(headers) {
      let token = null;
      if (typeof window !== "undefined") {
        token = getCookie("authToken");
      }
      headers.set("authorization", `Bearer ${token && token}`);
      return headers;
    },
  }),
  tagTypes: ["Newrole", "featuretwo", "Media", "FeatureRolePermission"],
  endpoints: (builder) => ({}),
});

export const Notification = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://propvivo-x nonprod-notification-api.azurewebsites.net/api/v1",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik5hbmN5IFNwYXJrcyIsInJvbGUiOiJNZW1iZXIiLCJpZCI6ImJlZDU2ZjgwLTU2ZjEtNGM1ZC04YjUwLWRhNDkzYTEwNzUwMiIsImdpdmVuX25hbWUiOiJOYW5jeSIsImZhbWlseV9uYW1lIjoiU3BhcmtzIiwiZW1haWwiOiJEYXJzaEBwcm9wdml2by5jb20iLCJMZWdhbEVudGl0eUlkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RMaXN0SXRlcmF0b3JgMltQcm9wVml2b19Db3JlLk1vZGVscy5GZWF0dXJlLlVzZXJMZWdhbEVudGl0eSxTeXN0ZW0uU3RyaW5nXSIsIkxlZ2FsRW50aXR5VW5pdElkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RFbnVtZXJhYmxlSXRlcmF0b3JgMltQcm9wVml2b19Db3JlLk1vZGVscy5GZWF0dXJlLlVzZXJMZWdhbEVudGl0eVVuaXQsU3lzdGVtLlN0cmluZ10iLCJQcm9wZXJ0eUlkIjoiU3lzdGVtLkxpbnEuRW51bWVyYWJsZStTZWxlY3RFbnVtZXJhYmxlSXRlcmF0b3JgMltQcm9wVml2b19Db3JlLk1vZGVscy5GZWF0dXJlLlVzZXJMZWdhbEVudGl0eVVuaXQsU3lzdGVtLlN0cmluZ10iLCJuYmYiOjE2ODk3NDY3NDAsImV4cCI6MTY5MjMzODc0MCwiaWF0IjoxNjg5NzQ2NzQwfQ.cnZlV7JbiMSYdE6Y6ceQCdJ5kmM8nAiWbrSm5CCTCS0`,
    },
  }),
  tagTypes: ["sendNotification"],
  endpoints: (builder) => ({}),
});

// export const newApiSlice = createApi({
//   reducerPath: "newApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//     prepareHeaders(headers) {
//       let token = null;
//       if (typeof window !== "undefined") {
//         token = getCookie("authToken");
//       }
//       headers.set("authorization", `Bearer ${token && token}`);
//       return headers;
//     },
//   }),
//   tagTypes: [
//     "FiscalYear",
//     "FiscalYearDetail",
//     "COA",
//     "COADetail",
//     "Currency",
//     "Media",
//     "commonAccounting",
//     "Common",
//     "Department",
//     "LegalEntityType",
//     "LegalEntityTypeDetail",
//     "LegalEntity",
//     "Subscription",
//     "SubscriptionConfiguration",
//     "EnumConfiguration",
//     "ProspectiveClient",
//     "Contracts",
//     "Industry",
//     "ProspectiveType",
//     "BulkUploadProspectiveClient",
//     "zipcode",
//     "city",
//     "state",
//     "country",
//     "AddMedia",
//     "MediaBulkUpload",
//     "SocialEvents",
//   ],
//   endpoints: (builder) => ({}),
// });

const baseQueryWithErrorHandler = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders(headers) {
      let token = null;
      if (typeof window !== "undefined") {
        token = getCookie("authToken");
      }
      // headers.set("authorization", `Bearer ${token && token}`);
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (!navigator.onLine) {
      return location.reload() as any;
    }
    console.error(`Error: ${result.error.status}`);
  }
  return result;
};

export const newApislice = createApi({
  reducerPath: "newApi",
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: [
    "ARC",
    "ServiceRequest",
    "BoardTask",
    "Media",
    "CaseNotes",
    "vendorService",
    "vendorRequest",
    "LegalEntity",
    "APVendor",
    "APVendordelete",
    "Country",
    "State",
    "City",
    "ZipCode",
    "AddMedia",
    "MediaBulkUpload",
    "SocialPoll",
    "Announcement",
    "EnumConfiguration",
    "Media",
    "DeleteMedia",
    "SocialEvents",
    "Committee",
    "CommitteeType",
    "UserProfile",
    "nonallboardmembers",
    "BoardMember",
    "Election",
    "MemberDirectory",
    "Meetings",
    "ElectionId",
    "ElectionAttendees",
    "SocialPollComment",
    "CaseTopic",
    "User",
    "CaseCategory",
    "CaseStatus",
    "LegalEntityAddressMapping",
    "MyProfile",
    "country",
    "state",
    "city",
    "zipcode",
    "DocumentLibrary",
    "Template",
    "feedbackMaster",
    "attendees",
    "TemplateMaster",
    "SocialEventsCategory",
    "SocialEventsFeedback",
    "MeetingsRsvp",
    "SocialEventsComment",
    "Feedback",
    "FeedbackList",
    "EnumConfiguration",
    "MarketPlace",
    "Violation",
    "violationById",
    "AssociationByUser",
    "CCNRType",
    "UserData",
    "UserRoleData",
    "FeedbackResponse",
    "UnitOccupantDocuments",
    "UnitDocument",
    "Feature",
    "unitDocumnetDownload",
    "OneTimePayment",
    "CardValidate",

  ],
  endpoints: (builder) => ({}),
});
