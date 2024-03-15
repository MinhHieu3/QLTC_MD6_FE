import {createSlice} from "@reduxjs/toolkit";
import {getUsers} from "../../service/user/userService";

const initialState = {
    users: JSON.parse(localStorage.getItem('user'))
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.data
            localStorage.setItem('user',JSON.stringify(action.payload.data))
        })

    }
})
export default userSlice.reducer