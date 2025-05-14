/**
 * ForgotPassword Component
 *
 * This component renders a form that allows users to request a password reset token
 * by submitting their institutional email. It validates input, sends the request to
 * the backend, and notifies the user of the result.
 */
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import {forgotPassword} from "../../../api/auth/auth_API.js";
import PropTypes from 'prop-types';

/**
 * ForgotPassword React component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} [props.onEmailSent] - Optional callback triggered after a successful password reset request.
 * @returns {JSX.Element} A form for submitting an email to receive a password reset token.
 */
const ForgotPassword = ({ onEmailSent }) => {

    const initialValues = {
        email: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    /**
     * Handles submission of the password reset request.
     * Sends the email to the backend API and triggers feedback.
     *
     * @param {Object} formData - The submitted form data.
     * @param {string} formData.email - The email entered by the user.
     */
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

