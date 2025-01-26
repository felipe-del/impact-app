import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './signIn.css'

import PropTypes from 'prop-types'
import { login } from '../../api/Auth_API.js'
import { toast } from 'sonner'

// MUI icons
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'

const SignIn = () => {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues })

    const handleLogin = async (formData) => {
        try {
            const response = await login(formData.email, formData.password)
            localStorage.setItem('AUTH_TOKEN', response.data.token)
            navigate('/app')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className='form-container sign-in'>
                <form onSubmit={handleSubmit(handleLogin)} noValidate>
                    <h1 id='login-title'>Inicio de sesión</h1>

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
                                    value: /^[a-zA-Z0-9._%+-]+@gmail.com$/,
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

                    {/* Password Field */}
                    <div className={'input-wrapper'}>
                        <LockIcon />
                        <input
                            id='password'
                            type='password'
                            placeholder='Contraseña'
                            className='input-field'
                            {...register('password', {
                                required: 'La contraseña es requerida',
                                minLength: {
                                    value: 8,
                                    message: 'La contraseña debe tener al menos 8 caracteres',
                                },
                            })}
                        />
                    </div>
                    {errors.password && (
                        <div className="error-message">
                            {errors.password.message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" id='sign-button'>
                        <LoginIcon /> Iniciar sesión
                    </button>

                </form>
            </div>
        </>
    )
}

SignIn.propTypes = {
    switchToSignUp: PropTypes.func.isRequired,
}

export default SignIn
