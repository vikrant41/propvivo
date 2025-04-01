
import { requestSubType, requestType } from "../../components/Helper/Helper";
import {
  generateBodyPayload,
  generateQueryParams,
  newApislice,
} from "../apiSlice"; 
import { get } from "http";

export const MarketPlaceSlice = newApislice.injectEndpoints({
  endpoints: (builder) => ({
    addMarketplace: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace`,
        method: "POST",
        body: generateBodyPayload(
          requestSubType.Add,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    updateAdd: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace`,
        method: "PUT",
        body: generateBodyPayload(
          requestSubType.Update,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    getMarketplace: builder.query<any, any>({
      query: (data) => ({
        url: `/MarketPlace`,
        method: "GET",
        params: generateQueryParams(
          requestSubType.List,
          requestType.MarketPlace,
          data
        ),
      }),
      providesTags: ["MarketPlace"],
    }),
    soldAd: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace/Sold`,
        method: "POST",
        body: generateBodyPayload(
          requestSubType.Add,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    deleteAd: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace`,
        method: "DELETE",
        params: generateQueryParams(
          requestSubType.Delete,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    addInquiry: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace/Enquiry`,
        method: "POST",
        body: generateBodyPayload(
          requestSubType.Add,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    getAllInquiry: builder.query<any, any>({
      query: (data) => ({
        url: `/MarketPlace/Enquiry`,
        method: "GET",
        params: generateQueryParams(
          requestSubType.List,
          requestType.MarketPlace,
          data
        ),
      }),
      providesTags: ["MarketPlace"],
    }),
    verifyOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace/VerifyOtp`,
        method: "POST",
        body: generateBodyPayload(
          requestSubType.Add,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    resendOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace/ResendOtp`,
        method: "POST",
        body: generateBodyPayload(
          requestSubType.Add,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    unAutorizeEnquiry: builder.mutation<any, any>({
      query: (data) => ({
        url: `/MarketPlace/NotLoggedInEnquiry`,
        method: "POST",
        body: generateBodyPayload(
          requestSubType.Add,
          requestType.MarketPlace,
          data
        ),
      }),
      invalidatesTags: ["MarketPlace"],
    }),
  }),
});

export const {
  useAddMarketplaceMutation,
  useUpdateAddMutation,
  useGetMarketplaceQuery,
  useSoldAdMutation,
  useDeleteAdMutation,
  useAddInquiryMutation,
  useGetAllInquiryQuery,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useUnAutorizeEnquiryMutation,
} = MarketPlaceSlice;
