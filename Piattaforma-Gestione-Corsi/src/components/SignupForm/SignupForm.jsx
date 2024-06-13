import styleSignupForm from './SignupForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setName, setLastName, setEmail, setPassword, setConfirmPassword, clearSignupForm } from '../../state/user/signupFormSlice';
import { registerUser } from '../../services/firebase-services';

export function SignupForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signupFormData = useSelector((state) => state.signupForm);
    const [localSignupFormData, setLocalSignupFormData] = useState(signupFormData);

    const setAction = {
        name: setName,
        lastName: setLastName,
        email: setEmail,
        password: setPassword,
        confirmPassword: setConfirmPassword
    };

    useEffect(() => {
        setLocalSignupFormData(signupFormData);
    }, [signupFormData]);

    function capitalizeWords(value) {
        return value
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    function handleChange(e) {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'name' || name === 'lastName') {
            formattedValue = capitalizeWords(value);
        }

        setLocalSignupFormData({ ...localSignupFormData, [name]: formattedValue });

        const action = setAction[name];
        if (action) {
            dispatch(action(formattedValue));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (localSignupFormData.password !== localSignupFormData.confirmPassword) {
            toast.error("Le password inserite non coincidono! Riprova", { autoClose: 3000 });
            return;
        }

        try {
            await registerUser(localSignupFormData);
            toast.success("Registrazione avvenuta con successo!", { autoClose: 3000 });

            dispatch(clearSignupForm());
            setLocalSignupFormData({
                name: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            navigate('/Login');
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error(`Errore nella registrazione: ${error.message}`, { autoClose: 3000 });
        }
    }

    return (
        <div className={`${styleSignupForm.formContainer}`}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nameUser" className={`${styleSignupForm['form-label']} form-label`}>Nome</label>
                    <input 
                    type="text" 
                    className={`${styleSignupForm['form-control']} form-control`} 
                    id="nameUser"
                    value={localSignupFormData.name}
                    name="name"
                    onChange={handleChange}
                    maxLength={20}
                    pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$"
                    title="Il nome può contenere solo caratteri alfabetici e deve iniziare con una lettera maiuscola"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastNameUser" className={`${styleSignupForm['form-label']} form-label`}>Cognome</label>
                    <input 
                    type="text" 
                    className={`${styleSignupForm['form-control']} form-control`} 
                    id="lastNameUser"
                    value={localSignupFormData.lastName}
                    name="lastName"
                    onChange={handleChange}
                    maxLength={20}
                    pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$"
                    title="Il cognome può contenere solo caratteri alfabetici e deve iniziare con una lettera maiuscola"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailUser" className={`${styleSignupForm['form-label']} form-label`}>Indirizzo email</label>
                    <input 
                    type="email" 
                    className={`${styleSignupForm['form-control']} form-control`} 
                    id="emailUser"
                    value={localSignupFormData.email}
                    name="email"
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordUser" className={`${styleSignupForm['form-label']} form-label`}>Password</label>
                    <input 
                    type="password" 
                    className={`${styleSignupForm['form-control']} form-control`} 
                    id="passwordUser"
                    value={localSignupFormData.password}
                    name="password"
                    onChange={handleChange}
                    pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
                    title="La password deve contenere almeno 8 caratteri, un numero e una lettera maiuscola"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className={`${styleSignupForm['form-label']} form-label`}>Conferma Password</label>
                    <input 
                    type="password" 
                    className={`${styleSignupForm['form-control']} form-control`} 
                    id="confirmPassword"
                    value={localSignupFormData.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit" className={`${styleSignupForm['btn-primary']} btn-primary`}>Registrati</button>
            </form>

            <ToastContainer />
        </div>
    )
}