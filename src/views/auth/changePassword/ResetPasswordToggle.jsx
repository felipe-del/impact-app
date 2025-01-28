import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './resetPasswordToggle.css';

import NorthWestIcon from '@mui/icons-material/NorthWest';
import ForgotPassword from "../../../components/changePassword/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "../../../components/changePassword/resetPassword/ResetPassword.jsx";


const ResetPasswordToggle = () => {
    const [isSendEmail, setIsSendEmail] = useState(false); // Default to send email view

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            navigate('/app');
        }
    }, [navigate]);

    // Callback to update `isSendEmail`
    const handleEmailSent = () => {
        setIsSendEmail(true);
    };

    // Navigate to login page
    const handleBackToLogin = () => {
        navigate('/auth');
    };

    // Resend token
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
