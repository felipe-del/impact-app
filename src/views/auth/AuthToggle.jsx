import  { useState } from 'react';
import './authToggle.css';
import { useNavigate } from 'react-router-dom';
import SignIn from "../../components/signIn/SignIn.jsx";
import SignUp from "../../components/signUp/SignUp.jsx";
const AuthToggle = () => {
    const [isSignIn, setIsSignIn] = useState(false); // Default to Sign In view
    const navigate = useNavigate();

    // Toggle between Sign In and Sign Up forms
    const toggleSignIn = () => {
        setIsSignIn(prevState => !prevState);
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className={`container ${isSignIn ? 'active' : ''}`}>
                    <SignIn switchToSignUp={toggleSignIn} navigate={navigate} />
                    <SignUp switchToSignIn={toggleSignIn} />
                    <div className="toggle-container">
                        <div className={`toggle ${isSignIn ? '' : 'active'}`}>
                            <div className="toggle-panel toggle-left">
                                <h1>{isSignIn ? 'Bienvenido!' : ''}</h1>
                                <p>Ingresa tus datos personales para utilizar todas las funciones del sitio</p>
                                <a href="/IMPACT.pdf" target="_blank" id="pdf_link">Manual del Usuario</a>
                                <button className="hidden" onClick={toggleSignIn}>
                                    {isSignIn ? 'Inicio de sesión' : 'Registrar cuenta'}
                                </button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <img src="/Escudo_UCR.png" alt="Escudo UCR" />
                                <h1>{isSignIn ? '' : 'IMPACT | CIMPA'}</h1>
                                <p>{isSignIn ? '' : 'Si no tiene una cuenta, puede registrarse aquí'}</p>
                                <a href="/IMPACT.pdf" target="_blank" id="pdf_link">Manual del Usuario</a>
                                <button className="hidden" onClick={toggleSignIn}>
                                    {isSignIn ? '' : 'Sign Up'}
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
