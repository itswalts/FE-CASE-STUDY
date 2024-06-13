import React from 'react';
import styleNavbar from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import siteLogo from '../../assets/udemit.jpg';
import { logout } from '../../state/user/authSlice';
import { logoutUser } from '../../services/firebase-services';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    const handleNavbar = () => {
        const navbarCollapse = document.getElementById('navbarSupportedContent');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logout());
            Cookies.remove('token');
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg ${styleNavbar['navbar-custom']}`}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img src={siteLogo} className={`${styleNavbar.logo}`} alt="Site Logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {isAuthenticated &&  
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Corsi" onClick={handleNavbar}>I corsi</NavLink>
                                </li>
                            }
                            {isAuthenticated &&  
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/ProfiloUtente" onClick={handleNavbar}>Profilo utente</NavLink>
                                </li>
                            }
                            {isAuthenticated && role.includes('admin') && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/Utenti" onClick={handleNavbar}>Utenti</NavLink>
                                </li>
                            )}
                            {isAuthenticated && role.includes('admin') && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/Logs" onClick={handleNavbar}>Logs</NavLink>
                                </li>
                            )}
                        </ul>
                        <div className="d-flex">
                            {!isAuthenticated ? (
                                <>
                                    <NavLink className="btn btn-dark me-2" to="/Login" onClick={handleNavbar}>Accedi</NavLink>
                                    <NavLink className="btn btn-dark" to="/Signup" onClick={handleNavbar}>Registrati</NavLink>
                                </>
                            ) : (
                                <button className="btn btn-dark" onClick={handleLogout}>Log out</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}