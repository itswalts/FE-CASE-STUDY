import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const signupFormSlice = createSlice({
    name: "signupForm",
    initialState: initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        clearSignupForm: (state) => {
            state.name = '';
            state.lastName = '';
            state.email = '';
            state.password = '';
            state.confirmPassword = '';
            state.errors = {};
        },
    },
});

export const {
    setName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    clearSignupForm,
} = signupFormSlice.actions;

export const signupFormReducer = signupFormSlice.reducer;