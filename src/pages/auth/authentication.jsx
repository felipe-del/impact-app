import React, { useState } from 'react';
import './authentication.css';
import { Escudo_UCR } from '../../declarations/imageExports';
import SignIn from '../../components/signIn/signIn';
import SignUp from '../../components/signUp/signUp';
import { Manual_usuario } from '../../declarations/pdfExports.js';
import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const { setUser } = useUser();
    const [isSignIn, setIsSignIn] = useState(false); // Sign In is set as the default view
    const navigate = useNavigate(); // Initialize useNavigate hook

    const toggleSignIn = () => {
        setIsSignIn(prevState => !prevState);
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className={`container ${isSignIn ? 'active' : ''}`}>
                <SignIn switchToSignUp={toggleSignIn} setUser={setUser} navigate={navigate} />
                <SignUp switchToSignIn={toggleSignIn} />
                <div className="toggle-container">
                    <div className={`toggle ${isSignIn ? '' : 'active'}`}>
                        <div className="toggle-panel toggle-left">
                            <h1>{isSignIn ? 'Bienvenido!' : ' '}</h1>
                            <p>Ingresa tus datos personales para utilizar todas las funciones del sitio</p>
                            <a href={Manual_usuario} target="_blank" id="pdf_link">Manual de usuario</a>
                            <button className="hidden" onClick={toggleSignIn} id={isSignIn ? 'login' : 'register'}>
                                {isSignIn ? 'Inicio de sesión' : 'Registro'}
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <img src={Escudo_UCR} alt="Escudo UCR" />
                            <h1>{isSignIn ? ' ' : 'IMPACT | CIMPA'}</h1>
                            <p>{isSignIn ? ' ' : 'Si no tiene una cuenta, puede registrarse aquí'}</p>
                            <a href={Manual_usuario} target="_blank" id="pdf_link">Manual de usuario</a>
                            <button className="hidden" onClick={toggleSignIn} id={isSignIn ? 'register' : 'login'}>
                                {isSignIn ? ' ' : 'Registro'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
