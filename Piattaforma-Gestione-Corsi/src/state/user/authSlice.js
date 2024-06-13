import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        role: ''
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.role = '';
        },
        updateUserCourses: (state, action) => {
            if (state.user && state.user.id === action.payload.id) {
                if (!state.user.corsiSeguiti) {
                    state.user.corsiSeguiti = [];
                }
                state.user.corsiSeguiti.push(action.payload.course);
            }
        },
        removeUserCourse: (state, action) => {
            if (state.user && state.user.id === action.payload.id) {
                state.user.corsiSeguiti = state.user.corsiSeguiti.filter(course => course.id !== action.payload.courseId);
            }
        }
    },
});

export const { login, logout, updateUserCourses, removeUserCourse } = authSlice.actions;

export const authReducer = authSlice.reducer;