import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './signIn.css'

import PropTypes from 'prop-types'
import {login} from '../../api/Auth_API.js';
import {toast} from "sonner";


const SignIn = ({ switchToSignUp }) => {

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
            console.log(error)
            toast.error(error.response)
        }
    }

    return (
        <>
            <div className='form-container sign-in'>
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    noValidate>
                    <h1>Inicio de sesión</h1>
                    <input
                        id='email'
                        type='email'
                        placeholder='Correo electrónico institucional'
                        className='input-field'
                        {...register('email', {
                            required: 'El correo electrónico es requerido',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@gmail.com$/,
                                message: 'El correo electrónico no es válido'
                            },
                        })}
                    />
                    {errors.email && (
                        <div className="error-message">
                            {errors.email.message}
                        </div>
                    )}
                    <input
                        id='password'
                        type="password"
                        placeholder="Contraseña"
                        className="input-field"
                        {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener al menos 8 caracteres'
                            },
                        })}
                    />
                    {errors.password && (
                        <div className="error-message">
                            {errors.password.message}
                        </div>
                    )}
                    <button type="submit">Iniciar sesión</button>
                    <button className="hidden" onClick={switchToSignUp} id="login">Sign Up</button>
                </form>
            </div>
        </>
    );
};

SignIn.propTypes = {
    switchToSignUp: PropTypes.func.isRequired
};

export default SignIn;
