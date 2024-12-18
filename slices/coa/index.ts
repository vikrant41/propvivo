import { createEntityAdapter } from "@reduxjs/toolkit";
import { ICOA, COADetail } from "../../models/ICOA";
import { apiSlice } from "../apiSlice";
import { COAParam } from "./type";

const adapter = createEntityAdapter<ICOA>({
  sortComparer: (a, b) => b.startDate.localeCompare(a.startDate),
});

const initialState = adapter.getInitialState();

export const coaSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCOA: builder.query<{ apiResponse: ICOA[]; totalCount: number },COAParam>({
      query: (args) => {
        const { _limit, _page, sortBy, filterBy } = args;
        return {
          url: "/coa",
          method: "GET",
          params: { _limit, _page, sortBy, filterBy },
        };
      },
      transformResponse: (apiResponse: ICOA[], meta, args) => {
        return {
          apiResponse,
          totalCount: Number(meta.response.headers.get("X-Total-Count")),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.apiResponse.map(({ id }) => ({
                type: "COA" as const,
                id,
              })),
              { type: "COA", id: "LIST" },
            ]
          : [{ type: "COA", id: "LIST" }],
    }),
    fetchCOADetail: builder.query<
      { apiResponse: COADetail; totalCount: number },
      COAParam
    >({
      query: (args) => {
        const { _limit, _page, sortBy, filterBy } = args;
        return {
          url: "/coa-us",
          method: "GET",
          params: { _limit, _page, sortBy, filterBy },
        };
      },
      transformResponse: (apiResponse: COADetail, meta, args) => {
        return {
          apiResponse,
          totalCount: Number(meta.response.headers.get("X-Total-Count")),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.apiResponse.items.map(({ id }) => ({
                type: "COADetail" as const,
                id,
              })),
              { type: "COADetail", id: "LIST" },
            ]
          : [{ type: "COADetail", id: "LIST" }],
    }),

    addNewCOA: builder.mutation({
      query: (data) => ({
        url: "/coa",
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
      invalidatesTags: ["COA"],
    }),
    updateCOA: builder.mutation({
      query: (data) => ({
        url: `/coa/${data.id}`,
        method: "PUT",
        body: {
          ...data,
          updatedDate: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "COA", id }],
    }),
    deleteCOA: builder.mutation({
      query: (id) => ({
        url: `/coa/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["COA"],
    }),
  }),
});

export const {
  useFetchCOAQuery,
  useFetchCOADetailQuery,
  useAddNewCOAMutation,
  useDeleteCOAMutation,
  useUpdateCOAMutation,
} = coaSlice;
