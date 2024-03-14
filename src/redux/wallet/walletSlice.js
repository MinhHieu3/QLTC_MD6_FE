import {createSlice} from "@reduxjs/toolkit";
import {addWallet, deleteWallet, getWallets, searchWallet} from "../../service/wallet/walletService";

const initialState = {
    wallets: [],
    search: ''
}
const walletSlice = createSlice({
    name: 'wallets',
    initialState,
    extraReducers: builder => {
        builder.addCase(getWallets.fulfilled, (state, action) => {
            state.wallets = action.payload
        })
        builder.addCase(deleteWallet.fulfilled, (state, action) => {
            state.wallets = state.wallets.filter(wallets => wallets.id !== action.payload)
        })
        builder.addCase(addWallet.fulfilled, (state, action) => {
            state.wallets.push(action.payload)
        })
        builder.addCase(searchWallet.fulfilled, (state, action) => {
            state.search = action.payload
        })
    }
})
export default walletSlice.reducer