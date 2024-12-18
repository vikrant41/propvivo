import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

// import { IAssociation } from "../../models/IAssociation";


import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "../apiSlice";

// const adapter = createEntityAdapter<IFiscalyear> ({
//     sortComparer: (a, b) => b.updatedDate.localeCompare(a.updatedDate)
// })

// const initialState = adapter.getInitialState()


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        fetchAssociation: builder.query<any,number|void>({
            query(limit = 10) {
                return `/association?limit=${limit}`
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
                  ...result.map(({ associationId }) => ({ type: 'Association' as const, associationId })),
                  { type: 'Association', associationId: 'LIST' },
                ]
              : [{ type: 'Association', associationId: 'LIST' }],
            
        }),
        // addNewFiscalYear: builder.mutation({
        //     query: data=> ({
        //         url: '/fiscalYear',
        //         method: 'POST',
        //         body: {
        //             ...data,
        //             userId: Number(data.userId),
        //             updatedDate: new Date().toISOString(),
        //             createdDate: new Date().toISOString()
        //             // reactions: {
        //             //     thumbsUp: 0,
        //             //     wow: 0,
        //             //     heart: 0,
        //             //     rocket: 0,
        //             //     coffee: 0
        //             // }
        //         }
        //     }),
        //     invalidatesTags: ["FiscalYear"]
        // }),
        // updateFiscalYear: builder.mutation({
        //     query: data => ({
        //         url: `/fiscalYear/${data.id}`,
        //         method: 'PUT',
        //         body: {
        //             ...data,
        //             updatedDate: new Date().toISOString()
        //         }
        //     }),
        //     invalidatesTags: (result, error, { id }) => [{ type: 'FiscalYear', id }],
        // }),
        // deleteFiscalYear: builder.mutation({
        //     query: (id) => ({
        //         url: `/fiscalYear/${id}`,
        //         method: 'DELETE',
        //         body: { id }
        //     }),
            // invalidatesTags:['FiscalYear']
        // }),
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

export const  { useFetchAssociationQuery} = extendedApiSlice