import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import DevicesIcon from '@mui/icons-material/Devices';
import { Link } from 'react-router-dom';
import './sidebar.css';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from '@mui/icons-material/Category';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ConstructionIcon from '@mui/icons-material/Construction';
import RoomIcon from '@mui/icons-material/Room';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MapIcon from '@mui/icons-material/Map';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import FitbitIcon from '@mui/icons-material/Fitbit';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import PropTypes from 'prop-types';


const Sidebar = ({ role }) => {

    return (
        <ul className="navbar-nav bg-custom sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/app">
                {/*<div className="logo-container">
                    <img className="small-logo" src='/logo_3_lightblue.png' alt="IMPACT LOGO"/>
                </div>*/}

                <div>
                    <img src="/NEW_IMPACT_REDUCE_BLUE_LOGO.png" alt="Escudo IMPACT" className="impact-img-side" />
                </div>
                <div className="sidebar-brand-text mx-3">IMPACT 
                </div>
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
                            <Link className="collapse-item" to="/app/assetSubCategoryManagement"><DragIndicatorIcon/> Subcategoría</Link>
                            <Link className="collapse-item" to="/app/supplierManagement"><LocalShippingIcon/> Proveedor</Link>

                            <Link className="collapse-item" to="/app/assetCategoryManagement"><CategoryIcon/> Categoría</Link>
                            <Link className="collapse-item" to="/app/assetModelManagement"><ScatterPlotIcon/> Modelos</Link>
                            <Link className="collapse-item" to="/app/brandManagement"><LocalOfferIcon icon={faPlus} /> Marca</Link>
                            <Link className="collapse-item" to="/app/spaceEquipmentManagement"><ConstructionIcon/> Equipo Tecnológico</Link>
                            <Link className="collapse-item" to="/app/assetLoan"><CreditScoreIcon /> Solicitud</Link>
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
                            <Link className="collapse-item" to="/app/assetLoan"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud</Link>
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
                            <Link className="collapse-item" to="/app/spaceManagement"><RoomIcon /> Espacios</Link>

                            <Link className="collapse-item" to="/app/locationTypeManagement"><MapIcon/> Tipo de Ubicación</Link>
                            <Link className="collapse-item" to="/app/locationNumberManagement"><FmdGoodIcon/> Número de Ubicación</Link>
                            <Link className="collapse-item" to="/app/buildingManagement"><AccountBalanceIcon /> Edificio</Link>
                            <Link className="collapse-item" to="/app/buildingLocationManagement"><LocalConvenienceStoreIcon /> Pisos de Edificio </Link>

                            <Link className="collapse-item" to="/app/spaceLoan"><CreditScoreIcon/> Solicitud de Espacios</Link>
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
                            <Link className="collapse-item" to="/app/spaceLoan"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud de Espacios</Link>
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
                            <Link className="collapse-item" to="/app/productManagement"><ProductionQuantityLimitsIcon /> Productos</Link>

                            <Link className="collapse-item" to="/app/productCategoryManagement"><CategoryIcon/> Categoría</Link>
                            <Link className="collapse-item" to="/app/productCategoryTypeManagement"><FitbitIcon/> Tipo de Categoría</Link>
                            <Link className="collapse-item" to="/app/productLoan"><CreditScoreIcon /> Solicitud</Link>

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
                            <Link className="collapse-item" to="/app/productLoan"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud</Link>
                         </div>
                    </div>
                </li>
            )}

            <hr className="sidebar-divider" />

            <div className="sidebar-heading" id="complementos-heading">
                Historial
            </div>

            {/* Historial Section */}
            {(role === 'MANAGER' || role === 'ADMINISTRATOR' || role === 'TEACHER') && (
                <li className="nav-item" id="misSolicitudes-item">
                    <a
                        className="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#collapseMisSolicitudes"
                        aria-expanded="false"
                        aria-controls="collapseMisSolicitudes"
                    >
                        <i className="fas fa-fw fa-clipboard-list"></i>
                        <span>Solicitudes</span>
                    </a>
                    <div id="collapseMisSolicitudes" className="collapse" aria-labelledby="headingMisSolicitudes" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/app/myRequest">
                                <i className="fas fa-fw fa-list-ol"></i> Mis Solicitudes </Link>
                            {(role === 'MANAGER' || role === 'ADMINISTRATOR') && (
                                <>
                                    <Link className="collapse-item" to="/app/allRequest">
                                        <i className="fas fa-fw fa-bars"></i> Todas las solicitudes
                                    </Link>
                                    <Link className="collapse-item" to="/app/requestManagement">
                                        <i className="fas fa-fw fa-list-check"></i> Gestión de Solicitudes
                                    </Link>
                                    <Link className="collapse-item" to="/app/assetRenewalTable">
                                        <i className="fas fa-fw fa-clock-rotate-left"></i> Solicitudes de Renovación
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </li>
            )}



            {/*<li className="nav-item" id="charts-item">
                <Link className="nav-link" to="/charts">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Gráficos</span>
                </Link>
            </li>*/}

            {(role === 'MANAGER' || role === 'ADMINISTRATOR') && (
                <div>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-heading" id="complementos-heading">
                        Administrativo
                    </div>
                    <li className="nav-item" id="user-item">
                        <Link className="nav-link" to="/app/userTable">
                            <i className="fas fa-fw fa-users"></i>
                            <span>Gestión de usuarios</span>
                        </Link>
                    </li>
                </div>
            )}
            <hr className="sidebar-divider" />

            {/* Checkbox oculto para controlar la animación */}
            <input type="checkbox" id="toggle-info" className="sidebar-checkbox" />

            {/* Ícono para mostrar/ocultar información */}
            <label htmlFor="toggle-info" className="sidebar-toggle">

                <i className="fa-solid fa-angle-down sidebar-icon" style={{color: '#d3d3d3', fontSize: '20px'}}></i>
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
