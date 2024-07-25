import React, { useState, useEffect, FormEvent } from 'react';
import useFetch from '../../hookts/useFetch.ts';
import { API_URLS } from "../../declarations/apiConfig.ts";

interface SignInProps {
    switchToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ switchToSignUp }) => {
    const { fetchData, isLoading, error } = useFetch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string>(''); // Estado para almacenar el mensaje de error

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const options: RequestInit = {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            };

            const data = await fetchData(API_URLS.AUTH.LOGIN, options);

            if (!data) {
                throw new Error('Login failed');
            }
            console.log(data);
            window.location.href = '/asset';
        } catch (error) {
            setLoginError('Authentication failed. Please check your credentials and try again.');
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        const options: RequestInit = {
            method: 'GET',
        };
        fetchData(API_URLS.AUTH.CURRENT_USER, options)
            .then((result) => {
            if (result) {
                console.log('User in session:', result);
                window.location.href = '/asset'; // Redireccionar según sea necesario si hay un usuario en sesión
            }
        }).catch((error) => {
            console.error('Error checking session:', error);
        });
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
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
