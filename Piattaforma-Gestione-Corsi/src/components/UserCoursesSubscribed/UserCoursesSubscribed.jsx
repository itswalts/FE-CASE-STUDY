import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unsubscribeFromCourse } from '../../state/user/userCoursesSlice';
import { ToastContainer, toast } from 'react-toastify';
import backendImage from "../../assets/backend.png";
import frontendImage from '../../assets/frontend.png';
import fullstackImage from '../../assets/fullstack.jpg';
import cybersecurityImage from '../../assets/cybersecurity.jpg';
import styles from './UserCoursesSubscribed.module.css';

export function UserCoursesSubscribed() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const images = {
        backend: backendImage,
        frontend: frontendImage,
        fullstack: fullstackImage,
        cybersecurity: cybersecurityImage,
    };

    const handleUnsubscribe = (courseId) => {
        dispatch(unsubscribeFromCourse(courseId));
        toast.success("Ti sei disiscritto dal corso!", { autoClose: 1500 });
        dispatch({
            type: 'auth/removeUserCourse',
            payload: { id: user.id, courseId }
        });
    };

    if (!user || !user.corsiSeguiti) {
        return <p>Loading user courses...</p>;
    }

    return (
        <div className={styles.subscribedCoursesContainer}>
            <h2>Corsi Iscritti</h2>
            {user.corsiSeguiti.length === 0 ? (
                <p>Non sei iscritto a nessun corso.</p>
            ) : (
                user.corsiSeguiti.map(course => (
                    <div key={course.id} className={styles.courseCard}>
                        <img src={images[course.category]} className="card-img-top" alt={course.title} />
                        <div className="card-body">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text">{course.description}</p>
                            <button className="btn btn-danger" onClick={() => handleUnsubscribe(course.id)}>Disiscriviti</button>
                        </div>
                    </div>
                ))
            )}

            <ToastContainer />
        </div>
    );
}