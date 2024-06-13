import React from 'react';
import { useSelector } from 'react-redux';
import { CourseForm } from '../../components/CourseForm/CourseForm';
import styleCorsi from './Corsi.module.css';
import { CourseCategoryList } from '../../components/CourseCategoryList/CourseCategoryList';

export function Corsi() {
    const { role } = useSelector((state) => state.auth);

    return (
        <div className={styleCorsi.pageContainer}>
            <h1>Corsi</h1>
            {role.includes('admin') && <CourseForm />}
            <CourseCategoryList />
        </div>
    );
}