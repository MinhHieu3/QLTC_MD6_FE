import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import walletReducer from "./wallet/walletSlice";

export const store=configureStore({
    reducer:{
        users:userReducer,
        wallets:walletReducer
    }
})