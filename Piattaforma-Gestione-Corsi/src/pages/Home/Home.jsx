import { CourseCategoryList } from '../../components/CourseCategoryList/CourseCategoryList';
import stylesHome from './Home.module.css';

export function Home() {
    return (
        <div className={stylesHome.homeContainer}>
            <h1>Benvenuto su UdemIT!</h1>
            <p>Scopri i nostri corsi:</p>
            <CourseCategoryList />
        </div>
    );
}