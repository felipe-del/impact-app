import { useState } from 'react'
import './signUp.css'

import PropTypes from 'prop-types'

const SignUp = ({ switchToSignIn }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState('')
    const [showInfoMessage, setShowInfoMessage] = useState(false)

    // Handle form submission for registration
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email || !password) {
            setRegisterError('All fields must be filled.')
            return;
        }

        if (!email.endsWith('@ucr.ac.cr')) {
            setRegisterError('You must register with an institutional email.')
            return
        }

        const passwordRegex = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%"^&*.])[A-Za-z0-9!@#$%^&*."]{8,}$/

        if (!passwordRegex.test(password)) {
            setRegisterError('Password must be at least 8 characters, including 2 numbers and 1 special character (!@#$%"^&*.)')
            return
        }

    };

    // Handle input changes and reset success/error messages
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value)
        setRegisterSuccess('')
        setRegisterError('')
    };

    return (
        <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleInputChange(setName)}
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Institutional Email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    className="input-field"
                />
                <div className="password-container">
                    <div className="icon-container" onClick={() => setShowInfoMessage(!showInfoMessage)}>
                        <img src="/info_icon.png" alt="Info Icon"/>
                        <div className={`info-message ${showInfoMessage ? 'active' : ''}`}>
                            Your password must be at least 8 characters long, including 2 numbers and 1 special character.
                        </div>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        className="input-field password-input"
                    />
                    {password && (
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'HIDE' : 'SHOW'}
                        </span>
                    )}
                </div>

                {registerSuccess && <div style={{ color: 'green' }}>{registerSuccess}</div>}
                {registerError && <div style={{ color: 'red' }}>{registerError}</div>}
                <button type="submit">REGISTER</button>
                <button className="hidden" onClick={switchToSignIn}>Sign In</button>
            </form>
        </div>
    );
};

SignUp.propTypes = {
    switchToSignIn: PropTypes.func.isRequired
};

export default SignUp;
