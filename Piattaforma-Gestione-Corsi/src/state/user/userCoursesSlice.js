import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userCoursesSlice = createSlice({
    name: 'userCourses',
    initialState,
    reducers: {
        subscribeToCourse: (state, action) => {
            state.push(action.payload);
        },
        unsubscribeFromCourse: (state, action) => {
            return state.filter(course => course.id !== action.payload);
        },
        setSubscribedCourses: (state, action) => {
            return action.payload;
        },
    },
});

export const { subscribeToCourse, unsubscribeFromCourse, setSubscribedCourses } = userCoursesSlice.actions;

export const userCoursesReducer = userCoursesSlice.reducer;