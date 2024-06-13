import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, removeUser } from '../../state/user/userSlice';
import { getAllUsers, deleteUser } from '../../services/firebase-services';
import styles from './UsersTable.module.css';

export function UsersTable() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setStatus('loading');
            try {
                const usersData = await getAllUsers();
                dispatch(setUsers(usersData));
                setStatus('succeeded');
            } catch (error) {
                setError(error.message);
                setStatus('failed');
            }
        };

        fetchUsers();
    }, [dispatch]);

    const handleDelete = async (userEmail) => {
        try {
            await deleteUser(userEmail);
            dispatch(removeUser(userEmail));
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.userContainer}>
            <h2>Utenti</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.email)}>Elimina</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}