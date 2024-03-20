import {createSlice} from "@reduxjs/toolkit";
import {findById, getUsers} from "../../service/user/userService";

const initialState = {
    users: JSON.parse(localStorage.getItem('user')),
    usersById:[]
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.data
            localStorage.setItem('user',JSON.stringify(action.payload.data))
        })
        builder.addCase(findById.fulfilled, (state, action) => {
            state.usersById = action.payload.data
        })

    }
})
export default userSlice.reducer