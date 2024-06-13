import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
    role: '',
};

const loginFormSlice = createSlice({
    name: "loginForm",
    initialState: initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        clearLoginForm: (state) => {
            state.email = '';
            state.password = '';
            state.role = '';
        },
    },
});

export const {
    setEmail,
    setPassword,
    setRole,
    clearLoginForm,
} = loginFormSlice.actions;

export const loginFormReducer = loginFormSlice.reducer;