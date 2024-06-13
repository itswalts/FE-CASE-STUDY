import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Cookies from "js-cookie";

export function selectCollection(collectionName) {
    return collection(db, collectionName);
}

export async function registerUser(userData) {
    const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
    );
    const user = {
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        role: [],
    };
    await addUser(user);
    await createLog(`Utente registrato con email: ${userData.email}`);
    return user;
}

export async function loginUser(formData) {
    const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
    );
    const user = userCredentials.user;
    Cookies.set("token", user.accessToken, { expires: 7 });
    const userData = await getUser(user.email);
    await createLog(`Accesso effettuato da utente con email: ${formData.email}`);
    return userData;
}

export async function logoutUser() {
    await signOut(auth);
}

export async function addUser(user) {
    const userDoc = await addDoc(collection(db, "users"), user);
    return userDoc.id;
}

export async function getUser(email) {
    const response = await getDocs(selectCollection("users"));
    const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const userData = data.find(user => user.email === email);
    return userData;
}


export async function getAllUsers() {
    const response = await getDocs(collection(db, "users"));
    const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
}

export async function deleteUser(email){
    const user = doc(db, "users", email);
    await deleteDoc(user);
}

export async function addCourse(course) {
    const courseData = {
        title: course.title,
        duration: course.duration,
        category: course.category,
        description: course.description
    };
    const courseDoc = await addDoc(collection(db, "courses"), courseData);
    await createLog(`Aggiunto corso: ${course.title}`);
    return courseDoc.id;
}

export async function getAllCourses() {
    const response = await getDocs(collection(db, "courses"));
    const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
}

export async function updateCourse(courseId, updatedCourse) {
    const courseRef = doc(db, "courses", courseId);
    const courseData = {
        title: updatedCourse.title,
        duration: updatedCourse.duration,
        category: updatedCourse.category,
        description: updatedCourse.description
    };
    await updateDoc(courseRef, courseData);
    await createLog(`Aggiornato corso con ID: ${courseId}`);
}

export async function deleteCourse(courseId) {
    const courseRef = doc(db, "courses", courseId);
    await deleteDoc(courseRef);
    await createLog(`Eliminato corso con ID: ${courseId}`);
}

export async function getLogs() {
    const response = await getDocs(selectCollection("logs"));
    const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
}

export async function createLog(message) {
    const log = {
        date: new Date().toLocaleString(),
        message: message,
    };
    await addDoc(selectCollection("logs"), log);
}

export async function deleteLog(id) {
    const log = doc(db, "logs", id);
    await deleteDoc(log);
}