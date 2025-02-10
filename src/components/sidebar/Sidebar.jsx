import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faClipboardCheck, faMapMarkedAlt, faHashtag, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import DevicesIcon from '@mui/icons-material/Devices';
import { Link } from 'react-router-dom';
import './sidebar.css';

import PropTypes from 'prop-types';


const Sidebar = ({ role }) => {

    return (
        <ul className="navbar-nav bg-custom sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/app">
                {/*<div className="logo-container">
                    <img className="small-logo" src='/logo_3_lightblue.png' alt="IMPACT LOGO"/>
                </div>*/}

                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-clipboard-list"></i>
                </div>
                <div className="sidebar-brand-text mx-3">IMPACT <sup>BETA</sup></div>
            </a>

            <hr className="sidebar-divider my-0"/>

            <li className="nav-item active" id="dashboard-item">
            <Link className="nav-link" to="/app/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Panel</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />

            <div className="sidebar-heading" id="complementos-heading">
                Recursos del Sistema
            </div>

            {/* Activos Section */}
            {(role === 'MANAGER' || role === 'ADMINISTRATOR') && (
                <li className="nav-item" id="activos-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseActivos"
                       aria-expanded="true" aria-controls="collapseActivos">
                        <i className="fas fa-fw fa-desktop"></i>
                        <span>Activos</span>
                    </a>
                    <div id="collapseActivos" className="collapse" aria-labelledby="headingActivos" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/app/assetTable"><DevicesIcon/> Activo</Link>
                            <Link className="collapse-item" to="/app/addSupplier"><FontAwesomeIcon icon={faPlus} /> Proveedor</Link>
                            <Link className="collapse-item" to="/app/addBrand"><FontAwesomeIcon icon={faPlus} /> Marca</Link>
                            <Link className="collapse-item" to="/app/addCategory"><FontAwesomeIcon icon={faPlus} /> Categoría</Link>
                            <Link className="collapse-item" to="/app/addAssetModel"><FontAwesomeIcon icon={faPlus} /> Modelos</Link>
                            <Link className="collapse-item" to="/app/addSubcategory"><FontAwesomeIcon icon={faPlus} /> Subcategoría</Link>
                            <Link className="collapse-item" to="/app/addSpaceEquipment"><FontAwesomeIcon icon={faPlus} /> Equipo Tecnológico</Link>
                            <Link className="collapse-item" to="/app/addLocationType"><FontAwesomeIcon icon={faMapMarkedAlt} /> Tipo de Ubicación</Link>
                            <Link className="collapse-item" to="/app/addLocationNumber"><FontAwesomeIcon icon={faHashtag} /> Número de Ubicación</Link>
                            <Link className="collapse-item" to="/app/assetLoanRequest"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud</Link>
                            <Link className="collapse-item" to="/app/assetList"><FontAwesomeIcon icon={faList} /> Activos</Link>
                        </div>
                    </div>
                </li>
            )}

            {/* Activos Section */}
            {(role === 'TEACHER') && (
                <li className="nav-item" id="activos-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseActivos"
                       aria-expanded="true" aria-controls="collapseActivos">
                        <i className="fas fa-fw fa-desktop"></i>
                        <span>Activos</span>
                    </a>
                    <div id="collapseActivos" className="collapse" aria-labelledby="headingActivos" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/app/assetLoanRequest"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud</Link>
                        </div>
                    </div>
                </li>
            )}

            {/* Espacios Comunes Section */}
            {(role === 'MANAGER' || role === 'ADMINISTRATOR') && (
                <li className="nav-item" id="espacios-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEspacios"
                       aria-expanded="true" aria-controls="collapseEspacios">
                        <i className="fas fa-fw fa-building"></i>
                        <span>Espacios</span>
                    </a>
                    <div id="collapseEspacios" className="collapse" aria-labelledby="headingEspacios" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/app/addBuilding"><FontAwesomeIcon icon={faPlus} /> Registro de Edificios</Link>
                            <Link className="collapse-item" to="/app/addBuildingLocation"><FontAwesomeIcon icon={faPlus} /> Ubicación en Edificio</Link>
                            <Link className="collapse-item" to="/app/addSpace"><FontAwesomeIcon icon={faPlus} /> Registro de Espacios</Link>
                            <Link className="collapse-item" to="/app/editSpace"><FontAwesomeIcon icon={faPenToSquare} /> Edición de Espacios</Link>
                            <Link className="collapse-item" to="/app/spaceRequest"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud de Espacios</Link>
                            <Link className="collapse-item" to="/app/spaceList"><FontAwesomeIcon icon={faList} /> Espacios</Link>
                        </div>
                    </div>
                </li>
            )}

            {/* Espacios Comunes Section */}
            {(role === 'TEACHER') && (
                <li className="nav-item" id="espacios-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEspacios"
                       aria-expanded="true" aria-controls="collapseEspacios">
                        <i className="fas fa-fw fa-building"></i>
                        <span>Espacios</span>
                    </a>
                    <div id="collapseEspacios" className="collapse" aria-labelledby="headingEspacios" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/app/spaceRequest"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud de Espacios</Link>
                        </div>
                    </div>
                </li>
            )}


            {/* Productos Section */}
            {(role === 'MANAGER' || role === 'ADMINISTRATOR') && (
                <li className="nav-item" id="productos-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProductos"
                       aria-expanded="true" aria-controls="collapseProductos">
                        <i className="fas fa-fw fa-box"></i>
                        <span>Productos</span>
                    </a>
                    <div id="collapseProductos" className="collapse" aria-labelledby="headingProductos" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/app/categoryRegister"><FontAwesomeIcon icon={faPlus} /> Categoría</Link>
                            <Link className="collapse-item" to="/app/productRegister"><FontAwesomeIcon icon={faPlus} /> Productos</Link>
                            <Link className="collapse-item" to="/app/productLoanRequest"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud</Link>
                            <Link className="collapse-item" to="/app/productList"><FontAwesomeIcon icon={faList} /> Productos</Link>
                            <Link className="collapse-item" to="/app/inventoryList"><FontAwesomeIcon icon={faList} /> Inventario</Link>
                        </div>
                    </div>
                </li>
            )}

            {/* Productos Section */}
            {(role === 'TEACHER') && (
                <li className="nav-item" id="productos-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProductos"
                       aria-expanded="true" aria-controls="collapseProductos">
                        <i className="fas fa-fw fa-box"></i>
                        <span>Productos</span>
                    </a>
                    <div id="collapseProductos" className="collapse" aria-labelledby="headingProductos" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/app/productLoanRequest"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud</Link>
                         </div>
                    </div>
                </li>
            )}

            <hr className="sidebar-divider" />

            <div className="sidebar-heading" id="complementos-heading">
                Administrativo
            </div>

            {/*<li className="nav-item" id="charts-item">
                <Link className="nav-link" to="/charts">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Gráficos</span>
                </Link>
            </li>*/}

            {(role === 'MANAGER' || role === 'ADMINISTRATOR') && (
            <li className="nav-item" id="user-item">
                <Link className="nav-link" to="/app/userTable">
                    <i className="fas fa-fw fa-users"></i>
                    <span>Gestión de usuarios</span>
                </Link>
            </li>

            )}
            <hr className="sidebar-divider" />

            {/* Checkbox oculto para controlar la animación */}
            <input type="checkbox" id="toggle-info" className="sidebar-checkbox" />

            {/* Ícono para mostrar/ocultar información */}
            <label htmlFor="toggle-info" className="sidebar-toggle">
                <i className="fa-solid fa-caret-down" style={{ color: '#d3d3d3', fontSize: '20px'}}></i>
            </label>

            <div className="sidebar-card">
                <img className="sidebar-card-illustration img-fluid" src="/Escudo_UCR.png" alt="Escudo de la Universidad" />
                <p className="text-center"><strong>Conoce más sobre CIMPA</strong> y su impacto en nuestros proyectos y en la comunidad.</p>
                <a className="btn btn-info btn-sm" href="https://www.cimpa.ucr.ac.cr/" target="_blank" rel="noopener noreferrer">
                    Visita el sitio web de CIMPA
                </a>
            </div>


        </ul>
    );
}

Sidebar.propTypes = {
    role: PropTypes.string.isRequired,
};

export default Sidebar;
