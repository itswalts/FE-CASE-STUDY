import { SignupForm } from '../../components/SignupForm/SignupForm';
import styleSignup from './Signup.module.css';


export function Signup() {
    return (
        <div className={styleSignup.pageContainer}>
            <div className={styleSignup.textContainer}>
                <h1>Entra subito a far parte di UdemIT!<br /></h1>
                <p>Troverai un sacco di corsi per tenerti aggiornato sul mondo IT.<br /></p>
                <p>Ogni giorno aggiungiamo nuovi corsi per aiutarti ad affrontare il mondo del lavoro!</p>
            </div>
            <SignupForm />
        </div>
    );
}