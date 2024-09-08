import React, { useState, useEffect, FormEvent } from 'react';
import { API_URLS } from '../../declarations/apiConfig.js';
import { useUser } from '../../context/userContext'; 
import useFetch from '../../hooks/useFetch.jsx';
import './signIn.css';

const SignIn = ({ switchToSignUp }) => {
    const { setUser } = useUser();
    const { fetchData, isLoading, error } = useFetch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(''); // Estado para almacenar el mensaje de error

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            };

            const data = await fetchData(API_URLS.AUTH.LOGIN, options);

            console.log(data);
            setUser(data);
            window.location.href = '/app';
        } catch (error) {
            setLoginError('Authentication failed. Please check your credentials and try again.');
            console.error('Login error:', error);
        }
    };
    

    // GET CURRENT USER
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

                if (!response.ok) {
                    throw new Error('Failed to fetch session data');
                }

                const result = await response.json();
                if (result) {
                    console.log('User in session:', result);
                    window.location.href = '/app';
                }
            } catch (error) {
                console.error('Error checking session:', error);
            }
        };

        checkSession();
    }, []);

    return (
        <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <a href="#">Forget Your Password?</a>
                {isLoading && <div>Loading...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                <button type="submit">Sign In</button>
                <button className="hidden" onClick={switchToSignUp} id="login">Sign Up</button>
            </form>
        </div>
    );
};

export default SignIn;
