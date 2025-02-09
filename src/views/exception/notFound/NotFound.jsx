import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => {
    return (
        <div className="notfound-page-container">
            <div className="notfound-page-content">
                <img src="/IMPACT_BLACK_LOGO.png" alt="IMPACT LOGO" className="notfound-page-logo" />
                <h1 className="notfound-page-heading">¡Oops! Página No Encontrada</h1>
                <p className="notfound-page-description">
                    Lo sentimos, pero la página que estás buscando no existe. Es posible que hayas ingresado una URL incorrecta o que la página haya sido movida.
                </p>
                <Link to="#" onClick={() => window.history.back()} className="notfound-page-button">Regresar</Link>
            </div>
        </div>
    );
};

export default NotFound;
