import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backend: [],
    frontend: [],
    fullstack: [],
    cybersecurity: []
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addBackendCourse: (state, action) => {
            state.backend.push(action.payload);
        },
        addFrontendCourse: (state, action) => {
            state.frontend.push(action.payload);
        },
        addFullstackCourse: (state, action) => {
            state.fullstack.push(action.payload);
        },
        addCybersecurityCourse: (state, action) => {
            state.cybersecurity.push(action.payload);
        },
        removeCourse: (state, action) => {
            const { category, id } = action.payload;
            state[category] = state[category].filter(course => course.id !== id);
        },
        updateCourse: (state, action) => {
            const { oldCategory, newCategory, course } = action.payload;
            // Rimuovi il corso dalla vecchia categoria
            state[oldCategory] = state[oldCategory].filter(c => c.id !== course.id);
            // Aggiungi il corso alla nuova categoria
            state[newCategory].push(course);
        },
        setCourses: (state, action) => {
            const courses = action.payload;
            state.backend = courses.filter(course => course.category === 'backend');
            state.frontend = courses.filter(course => course.category === 'frontend');
            state.fullstack = courses.filter(course => course.category === 'fullstack');
            state.cybersecurity = courses.filter(course => course.category === 'cybersecurity');
        }
    }
});

export const {
    addBackendCourse,
    addFrontendCourse,
    addFullstackCourse,
    addCybersecurityCourse,
    removeCourse,
    updateCourse,
    setCourses
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;