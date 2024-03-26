import { createSlice } from "@reduxjs/toolkit";
import {
    addCategory,
    deleteCategory,
    editCategory,
    findCategoryById,
    getCategoryDetails,
    getCategoryIndex,
    searchCategory
} from "../../service/category/categoryService";

const initialState = {
    categories: [],
    findCategoryById: null,
    search: '',
    index: 0,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryDetails.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category.id !== action.payload);
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(searchCategory.fulfilled, (state, action) => {
                state.search = action.payload;
            })
            .addCase(getCategoryIndex.fulfilled, (state, action) => {
                state.index = action.payload;
            })
            .addCase(findCategoryById.fulfilled, (state, action) => {
                state.findCategoryById = action.payload;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                const updatedCategoryIndex = state.categories.findIndex(category => category.id === action.payload.id);
                if (updatedCategoryIndex !== -1) {
                    state.categories[updatedCategoryIndex] = action.payload;
                }
            });
    },
});

export default categorySlice.reducer;
