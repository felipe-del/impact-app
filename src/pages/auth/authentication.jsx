import React, { useState } from 'react';
import './authentication.css';
import { Escudo_UCR } from '../../declarations/imageExports';
import SignIn from '../../components/signIn/signIn';
import SignUp from '../../components/signUp/signUp';

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
                            <h1>{isSignIn ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
                            <p>{isSignIn ? 'Enter your personal details to use all of site features' : 'Register with your personal details to use all of site features'}</p>
                            <button className="hidden" onClick={toggleSignIn} id={isSignIn ? 'login' : 'register'}>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <img src={Escudo_UCR} alt="Escudo UCR" />
                            <h1>{isSignIn ? 'Hello, Friend!' : 'IMPACT | CIMPA'}</h1>
                            <p>{isSignIn ? 'Register with your personal details to use all of site features' : 'Enter your personal details to use all of site features'}</p>
                            <button className="hidden" onClick={toggleSignIn} id={isSignIn ? 'register' : 'login'}>{isSignIn ? 'Sign Up' : 'Sign In'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
