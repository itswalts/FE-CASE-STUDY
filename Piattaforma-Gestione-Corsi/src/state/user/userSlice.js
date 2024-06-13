import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.email !== action.payload);
        },
    },
});

export const { setUsers, addUser, removeUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;