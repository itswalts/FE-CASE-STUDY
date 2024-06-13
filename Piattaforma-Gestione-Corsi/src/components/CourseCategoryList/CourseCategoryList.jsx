import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CourseCard } from '../CourseCard/CourseCard';
import { useDispatch } from 'react-redux';
import { setCourses } from '../../state/user/coursesSlice';
import { getAllCourses } from '../../services/firebase-services';
import stylesCourseCategoryList from './CourseCategoryList.module.css';

export function CourseCategoryList() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses);

    useEffect(() => {
        async function fetchCourses() {
            const fetchedCourses = await getAllCourses();
            dispatch(setCourses(fetchedCourses));
        }
        fetchCourses();
    }, [dispatch]);

    return (
        <div className={stylesCourseCategoryList.courseContainer}>
            <div className={stylesCourseCategoryList.section}>
                <h2>Back-end</h2>
                <div className={stylesCourseCategoryList.cardsContainer}>
                    {courses.backend && courses.backend.map(course => (
                        <div className={stylesCourseCategoryList.card} key={course.id}>
                            <CourseCard course={course} category="backend" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={stylesCourseCategoryList.section}>
                <h2>Front-end</h2>
                <div className={stylesCourseCategoryList.cardsContainer}>
                    {courses.frontend && courses.frontend.map(course => (
                        <div className={stylesCourseCategoryList.card} key={course.id}>
                            <CourseCard course={course} category="frontend" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={stylesCourseCategoryList.section}>
                <h2>Full-Stack</h2>
                <div className={stylesCourseCategoryList.cardsContainer}>
                    {courses.fullstack && courses.fullstack.map(course => (
                        <div className={stylesCourseCategoryList.card} key={course.id}>
                            <CourseCard course={course} category="fullstack" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={stylesCourseCategoryList.section}>
                <h2>Cybersecurity</h2>
                <div className={stylesCourseCategoryList.cardsContainer}>
                    {courses.cybersecurity && courses.cybersecurity.map(course => (
                        <div className={stylesCourseCategoryList.card} key={course.id}>
                            <CourseCard course={course} category="cybersecurity" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}