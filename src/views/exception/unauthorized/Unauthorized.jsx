import { Link } from "react-router-dom";
import "./unauthorized.css";

const Unauthorized = () => {
    return (
        <div className="unauthorized-page-container">
            <div className="unauthorized-page-content">
                <img src="/IMPACT_BLACK_LOGO.png" alt="IMPACT LOGO" className="unauthorized-page-logo" />
                <h1 className="unauthorized-page-heading">Acceso Denegado</h1>
                <p className="unauthorized-page-description">
                    No tienes los permisos necesarios para acceder a esta página.
                    Si crees que esto es un error, por favor contacta con un administrador.
                </p>
                <Link to="#" onClick={() => window.history.back()} className="unauthorized-page-button">Regresar</Link>
            </div>
        </div>
    );
};

export default Unauthorized;
