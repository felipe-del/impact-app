import React, { useState, useEffect } from 'react';
import { API_URLS } from '../../declarations/apiConfig.js';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import './signIn.css';

const SignIn = ({ switchToSignUp, setUser }) => {
    const { fetchData, isLoading, error } = useFetch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(''); 

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const data = await fetchData(API_URLS.AUTH.LOGIN, options);

            if (data && data.authenticated) {
                console.log(data);
                setUser(data); // Set user in context
                navigate('/app'); // Navigate to app route
                setLoginError('');
            } else {
                setLoginError('Por favor, verifique sus credenciales e inténtelo nuevamente.');
            }
        } catch (error) {
            setLoginError('Por favor, verifique sus credenciales e inténtelo nuevamente.');
            console.error('Login error:', error);
        }
    };

    // Optionally check for existing sessions on component mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(API_URLS.AUTH.CURRENT_USER, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch session data');
                const result = await response.json();

                if (result && result.authenticated) {
                    setUser(result);
                    navigate('/app'); // Navigate if authenticated
                }
            } catch (error) {
                console.error('Error checking session:', error);
            }
        };

        checkSession();
    }, [setUser, navigate]);

    return (
        <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
                <h1>Inicio de sesión</h1>
                <input
                    type="email"
                    placeholder="Correo electrónico institucional"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                {isLoading && <div>Loading...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                <button type="submit">Iniciar sesión</button>
                <button className="hidden" onClick={switchToSignUp} id="login">Sign Up</button>
            </form>
        </div>
    );
};

export default SignIn;
