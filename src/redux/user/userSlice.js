import {createSlice} from "@reduxjs/toolkit";
import {deleteUsers, editUsers, findById, getUsers} from "../../service/user/userService";

const initialState = {
    users: JSON.parse(localStorage.getItem('user')),
    usersById: [],
    editUsers: []
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))
        })
        builder.addCase(findById.fulfilled, (state, action) => {
            state.usersById = action.payload.data
        })
        builder.addCase(editUsers.fulfilled, (state, action) => {
            state.usersById = action.payload
        });
        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            state.usersById = state.usersById.filter(users => users.id !== action.payload);

        })
    }
})
export default userSlice.reducer