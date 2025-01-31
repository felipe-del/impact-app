import { Link } from 'react-router-dom';
import './about.css';

const About = () => {
    return (
        <div className="about-page-container">
            <div className="about-page-content">
                <img src="/IMPACT_BLACK_LOGO.png" alt="IMPACT LOGO" className="about-page-logo" />
                <h1 className="about-page-heading">¡Bienvenido!</h1>
                <p className="about-page-description">
                    Gracias por visitar nuestra página. Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros.
                </p>
                <Link to="/auth" className="about-page-button">Comenzar!</Link>
            </div>
        </div>
    );
};

export default About;
