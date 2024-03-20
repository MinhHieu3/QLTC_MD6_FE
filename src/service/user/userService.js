import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`http://localhost:8080/login`, data);
            return res;
        } catch (error) {
            localStorage.setItem('loginError', JSON.stringify(error));
            return rejectWithValue(error.message);
        }
    }
)
export const findById = createAsyncThunk(
    'users/findById',
    async (id, { rejectWithValue }) => {
            const res = await axios.get(`http://localhost:8080/users`+id);
            return res;
    }
)
export const createUsers = createAsyncThunk(
    'users/createUsers',
    async (values, { rejectWithValue }) => {
        try {
            const res = await axios.post(`http://localhost:8080/register`, values);
            return res.data;
        } catch (error) {
            if (error.response && error.response.data === 'Username already exists') {
                localStorage.setItem('registerError', 'Username already exists');
                return rejectWithValue('Username already exists');
            } else {
                localStorage.setItem('registerError', JSON.stringify(error));
                return rejectWithValue(error.message);
            }
        }
    }
);
