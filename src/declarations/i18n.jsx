import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                loginPage: {
                    login_message: "Log In",
                    noAccount_message: "Don't have an account?",
                    email_label: "Academic email address",
                    password_label: "Password",
                    signIn_label: "Sign in",
                    userManual_label: "User Manual",
                    register_label: "Register",
                    name_label: "Name",
                }
            }
        },
        es: {
            translation: {
                loginPage: {
                    login_message: "Inicio de Sesión",
                    noAccount_message: "No tienes una cuenta registrada?",
                    email_label: "Correo electrónico institucional",
                    password_label: "Contraseña",
                    signIn_label: "Iniciar sesión",
                    userManual_label: "Manual de usuario",
                    register_label: "Registrarme",
                    name_label: "Nombre",
                }
            }
        },
    },
    lng: navigator.language.split('-')[0],
    fallbackLng: 'es',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
