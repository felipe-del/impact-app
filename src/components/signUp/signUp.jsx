import React, { useState } from 'react';
import { API_URLS } from '../../declarations/apiConfig.js';
import useFetch from '../../hooks/useFetch.jsx';
import './signUp.css';
import { InfoIcon } from '../../declarations/imageExports';
import Spinner from 'react-bootstrap/Spinner';

const SignUp = ({ switchToSignIn }) => {
    const { fetchData, isLoading, error } = useFetch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showInfoMessage, setShowInfoMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setRegisterError('Todos los campos se deben de llenar.');
            return;
        }
        
        if (!email.endsWith('@ucr.ac.cr')) {
            setRegisterError('Se debe de registrar con el correo institucional');
            return;
        }

        const passwordRegex = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%"^&*.])[A-Za-z0-9!@#$%^&*."]{8,}$/;

        if (!passwordRegex.test(password)) {
            setRegisterError('La contraseña debe de tener al menos 8 carácteres, los cuales deben de incluir 2 números y 1 especial(!@#$%"^&*.).');
            return;
        }
        
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            };
            const data = await fetchData(API_URLS.AUTH.REGISTER, options);

            console.log(data);
            if (data) {
                setRegisterSuccess('Registro exitoso!!!.');
                setName('');
                setEmail('');
                setPassword('');
            } else {
                setRegisterError('Correo ya registrado!!');
            }
        } catch (error) {
            setRegisterError('Registro fallido. Por favor revisa tus credenciales y prueba de nuevo.');
        }
    };
     
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setRegisterSuccess('');
        setRegisterError('');
    };

    return (
        <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
                <h1>Crear Cuenta</h1>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={handleInputChange(setName)}
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Correo eléctronico institucional"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    className="input-field"
                />
                <div className="password-container">
                    <div className="icon-container" onClick={() => setShowInfoMessage(!showInfoMessage)}>
                        <img src={InfoIcon} alt="Info Icon"/>
                        <div className={`info-message ${showInfoMessage ? 'active' : ''}`}>
                            Tu contraseña debe tener al menos 8 caracteres, 2 números y 1 carácter especial.(Gatito#23)
                        </div>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        className="input-field password-input"
                    />
                    {password && (
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'OCULTAR' : 'MOSTRAR'}
                        </span>
                    )}
                </div>

                {isLoading &&
                    <div>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {registerSuccess && <div style={{ color: 'green' }}>{registerSuccess}</div>}
                {registerError && <div style={{ color: 'red' }}>{registerError}</div>}
                <button type="submit">REGISTRAR</button>
                <button className="hidden" onClick={switchToSignIn} id="register">Sign In</button>
            </form>
        </div>
    );
};

export default SignUp;
