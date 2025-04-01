import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../stores";


const initialState = {
    filterData: {
        id:"",
        name:"All"
    },
    optinalFilterData:{
        id:"",
        name:"All"
    }
};

export const filterTab = createSlice({
    name: "filterTabs",
    initialState,
    reducers: {
        setFilterTabs: (state, action) => {
            state.filterData = action.payload
        },
        setOptinalFilterTabs: (state, action) => {
            state.optinalFilterData = action.payload
        },
    },
});

export const { setFilterTabs, setOptinalFilterTabs } = filterTab.actions
export const filterTabValue = (state: RootState) => state.filterTabs?.filterData;
export const optinalFilterTabValue = (state: RootState) => state.filterTabs?.optinalFilterData;
export default filterTab.reducer;