import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import walletReducer from "./wallet/walletSlice";
import detailReducer from "./detail/detailSlice";

export const store=configureStore({
    reducer:{
        users:userReducer,
        wallets:walletReducer,
        details:detailReducer
    }
})
export default store;