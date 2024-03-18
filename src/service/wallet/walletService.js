import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getWallets = createAsyncThunk(
    'wallets/getWallets',
    async ({id, token}) => {
        console.log(token)
        const res = await axios.get(`http://localhost:8080/users/wallets/`+ id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    }
)
export const deleteWallet = createAsyncThunk(
    'wallets/deleteWallet',
    async (id) => {
        const res = await axios.delete(`http://localhost:8080/users/wallets/` + id)
        return id
    }
)
export const editWallet = createAsyncThunk(
    'wallets/editWallet',
    async ({id, data}) => {
        const res = await axios.put('http://localhost:8080/users/wallets/' + id, data)
        return res
    }
)
export const addWallet = createAsyncThunk(
    'wallets/addWallet',
    async (data) => {
        const res = await axios.post('http://localhost:8080/users/wallets', data)
        console.log(res.data)
        return res.data
    }
)
export const searchWallet = createAsyncThunk(
    'wallets/searchWallet',
    async (data) => {
        console.log(data)
        return data
    }
)