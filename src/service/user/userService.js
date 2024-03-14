import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (data) => {
        const res = await axios.post(`http://localhost:8080/login`,data)
        return res
    }
)