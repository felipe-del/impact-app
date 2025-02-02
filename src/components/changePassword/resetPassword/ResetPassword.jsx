import { useState } from 'react';
import './resetPassword.css';

// MUI icons
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-hot-toast';
import {resetPassword} from "../../../api/auth_API.js";
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showInfoMessage, setShowInfoMessage] = useState(false);

    const navigate = useNavigate();

    // Handle form submission for password reset
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Token validation
        if (!token) {
            setRegisterError('Por favor ingrese el token de restablecimiento.');
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%"^&*.])[A-Za-z0-9!@#$%^&*."]{8,}$/;
        if (!passwordRegex.test(password)) {
            setRegisterError('La contraseña debe tener al menos ocho caracteres, incluyendo dos números y un carácter especial (!@#$%"^&*.).');
            return;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            setRegisterError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await resetPassword(token, password);
            toast.success(response.message, { icon: '🔑' });
            resetForm();
            navigate('/auth');
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Handle input changes and reset success/error messages
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setRegisterSuccess('');
        setRegisterError('');
    };

    const resetForm = () => {
        setToken('');
        setPassword('');
        setConfirmPassword('');
        setRegisterSuccess('');
        setRegisterError('');
    };

    return (
        <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
                <h1 id="register-title">Restablecer Contraseña</h1>

                <div className="token-container">
                    <div className={'input-wrapper'}>
                        <VpnKeyIcon />
                        <input
                            type="text"
                            placeholder="Token de restablecimiento"
                            value={token}
                            onChange={handleInputChange(setToken)}
                            className="input-field"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="password-container">
                    <div className={'input-wrapper'}>
                        <LockIcon />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            className="input-field password-input"
                        />
                        {password && (
                            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div className="password-container">
                    <div className="icon-container" onClick={() => setShowInfoMessage(!showInfoMessage)}>
                        <InfoIcon className={'infoIcon'}/>
                        <div className={`info-message ${showInfoMessage ? 'active' : ''}`}>
                            La contraseña debe tener al menos ocho caracteres, incluyendo dos números y un carácter
                            especial (!@#$%"^&*.).
                        </div>
                    </div>
                    <div className={'input-wrapper'}>
                        <LockIcon/>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={handleInputChange(setConfirmPassword)}
                            className="input-field password-input"
                        />
                        {confirmPassword && (
                            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Success and Error Messages */}
                {registerSuccess && <div style={{color: 'green'}}>{registerSuccess}</div>}
                {registerError && <div style={{color: 'red'}}>{registerError}</div>}

                {/* Submit Button */}
                <button type="submit" id="register-button">
                    <CheckCircleIcon style={{marginRight: '8px'}}/>
                    Restablecer Contraseña
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
