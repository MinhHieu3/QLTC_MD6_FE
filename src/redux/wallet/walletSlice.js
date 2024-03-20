import {createSlice} from "@reduxjs/toolkit";

import {
    addWallet,
    deleteWallet,
    editWallet,
    getIndexWallet,
    getWallets,
    searchWallet, transferMoney
} from "../../service/wallet/walletService";

const initialState = {
    wallets: [],
    search: '',
    index:0,
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
        builder.addCase(getIndexWallet.fulfilled, (state, action) => {
            state.index = action.payload
        })
        builder.addCase(editWallet.fulfilled, (state, action) => {
            state.wallets = state.wallets.map(wallet => {
                if (wallet.id === action.payload.id) {
                    return action.payload;
                }
                return wallet;
            });
        });
        builder
            .addCase(transferMoney.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(transferMoney.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(transferMoney.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });



    }
})

export default walletSlice.reducer