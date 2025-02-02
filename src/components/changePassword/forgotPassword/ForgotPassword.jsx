import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// MUI icons
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import {forgotPassword} from "../../../api/auth_API.js";

import PropTypes from 'prop-types';

const ForgotPassword = ({ onEmailSent }) => {

    const initialValues = {
        email: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const handleForgotPassword = async (formData) => {
        try {
            const response = await forgotPassword(formData.email);
            toast(response.message, { icon: '🚀' });
            if (onEmailSent) {
                onEmailSent();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='form-container sign-in'>
            <form onSubmit={handleSubmit(handleForgotPassword)} noValidate>
                <h1 id='login-title'>Restablecer Contraseña</h1>

                {/* Email Field */}
                <div className={'input-wrapper'}>
                    <EmailIcon />
                    <input
                        id='email'
                        type='email'
                        placeholder='Correo electrónico institucional'
                        className='input-field'
                        {...register('email', {
                            required: 'El correo electrónico es requerido',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|ucr\.ac\.cr)$/,
                                message: 'El correo electrónico no es válido',
                            },
                        })}
                    />
                </div>
                {errors.email && (
                    <div className="error-message">
                        {errors.email.message}
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" id='sign-button'>
                    <SendIcon /> Enviar Token
                </button>
            </form>
        </div>
    );
};

ForgotPassword.propTypes = {
    onEmailSent: PropTypes.func,
};

export default ForgotPassword;

