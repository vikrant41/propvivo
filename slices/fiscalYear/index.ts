import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFiscalyear, IFiscalYearDetail } from "../../models/IFiscalyear";

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../apiSlice";
import { FiscalYearParam } from "./type";

const adapter = createEntityAdapter<IFiscalyear>({
  sortComparer: (a, b) => b.updatedDate.localeCompare(a.updatedDate),
});

const initialState = adapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetchFiscalYear: builder.query<IFiscalyear[],number|void>({
    //     query(limit = 10) {
    //         return `/fiscalYear?limit=${limit}`
    //     },
    fetchFiscalYear: builder.query<
      { apiResponse: IFiscalyear[]; totalCount: number },
      FiscalYearParam
    >({
      query: (args) => {
        const { _limit, _page, sortBy, filterBy } = args;
        return {
          url: `/fiscalYear`,
          method: "GET",
          params: { _limit, _page, sortBy, filterBy },
        };
      },
      // responseHandler: (response) => {
      //     response.text()
      // },
      // validateStatus: (response, result) => {
      //     response.status === 200 && !result.isError
      // },
      transformResponse: (apiResponse: IFiscalyear[], meta, args) => {
        return {
          apiResponse,
          totalCount: Number(meta.response.headers.get("X-Total-Count")),
        };
      },
      // transformResponse: (responseData:IFiscalyear[]) => {
      //     let min = 1;
      //     const loadedPosts = responseData.map(post => {
      //         if (!post?.reactions) post.reactions = {
      //             thumbsUp: 0,
      //             wow: 0,
      //             heart: 0,
      //             rocket: 0,
      //             coffee: 0
      //         }
      //         return post;
      //     });
      //     return adapter.setAll(initialState, loadedPosts)
      // },

      // providesTags: (result, error, arg) => [
      //     'FiscalYear',
      //     ...result.map(({id}) => ({ type: 'FiscalYear', id }))
      // ],

      providesTags: (result) =>
        result
          ? [
              ...result.apiResponse.map(({ id }) => ({
                type: "FiscalYear" as const,
                id,
              })),
              { type: "FiscalYear", id: "LIST" },
            ]
          : [{ type: "FiscalYear", id: "LIST" }],
    }),
    addNewFiscalYear: builder.mutation({
      query: (data) => ({
        url: "/fiscalYear",
        method: "POST",
        body: {
          ...data,
          userId: Number(data.userId),
          updatedDate: new Date().toISOString(),
          createdDate: new Date().toISOString(),
          // reactions: {
          //     thumbsUp: 0,
          //     wow: 0,
          //     heart: 0,
          //     rocket: 0,
          //     coffee: 0
          // }
        },
      }),
      invalidatesTags: ["FiscalYear"],
    }),
    updateFiscalYear: builder.mutation({
      query: (data) => ({
        url: `/fiscalYear/${data.id}`,
        method: "PUT",
        body: {
          ...data,
          updatedDate: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "FiscalYear", id }],
    }),
    deleteFiscalYear: builder.mutation({
      query: (id) => ({
        url: `/fiscalYear/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["FiscalYear"],
    }),
    fetchFiscalYearDetail: builder.query<
      { apiResponse: IFiscalYearDetail; totalCount: number },
      FiscalYearParam
    >({
      query: (args) => {
        const { _limit, _page, sortBy, filterBy } = args;
        return {
          url: `/fy-2022`,
          method: "GET",
          params: { _limit, _page, sortBy, filterBy },
        };
      },
      // responseHandler: (response) => {
      //     response.text()
      // },
      // validateStatus: (response, result) => {
      //     response.status === 200 && !result.isError
      // },
      transformResponse: (apiResponse: IFiscalYearDetail, meta, args) => {
        return {
          apiResponse,
          totalCount: Number(meta.response.headers.get("X-Total-Count")),
        };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.apiResponse.mappedAssociations.map(({ id }) => ({
                type: "FiscalYearDetail" as const,
                id,
              })),
              { type: "FiscalYearDetail", id: "LIST" },
            ]
          : [{ type: "FiscalYearDetail", id: "LIST" }],
    }),
  }),
});
// export const fiscalYearSlice = createApi({
//     reducerPath: "fiscalYear",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://0.0.0.0:3500/",
//         prepareHeaders(headers){
//             headers.set('authorization', "Bearer token" )
//             return headers
//         }
//     }),
//     endpoints(builder) {

//         return {
//             fetchFiscalYear: builder.query<IFiscalyear[],number|void>({
//                 query(limit = 10) {
//                     return `/fiscalYear?limit=${limit}`
//                 }
//             })
//         }
//     },

// })

export const {
  useFetchFiscalYearQuery,
  useFetchFiscalYearDetailQuery,
  useAddNewFiscalYearMutation,
  useDeleteFiscalYearMutation,
  useUpdateFiscalYearMutation,
} = extendedApiSlice;
