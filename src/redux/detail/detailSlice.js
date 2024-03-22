import {createSlice} from "@reduxjs/toolkit";
import {
    addDetail,
    deleteDetail, editDetail,
    findByIdDetail,
    getDetails,
    getIndexDetail,
    searchDetail
} from "../../service/detail/detailService";

const initialState = {
    details: [],
    findByIdDetail: null,
    search: '',
    index: 0,
};

const detailSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getDetails.fulfilled, (state, action) => {
                state.details = action.payload;
            })
            .addCase(deleteDetail.fulfilled, (state, action) => {
                state.details = state.details.filter(detail => detail.id !== action.payload);
            })
            .addCase(addDetail.fulfilled, (state, action) => {
                state.details.push(action.payload);
            })
            .addCase(searchDetail.fulfilled, (state, action) => {
                state.search = action.payload;
            })
            .addCase(getIndexDetail.fulfilled, (state, action) => {
                state.index = action.payload;
            })
            .addCase(findByIdDetail.fulfilled, (state, action) => {
                state.findByIdDetail = action.payload;
            })
            .addCase(editDetail.fulfilled, (state, action) => {
                const updatedDetailIndex = state.details.findIndex(detail => detail.id === action.payload.id);
                if (updatedDetailIndex !== -1) {
                    state.details[updatedDetailIndex] = action.payload;
                }
            });
    }
});

export default detailSlice.reducer;
