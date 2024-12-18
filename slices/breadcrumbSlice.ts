import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../stores";
//import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface BreadcrumbState {
  name: string;
  show: boolean;
}

// BREADCRUMB_BUTTON_TEXT, SHOW_BREADCRUMB_MODAL

// export const updateBreadcrumbAction = (value) => ({
// 	type: BREADCRUMB_BUTTON_TEXT,
// 	payload: value,
// });

// export const showBreadcrumbModel = (value) => ({
// 	type: SHOW_BREADCRUMB_MODAL,
// 	payload: value,
// });

// Initial state

const initialState: BreadcrumbState  = {
    name: "",
    show: false,
};

// Actual Slice
export const breadbrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    // Action to set the authentication status
    setBreadcrumbActionName: (state, action) => {
        state.name = action.payload
    },
    setBreadcrumbActionShow: (state, action) =>{
        state.show = action.payload
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper

  },
});

export const { setBreadcrumbActionName, setBreadcrumbActionShow } = breadbrumbSlice.actions

export const selectBreadcrumbName = (state: RootState) => state.breadcrumb.name;
export const selectBreadcrumbShow = (state: RootState) => state.breadcrumb.show;

export default breadbrumbSlice.reducer;