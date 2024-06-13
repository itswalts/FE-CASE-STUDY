import styleLoginForm from './LoginForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/firebase-services';
import { login } from '../../state/user/authSlice';
import { setEmail, setPassword, clearLoginForm } from '../../state/user/loginFormSlice';

export function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginFormData = useSelector((state) => state.loginForm);
    const [localLoginFormData, setLocalLoginFormData] = useState(loginFormData);

    const setAction = {
        email: setEmail,
        password: setPassword
    };

    useEffect(() => {
        setLocalLoginFormData(loginFormData);
    }, [loginFormData]);

    function handleChange(e) {
        const { name, value } = e.target;
        setLocalLoginFormData({ ...localLoginFormData, [name]: value });

        const action = setAction[name];
        if (action) {
            dispatch(action(value));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            const userData = await loginUser(localLoginFormData);
            toast.success("Login avvenuto con successo!", { autoClose: 2000 });
            dispatch(login({ user: userData, role: userData.role }));
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(`Errore nel login: ${error.message}`, { autoClose: 2000 });
        }
    }
    

    return (
        <div className={`${styleLoginForm.formContainer}`}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailUser" className={`${styleLoginForm['form-label']} form-label`}>Indirizzo email</label>
                    <input 
                    type="email" 
                    className={`${styleLoginForm['form-control']} form-control`} 
                    id="emailUser"
                    value={localLoginFormData.email}
                    name="email"
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordUser" className={`${styleLoginForm['form-label']} form-label`}>Password</label>
                    <input 
                    type="password" 
                    className={`${styleLoginForm['form-control']} form-control`} 
                    id="passwordUser"
                    value={localLoginFormData.password}
                    name="password"
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit" className={`${styleLoginForm['btn-primary']} btn-primary`}>Accedi</button>
            </form>

            <ToastContainer />
        </div>
    );
}