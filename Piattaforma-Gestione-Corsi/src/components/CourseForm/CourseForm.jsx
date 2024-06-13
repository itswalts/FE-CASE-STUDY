import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBackendCourse, addFrontendCourse, addFullstackCourse, addCybersecurityCourse } from '../../state/user/coursesSlice';
import { addCourse } from '../../services/firebase-services';
import stylesCourseForm from './CourseForm.module.css';

export function CourseForm() {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('backend');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCourse = {
            title,
            duration: Number(duration),
            category,
            description,
        };

        try {
            const courseId = await addCourse(newCourse);
            const courseWithId = { ...newCourse, id: courseId, image: 'https://via.placeholder.com/150', link: '#' };

            switch (category) {
                case 'backend':
                    dispatch(addBackendCourse(courseWithId));
                    break;
                case 'frontend':
                    dispatch(addFrontendCourse(courseWithId));
                    break;
                case 'fullstack':
                    dispatch(addFullstackCourse(courseWithId));
                    break;
                case 'cybersecurity':
                    dispatch(addCybersecurityCourse(courseWithId));
                    break;
                default:
                    break;
            }

            setTitle('');
            setDuration('');
            setCategory('backend');
            setDescription('');
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    if (!role.includes('admin')) {
        return null;
    }

    return (
        <form className={stylesCourseForm.formContainer} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Titolo</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Durata</label>
                <input
                    type="number"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Categoria</label>
                <select
                    className="form-select"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="backend">Back-end</option>
                    <option value="frontend">Front-end</option>
                    <option value="fullstack">Full-Stack</option>
                    <option value="cybersecurity">Cybersecurity</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descrizione</label>
                <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit" className={`${stylesCourseForm['btn-primary']} btn-primary`}>Aggiungi Corso</button>
        </form>
    );
}