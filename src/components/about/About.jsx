import { Link } from 'react-router-dom';
import './about.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>Sobre Nosotros</h1>
            <p>
                ¡Bienvenido a la página de Sobre Nosotros de nuestra aplicación! Nos dedicamos a ofrecer el mejor servicio y experiencia de usuario.
                Nuestro equipo está apasionado por construir soluciones de software de alta calidad que cumplan con las necesidades de nuestros clientes y usuarios.
            </p>
            <p>
                Nuestra misión es ofrecer productos innovadores y confiables que ayuden a agilizar y mejorar tus tareas diarias.
                Nos esforzamos continuamente por mejorar nuestros servicios y adaptarnos a las demandas cambiantes del mercado.
            </p>
            <p>
                Gracias por visitar nuestra página de Sobre Nosotros. Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros.
            </p>
            <Link to="/auth" className="login-button">Comenzar!</Link>
        </div>
    );
};

export default About;
