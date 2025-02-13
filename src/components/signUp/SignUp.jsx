import { useState } from 'react'
import './signUp.css'

import PropTypes from 'prop-types'

// MUI icons
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import InfoIcon from '@mui/icons-material/Info'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {toast} from "react-hot-toast";
import {register} from "../../api/auth/auth_API.js";

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [registerError, setRegisterError] = useState('')
    const [showInfoMessage, setShowInfoMessage] = useState(false)

    // Handle form submission for registration
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email || !password) {
            setRegisterError('Todos los campos son requeridos.')
            return;
        }

        if (!email.endsWith('@ucr.ac.cr')) {
            setRegisterError('El correo electrónico debe ser institucional (@ucr.ac.cr)')
            return
        }

        const passwordRegex = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%"^&*.])[A-Za-z0-9!@#$%^&*."]{8,}$/

        if (!passwordRegex.test(password)) {
            setRegisterError('La contraseña debe tener al menos ocho caracteres, incluyendo dos números y un caracter especial (!@#$%"^&*.).')
            return
        }

        try {
            const response = await register(name, email, password)
            toast(response.message, { icon: '🆕' })
            resetForm()
        } catch (error) {
            toast.error(error.message)
        }
    };

    // Handle input changes and reset success/error messages
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value)
        setRegisterError('')
    };

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
        setRegisterError('')
    }

    return (
        <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
                <h1 id='register-title'>Crear cuenta</h1>

                {/* Name Field */}
                <div className={'input-wrapper'}>
                    <PersonIcon />
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={handleInputChange(setName)}
                        className="input-field"
                    />
                </div>

                {/* Email Field */}
                <div className={'input-wrapper'}>
                    <EmailIcon />
                    <input
                        type="email"
                        placeholder="Correo electrónico institucional"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                        className="input-field"
                    />
                </div>

                {/* Password Field */}
                <div className="password-container">
                    <div className="icon-container" onClick={() => setShowInfoMessage(!showInfoMessage)}>
                        <InfoIcon className={'infoIcon'} />
                        <div className={`info-message ${showInfoMessage ? 'active' : ''}`}>
                            La contraseña debe tener al menos ocho caracteres, incluyendo dos números y un caracter especial (!@#$%"^&*.)
                        </div>
                    </div>
                    <div className={'input-wrapper'}>
                        <LockIcon />
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
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </span>
                        )}
                    </div>
                </div>

                {registerError && <div style={{ color: 'red' }}>{registerError}</div>}

                {/* Submit Button */}
                <button type="submit" id="register-button">
                    <CheckCircleIcon style={{ marginRight: '8px' }} />
                    Registrar
                </button>
            </form>
        </div>
    );
};

SignUp.propTypes = {
    switchToSignIn: PropTypes.func.isRequired
};

export default SignUp;
