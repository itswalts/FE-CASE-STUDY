import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function Protected({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}