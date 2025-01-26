import { useState } from 'react';
import PropTypes from 'prop-types';
import GenericModal from "../popUp/generic/GenericModal.jsx";
import {logout} from "../../api/Auth_API.js";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const TopBar = ({ userName }) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const jwtToken = localStorage.getItem('AUTH_TOKEN');
            const response = await logout(jwtToken);
            localStorage.removeItem('AUTH_TOKEN');
            toast.success(response.message);
            navigate('/')
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


            {/* Sidebar Toggle (TopBar) */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            <span className="navbar-text mr-auto d-none d-md-block">
                Welcome, {userName}!
            </span>
            {/* TopBar Navbar */}
            <ul className="navbar-nav ml-auto">
                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    {/* Dropdown - Messages */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                {/* Nav Item - Messages */}
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw"></i>
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                    {/* Dropdown - Messages */}
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">Message Center</h6>
                        {/* Message items here... */}
                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="img-profile rounded-circle" src='/undraw_profile.svg' alt="Profile" />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Perfil
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Configuración
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Registro de Actividad
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" onClick={handleShowModal}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Cerrar Sesión
                        </a>
                    </div>
                </li>
            </ul>

            <GenericModal
                show={showModal}
                onHide={handleHideModal}
                title="¿Estás seguro de que deseas cerrar sesión?"
                bodyText="Si cierras sesión, tendrás que volver a introducir tus credenciales para acceder de nuevo."
                buttonText="Cerrar Sesión"
                onButtonClick={handleLogout}
            />
        </nav>
    );
};

TopBar.propTypes = {
    userName: PropTypes.string,
};

export default TopBar;