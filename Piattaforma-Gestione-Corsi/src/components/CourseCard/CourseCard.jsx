import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCourse, updateCourse } from '../../state/user/coursesSlice';
import { deleteCourse, updateCourse as updateCourseInFirebase } from '../../services/firebase-services';
import { subscribeToCourse } from '../../state/user/userCoursesSlice';
import { ToastContainer, toast } from 'react-toastify';
import backendImage from "../../assets/backend.png";
import frontendImage from '../../assets/frontend.png';
import fullstackImage from '../../assets/fullstack.jpg';
import cybersecurityImage from '../../assets/cybersecurity.jpg';
import stylesCourseCard from './CourseCard.module.css';

export function CourseCard({ course, category }) {
    const { role, isAuthenticated, user } = useSelector((state) => state.auth);
    const userCourses = useSelector((state) => state.userCourses);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedCourse, setEditedCourse] = useState({ ...course });

    const images = {
        backend: backendImage,
        frontend: frontendImage,
        fullstack: fullstackImage,
        cybersecurity: cybersecurityImage,
    };

    const handleDelete = async () => {
        try {
            await deleteCourse(course.id);
            dispatch(removeCourse({ category, id: course.id }));
        } catch (error) {
            console.error('Error removing course:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const updatedCourse = {
                title: editedCourse.title,
                duration: editedCourse.duration,
                category: editedCourse.category,
                description: editedCourse.description,
            };
            await updateCourseInFirebase(course.id, updatedCourse);
            dispatch(updateCourse({ oldCategory: category, newCategory: editedCourse.category, course: { ...editedCourse, ...updatedCourse } }));
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse({ ...editedCourse, [name]: value });
    };

    const handleSubscribe = () => {
        const alreadySubscribed = user.corsiSeguiti && user.corsiSeguiti.some(userCourse => userCourse.id === course.id);
        if (alreadySubscribed) {
            toast.error('Sei già iscritto a questo corso', { autoClose: 1500 });
        } else {
            dispatch(subscribeToCourse(course));
            toast.success('Iscritto con successo al corso!', { autoClose: 1500 });

            dispatch({
                type: 'auth/updateUserCourses',
                payload: { id: user.id, course }
            });
        }
    };

    return (
        <div className={stylesCourseCard.card}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="title"
                        value={editedCourse.title}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                    <input
                        type="number"
                        name="duration"
                        value={editedCourse.duration}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                    <select
                        name="category"
                        value={editedCourse.category}
                        onChange={handleChange}
                        className="form-select mb-2"
                    >
                        <option value="backend">Back-end</option>
                        <option value="frontend">Front-end</option>
                        <option value="fullstack">Full-Stack</option>
                        <option value="cybersecurity">Cybersecurity</option>
                    </select>
                    <textarea
                        name="description"
                        value={editedCourse.description}
                        onChange={handleChange}
                        className="form-control mb-2"
                    ></textarea>
                    <button className="btn btn-success" onClick={handleSave}>Salva</button>
                </>
            ) : (
                <>
                    <img src={images[course.category]} className="card-img-top" alt={course.title} />
                    <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">{course.description}</p>
                        {isAuthenticated && !role.includes('admin') && (
                            <button className="btn btn-primary" onClick={handleSubscribe}>Iscriviti</button>
                        )}
                        {role.includes('admin') && (
                            <>
                                <button className={`btn btn-danger ${stylesCourseCard['btn-danger']}`} onClick={handleDelete}>Elimina</button>
                                <button className="btn btn-secondary" onClick={handleEdit}>Modifica</button>
                            </>
                        )}
                    </div>
                </>
            )}

            <ToastContainer />
        </div>
    );
}