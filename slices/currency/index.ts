import {fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ICurrency } from "../../models/ICurrency"

import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "../apiSlice";


interface Param {
    index?: number;
    limit?: number;
    status?: string;
    reportingFrequency?:string;
}

export const currencySlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        fetchCurrency: builder.query<ICurrency[],Param|void>({
            query(params:Param = {limit:10}) {
                return {
                    url:"/currency",
                    params: {...params}
                }
            },
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Currency' as const, id })),
                  { type: 'Currency', id: 'LIST' },
                ]
              : [{ type: 'Currency', id: 'LIST' }],

        }),
        addNewCurrency: builder.mutation({
            query: data => ({
                url: '/currency',
                method: 'POST',
                body: {
                    ...data,
                    userId: Number(data.userId),
                    updatedDate: new Date().toISOString(),
                    createdDate: new Date().toISOString()
                    // reactions: {
                    //     thumbsUp: 0,
                    //     wow: 0,
                    //     heart: 0,
                    //     rocket: 0,
                    //     coffee: 0
                    // }
                }
            }),
            invalidatesTags: ["Currency"]
        }),
        updateCurrency: builder.mutation({
            query: data => ({
                url: `/currency/${data.id}`,
                method: 'PUT',
                body: {
                    ...data,
                    updatedDate: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'FiscalYear', id }],
        }),
        deleteCurrency: builder.mutation({
            query: ({ id }) => ({
                url: `/currency/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags:['Currency']
        }),
    }),
})
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

export const  { useFetchCurrencyQuery, useAddNewCurrencyMutation, useUpdateCurrencyMutation, useDeleteCurrencyMutation} = currencySlice
