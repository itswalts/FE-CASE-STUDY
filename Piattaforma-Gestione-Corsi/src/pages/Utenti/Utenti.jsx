import { useSelector } from 'react-redux';
import { UsersTable } from '../../components/UsersTable/UsersTable';
import styles from './Utenti.module.css';

export function Utenti() {
    const { role } = useSelector((state) => state.auth);

    if (!role.includes('admin')) {
        return <p>Accesso non autorizzato</p>;
    }

    return (
        <div className={styles.pageContainer}>
            <UsersTable />
        </div>
    );
}