import { configureStore } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";


/**
 * Log a warning and show a toast!
 */

export const logout = () => {
  const routeTo =
    process.env.NEXT_PUBLIC_APP_LOGIN || "http://login.devpropvivo.co/login";
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL || ".devpropvivo.co";
  Cookies.remove("authToken");
  Cookies.remove("subscriptionId");
  Cookies.remove("roleId");
  localStorage.removeItem("sidebarData");

  const cookieOptions = {
    path: "/",
    domain,
  };

  setCookie("subscriptionId", "", { ...cookieOptions, expires: new Date(0) });
  setCookie("roleName", "", { ...cookieOptions, expires: new Date(0) });
  setCookie("roleId", "", { ...cookieOptions, expires: new Date(0) });
  setCookie("redirectionLink", "", {
    ...cookieOptions,
    expires: new Date(0),
  });
  setCookie("authToken", "", { ...cookieOptions, expires: new Date(0) });
  setCookie("legalEntityId", "", { ...cookieOptions, expires: new Date(0) });
  setCookie("userId", "", { ...cookieOptions, expires: new Date(0) });
  setCookie("userProfileId", "", { ...cookieOptions, expires: new Date(0) });
  setCookie("navigations", "", { ...cookieOptions, expires: new Date(0) });
  const cookies = document.cookie.split(";");

  // Loop through the cookies and remove them
  cookies.forEach((cookie) => {
    // Get the cookie name
    const cookieName = cookie.split("=")[0].trim();
    // Remove the cookie
    removeCookie(cookieName);
    removeCookie(cookieName, { path: "/", domain: domain });
  });
  localStorage.removeItem("sidebarData");
  localStorage.removeItem("loginData");
  localStorage.removeItem("navigations");
  localStorage.removeItem("globalAssociationId");
  localStorage.clear();
  // Set a flag in localStorage to indicate logout
  localStorage.setItem("logout", String(Date.now()));
  window.location.replace(routeTo);
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const routeTo = process.env.NEXT_PUBLIC_APP_LOGIN || "http://login.devpropvivo.co/login";
    const domain = process.env.NEXT_PUBLIC_DOMAIN_URL || ".devpropvivo.co";
    if (isRejectedWithValue(action) && action.payload) {
      console.log("We got a rejected action!", action.payload.status);
    //   if (action.payload.status === 401) {
    //     logout();
    //   }
    }
    return next(action);
  };

import { Cookies, removeCookie, setCookie } from "typescript-cookie";
import { apiSlice, newApislice } from "../slices/apiSlice";
import { filterDataSlice } from "../slices/FilterSlice/filterSlice";
import { filterTab } from "../slices/filterTab";


// const persistConfig = {
//   key: "root",
//   Storage,
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   AnnouncementReducer.reducer
// );

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
//   [breadbrumbSlice.name]: breadbrumbSlice.reducer,
//   [selectedPagePagination.name]: selectedPagePagination.reducer,
  [filterDataSlice.name]: filterDataSlice.reducer,
  [filterTab.name]: filterTab.reducer,
  [newApislice.reducerPath]: newApislice.reducer,
//   [associationSlice.name]: associationSlice.reducer,
//   [eventDataSlice.name]: eventDataSlice.reducer,
//   [AnnouncementReducer.name]: persistedReducer,
//   [LoadMorePagination.name]: LoadMorePagination.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware, rtkQueryErrorLogger)
      .concat(newApislice.middleware, rtkQueryErrorLogger),
  devTools: true,
});

// export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
