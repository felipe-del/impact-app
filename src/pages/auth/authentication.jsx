import React, { useState } from 'react';
import './authentication.css';
import { Escudo_UCR } from '../../declarations/imageExports';
import SignIn from '../../components/signIn/signIn';
import SignUp from '../../components/signUp/signUp';
import {Manual_usuario} from '../../declarations/pdfExports.js';

const Authentication = () => {
    const [isSignIn, setIsSignIn] = useState(false);

    const toggleSignIn = () => {
        setIsSignIn(prevState => !prevState);
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className={`container ${isSignIn ? 'active' : ''}`}>
                <SignIn switchToSignUp={toggleSignIn} />
                <SignUp switchToSignIn={toggleSignIn} />
                <div className="toggle-container">
                    <div className={`toggle ${isSignIn ? '' : 'active'}`}>
                        <div className="toggle-panel toggle-left">
                            <h1>{isSignIn ? 'Bienvenido!' : ' '}</h1>
                            <p>{isSignIn ? 'Ingresa tus datos personales para utilizar todas las funciones del sitio' : 'Ingresa tus datos personales para utilizar todas las funciones del sitio'}</p>
                            <a href={Manual_usuario} target="_blanck" id="pdf_link" >Manual de usuario</a>
                            <button className="hidden" onClick={toggleSignIn} id={isSignIn ? 'login' : 'register'}>{isSignIn ? 'Inicio de sesión' : 'Registro'}</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <img src={Escudo_UCR} alt="Escudo UCR" />
                            <h1>{isSignIn ? ' ' : 'IMPACT | CIMPA'}</h1>
                            <p>{isSignIn ? ' ' : 'Si no tiene una cuenta, puede registrarse aquí'}</p>
                            <a href={Manual_usuario} target="_blanck" id="pdf_link">Manual de usuario</a>
                            <button className="hidden" onClick={toggleSignIn} id={isSignIn ? 'register' : 'login'}>{isSignIn ? ' ' : 'Registro'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
