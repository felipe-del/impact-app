/**
 * AuthToggle component.
 * 
 * This component handles the toggle between the Sign In and Sign Up views.
 * It uses React Router for navigation and manages the state of the sign-in status.
 * It also includes a useEffect hook to check for an authentication token in local storage.
 * If the token is found, it redirects the user to the app page.
 */
import {useEffect, useState} from 'react';
import './authToggle.css';
import { useNavigate } from 'react-router-dom';
import SignIn from "../../../components/signIn/SignIn.jsx";
import SignUp from "../../../components/signUp/SignUp.jsx";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MenuBookIcon from '@mui/icons-material/MenuBook';

/**
 * AuthToggle component that handles the toggle between the Sign In and Sign Up views.
 * 
 * @component
 * @returns {JSX.Element} - The AuthToggle component.
 */
const AuthToggle = () => {
    const [isSignIn, setIsSignIn] = useState(false); 

    const navigate = useNavigate();

    const toggleSignIn = () => {
        setIsSignIn(prevState => !prevState);
    };

    useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            navigate('/app');
        }
    }, [navigate]);

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className={`container ${isSignIn ? 'active' : ''}`}>
                    <SignIn switchToSignUp={toggleSignIn} navigate={navigate} />
                    <SignUp switchToSignIn={toggleSignIn} />
                    <div className="toggle-container">
                        <div className={`toggle ${isSignIn ? '' : 'active'}`}>
                            <div className="toggle-panel toggle-left">
                                <img src="/NEW_IMPACT_BLUE_LOGO.png" alt="IMPACT LOGO" style={{width: "250px", }} />
                                <h1>{isSignIn ? '¡Bienvenido!' : ''}</h1>
                                <a href="/IMPACT.pdf" target="_blank" id="pdf_link">
                                    <MenuBookIcon
                                        style={{marginRight: '6px', verticalAlign: 'middle', fontSize: '1.3rem'}}/>
                                    Manual del Usuario
                                </a>
                                <p>Si ya tienes una cuenta, inicia sesión aquí</p>
                                <button className="hidden" onClick={toggleSignIn}>
                                    {isSignIn ? (
                                        <>
                                        <LoginIcon style={{marginRight: '8px', verticalAlign: 'middle'}}/>
                                            Iniciar Sesión
                                        </>
                                    ) : (
                                        <>
                                            <AccountCircleIcon style={{marginRight: '8px', verticalAlign: 'middle'}}/>
                                            Registrar cuenta
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="toggle-panel toggle-right">
                            <img src="/Escudo_UCR.png" alt="Escudo UCR"/>
                                <h1>{isSignIn ? '' : 'IMPACT | CIMPA'}</h1>
                                <a href="/IMPACT.pdf" target="_blank" id="pdf_link">
                                    <MenuBookIcon style={{marginRight: '6px', verticalAlign: 'middle', fontSize: '1.3rem'}}/>
                                    Manual del Usuario
                                </a>
                                <p>{isSignIn ? '' : 'Si no tienes una cuenta, puedes crear una aquí'}</p>
                                <button className="hidden" onClick={toggleSignIn}>
                                    {isSignIn ? '' : (
                                        <>
                                            <AccountCircleIcon style={{marginRight: '8px', verticalAlign: 'middle'}}/>
                                            Crear cuenta
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthToggle;
