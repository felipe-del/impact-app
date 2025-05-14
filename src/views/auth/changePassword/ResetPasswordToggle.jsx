/**
 * ResetPasswordToggle component
 * 
 * This component handles the toggle between the "Forgot Password" and "Reset Password" views.
 * It uses React Router for navigation and manages the state of the email sent status.
 * It also includes a useEffect hook to check for an authentication token in local storage.
 * If the token is found, it redirects the user to the app page.
 */
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './resetPasswordToggle.css';

import NorthWestIcon from '@mui/icons-material/NorthWest';
import ForgotPassword from "../../../components/changePassword/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "../../../components/changePassword/resetPassword/ResetPassword.jsx";

/**
 * ResetPasswordToggle component that handles the toggle between the "Forgot Password" and "Reset Password" views.
 * 
 * @component
 * @returns {JSX.Element} - The ResetPasswordToggle component.
 */
const ResetPasswordToggle = () => {
    const [isSendEmail, setIsSendEmail] = useState(false); 

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            navigate('/app');
        }
    }, [navigate]);

    /**
     * Handles the email sent status and updates the state accordingly.
     * 
     * @param {boolean} emailSent - The status of the email sent.
     * @returns {void}
     */
    const handleEmailSent = () => {
        setIsSendEmail(true);
    };

    /**
     * Handles the back to login action and navigates to the login page.
     * 
     * @param {void}
     * @returns {void}
     */
    const handleBackToLogin = () => {
        navigate('/auth');
    };

    /**
     * Handles the resend token action and updates the state accordingly.
     * 
     * @param {void}
     * @returns {void}
     */
    const handleResendToken = () => {
        if (isSendEmail) {
            setIsSendEmail(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className={`container ${isSendEmail ? 'active' : ''}`}>
                {/* Pass the callback as a prop */}
                <ForgotPassword onEmailSent={handleEmailSent} />
                <ResetPassword />
                <div className="toggle-container">
                    <div className={`toggle ${isSendEmail ? '' : 'active'}`}>
                        <div className="toggle-panel toggle-left">
                            <h1>{isSendEmail ? 'Paso 2: Restablecer contraseña' : 'Paso 1: Enviar correo para token'}</h1>
                            <p>
                                Introduce el token que recibiste en tu correo y crea una nueva contraseña para
                                acceder a tu cuenta de manera segura.
                            </p>
                            <button className="hidden" onClick={handleResendToken}>
                                <NorthWestIcon style={{marginRight: '8px'}}/>
                                Reenviar token
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>{isSendEmail ? 'Paso 2: Información adicional' : 'Paso 1: Enviar token'}</h1>
                            <p>
                                Ingresa tu correo electrónico institucional para recibir el token que te permitirá
                                restablecer tu contraseña.
                            </p>
                            <button className="hidden" onClick={handleBackToLogin}>
                                <NorthWestIcon style={{marginRight: '8px', verticalAlign: 'middle'}}/>
                                Volver al login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordToggle;
