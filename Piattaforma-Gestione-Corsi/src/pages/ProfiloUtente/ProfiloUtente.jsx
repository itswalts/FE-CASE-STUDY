import { useSelector } from 'react-redux';
import { UserInfoCard } from '../../components/UserInfoCard/UserInfoCard';
import { UserCoursesSubscribed } from '../../components/UserCoursesSubscribed/UserCoursesSubscribed';
import stylesProfiloUtente from './ProfiloUtente.module.css';

export function ProfiloUtente() {
    const { role } = useSelector((state) => state.auth);

    return (
        <div className={stylesProfiloUtente.pageContainer}>
            <h1>Profilo Utente</h1>
            <UserInfoCard />
            {!role.includes('admin') && <UserCoursesSubscribed />}
        </div>
    );
}