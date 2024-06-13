import { configureStore } from "@reduxjs/toolkit";
import { signupFormReducer } from "./user/signupFormSlice";
import { loginFormReducer } from "./user/loginFormSlice";
import { authReducer } from "./user/authSlice";
import { coursesReducer } from "./user/coursesSlice";
import { usersReducer } from "./user/userSlice";
import { userCoursesReducer } from "./user/userCoursesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        signupForm: signupFormReducer,
        loginForm: loginFormReducer,
        courses: coursesReducer,
        users: usersReducer,
        userCourses: userCoursesReducer
    }
})