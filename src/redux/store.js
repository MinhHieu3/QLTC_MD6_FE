import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import walletReducer from "./wallet/walletSlice";
import detailReducer from "./detail/detailSlice";
import categoryReducer from "./category/categorySlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        wallets: walletReducer,
        details: detailReducer,
        categories: categoryReducer
    }
});

export default store;
