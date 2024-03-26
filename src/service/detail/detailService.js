import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetails = createAsyncThunk(
    'details/getDetails',
    async (id) => {
        const res = await axios.get('http://localhost:8080/api/details/'+id);
        return res.data;
    }
);


export const deleteDetail = createAsyncThunk(
    'details/deleteDetail',
    async (id) => {
        await axios.delete(`http://localhost:8080/details/${id}`);
        return id;
    }
);

export const editDetail = createAsyncThunk(
    'details/editDetail',
    async ({ id, data }) => {
        const res = await axios.put(`http://localhost:8080/details/${id}`, data);
        return res.data;
    }
);

export const addDetail = createAsyncThunk(
    'details/addDetail',
    async (values) => {
        const res = await axios.post('http://localhost:8080/details', values);
        return res.data;
    }
);

export const findByIdDetail = createAsyncThunk(
    'details/findByIdDetail',
    async (id) => {
        const res = await axios.get(`http://localhost:8080/details/${id}`);
        return res.data;
    }
);

export const searchDetail = createAsyncThunk(
    'details/searchDetail',
    async (data) => {
        return data;
    }
);

export const getIndexDetail = createAsyncThunk(
    'details/getIndex',
    async (index) => {
        return index;
    }
);