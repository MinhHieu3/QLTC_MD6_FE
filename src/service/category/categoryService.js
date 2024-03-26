import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryDetails = createAsyncThunk(
    'categories/getCategoryDetails',
    async () => {
        const res = await axios.get(`http://localhost:8080/api/categories`);
        return res.data;
    }
);



export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id) => {
        await axios.delete(`http://localhost:8080/api/categories/${id}`);
        return id;
    }
);

export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async ({ id, data }) => {
        const res = await axios.put(`http://localhost:8080/api/categories/${id}`, data);
        return res.data;
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (values) => {
        const res = await axios.post('http://localhost:8080/api/categories', values);
        return res.data;
    }
);

export const findCategoryById = createAsyncThunk(
    'categories/findCategoryById',
    async (id) => {
        const res = await axios.get(`http://localhost:8080/api/categories/${id}`);
        return res.data;
    }
);

export const searchCategory = createAsyncThunk(
    'categories/searchCategory',
    async (data) => {
        return data;
    }
);

export const getCategoryIndex = createAsyncThunk(
    'categories/getCategoryIndex',
    async (index) => {
        return index;
    }
);
