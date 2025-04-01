import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

interface Filter {
    filterData?:any
    data: any;
}

const initialState: Filter = {
    data:{},
    filterData: undefined

};

export const filterDataSlice = createSlice({
    name: "filterData",
    initialState: initialState,
    reducers: {
        setFilterData: (state, action: PayloadAction<Filter>) => {
            state.data = action.payload.data;
        },
    },
});

export const getFilterData = (state: RootState) => state.filterData;

export const { setFilterData } = filterDataSlice.actions;

export default filterDataSlice.reducer;
