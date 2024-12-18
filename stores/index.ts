import {configureStore} from "@reduxjs/toolkit"


import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

import  authReducer from "./auth";
import {authApi} from "../slices/auth"

//import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */


export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn(`We got a rejected action! ${action.error.message}`)
    }
    return next(action)
}

//import counterReducer from "../slices/currency/userSlice"
// import { currencySlice } from "../slices/currency"
// import { fiscalYearSlice } from "../slices/fiscalYear"
// export const store = configureStore({
//     reducer:{
//         counter:counterReducer,
//         [currencySlice.reducerPath]: currencySlice.reducer,
//         [fiscalYearSlice.reducerPath]: fiscalYearSlice.reducer
//     },
//     middleware: (getDefaultMiddleware) => {
//         return getDefaultMiddleware().concat(currencySlice.middleware, fiscalYearSlice.middleware)
//     }
// })

import { apiSlice } from '../slices/apiSlice';
import { breadbrumbSlice } from "../slices/breadcrumbSlice"
import breadcrumbReducer from "../slices/breadcrumbSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        [breadbrumbSlice.name]: breadcrumbReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware,authApi.middleware,rtkQueryErrorLogger),
    devTools: true
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

