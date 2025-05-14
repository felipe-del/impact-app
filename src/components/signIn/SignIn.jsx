/**
 * SignIn Component
 * 
 * This component renders a sign-in form for users to log in to the application.
 * It includes fields for email and password, and handles form submission.
 * It validates the input and displays error messages if needed.
 * It also provides a link to reset the password.
 * The component uses React Hook Form for form handling and validation.
 * It uses Material-UI icons for visual elements.
 * It uses react-hot-toast for displaying notifications.
 * It uses react-router-dom for navigation.
 */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './signIn.css';
import PropTypes from 'prop-types';
import { login } from '../../api/auth/auth_API.js';
import { toast } from 'react-hot-toast';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';

/**
 * SignIn React component.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {function} props.switchToSignUp - Function to switch to the sign-up form.
 * @returns {JSX.Element} The rendered SignIn component.
 */
const SignIn = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }, 
    } = useForm({ defaultValues: initialValues });

    /**
     * Handles the form submission for login.
     * Validates the email and password, and sends the request to the backend API.
     * @param {Object} formData - The form data containing email and password.
     * @returns {Promise<void>} - A promise that resolves when the form is submitted.
     */
    const handleLogin = async (formData) => {
        try {
            const response = await login(formData.email, formData.password);
            localStorage.setItem('AUTH_TOKEN', response.data.token);
            toast.success(response.message, { icon: '🚀' });
            navigate('/app');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const passwordValue = watch('password', ''); 

    return (
        <div className='form-container sign-in'>
            <form onSubmit={handleSubmit(handleLogin)} noValidate>
                <h1 id='login-title'>Inicio de sesión</h1>

                {/* Email Field */}
                <div className='input-wrapper'>
                    <EmailIcon />
                    <input
                        id='email'
                        type='email'
                        placeholder='Correo electrónico institucional'
                        className="input-field"
                        {...register('email', {
                            required: 'El correo electrónico es requerido',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|ucr\.ac\.cr|est\.una\.ac\.cr)$/,
                                message: 'El correo electrónico no es válido',
                            },
                        })}
                    />
                </div>
                {errors.email && <div className='error-message'>{errors.email.message}</div>}

                {/* Password Field */}
                <div className="input-wrapper password-wrapper">
                    <LockIcon />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className="input-field"
                        {...register("password", {
                            required: "La contraseña es requerida",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres",
                            },
                        })}
                    />
                    {passwordValue && (
                        <span
                            className="toggle-password-login"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </span>
                    )}
                    <a href="/forgot-password" className="forgot-password-link">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                {errors.password && <div className="error-message">{errors.password.message}</div>}


                {/* Submit Button */}
                <button type='submit' id='sign-button'>
                    <LoginIcon /> Iniciar sesión
                </button>
            </form>
        </div>
    );
};

SignIn.propTypes = {
    switchToSignUp: PropTypes.func.isRequired,
};

export default SignIn;
