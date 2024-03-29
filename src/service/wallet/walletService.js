import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getWallets = createAsyncThunk(
    'wallets/getWallets',
    async ({id, token}) => {
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
    'wallets/updateWallet',
    async ({id, data}) => {
        const res = await axios.put('http://localhost:8080/users/wallets/' + id, data)
        return res.data
    }
)
export const addWallet = createAsyncThunk(
    'wallets/createWallet',
    async (values) => {
        const res = await axios.post('http://localhost:8080/users/wallets', values)
        return res.data
    }
)
export const findByIdWallet = createAsyncThunk(
    'wallets/findByIdWallet',
    async (idWallet) => {
        const res = await axios.get('http://localhost:8080/users/wallets/'+idWallet+'/findByIdWallet')
        return res.data
    }
)
export const searchWallet = createAsyncThunk(
    'wallets/searchWallet',
    async (data) => {
        return data
    }
)
export const setIndexWallet=createAsyncThunk(
    'wallets/getIndex',
    async (index)=>{
        return index
    }
)
export const transferMoney = createAsyncThunk(
    'wallets/transferMoney',
    async ({ senderId, receiverId, amount }) => {
        try {
            const response = await axios.post("http://localhost:8080/users/wallets/transfer", {
                senderId,
                receiverId,
                amount
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    }
);
