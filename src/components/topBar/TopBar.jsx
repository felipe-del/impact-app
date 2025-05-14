/**
 * TopBar Component
 * 
 * This component renders the top navigation bar of the application.
 * It includes the user's name, role, and a dropdown menu for user actions.
 * It also includes a logout confirmation modal.
 * The component uses Bootstrap for styling and layout.
 * It is used in the main application layout.
 * The component is responsive and adapts to different screen sizes.
 */
import { useState } from 'react';
import PropTypes from 'prop-types';
import GenericModal from "../popUp/generic/GenericModal.jsx";
import {logout} from "../../api/auth/auth_API.js";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {capitalizeFirstLetter} from "../../util/StringUtils.js";

/**
 * TopBar React component.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.user - User object containing user information.
 * @param {string} props.user.userName - The user's username.
 * @param {string} props.user.name - The user's name.
 * @param {Object} props.user.userRoleResponse - The user's role information.
 * @param {string} props.user.userRoleResponse.roleName - The name of the user's role.
 * @returns {JSX.Element} The rendered TopBar component.
 */
const TopBar = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);
    const navigate = useNavigate()

    /**
     * Handles the logout action.
     * Removes the authentication token from local storage and redirects to the home page.
     * 
     * @returns {Promise<void>} - A promise that resolves when the logout action is completed.
     */
    const handleLogout = async () => {
        try {
            const jwtToken = localStorage.getItem('AUTH_TOKEN');
            const response = await logout(jwtToken);
            localStorage.removeItem('AUTH_TOKEN');
            toast.success(response.message, { icon: '🔒'});
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
                {capitalizeFirstLetter(user.userRoleResponse.roleName)} - {user.name}
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

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="img-profile rounded-circle" src='/undraw_profile.svg' alt="Profile" />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <Link className="dropdown-item" to="/app/profile">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Perfil
                        </Link>
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
                onButtonClick={handleLogout}
            />
        </nav>
    );
};

TopBar.propTypes = {
    user: PropTypes.shape({
        userName: PropTypes.string,
        name: PropTypes.string.isRequired,
        userRoleResponse: PropTypes.shape({
            roleName: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default TopBar;