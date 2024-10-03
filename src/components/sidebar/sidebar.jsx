import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faClipboardCheck, faMapMarkedAlt, faHashtag, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../style/sb-admin-2.min.css';
import './sidebar.css';
import { Escudo_UCR } from '../../declarations/imageExports.js';

const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-custom sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-clipboard-list"></i>
                </div>
                <div className="sidebar-brand-text mx-3">IMPACT <sup>BETA</sup></div>
            </a>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active" id="dashboard-item">
                <Link className="nav-link" to="/app/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Panel</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />

            <div className="sidebar-heading" id="complementos-heading">
                Complementos
            </div>

            {/* Activos Section */}
            <li className="nav-item" id="activos-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseActivos"
                    aria-expanded="true" aria-controls="collapseActivos">
                    <i className="fas fa-fw fa-desktop"></i>
                    <span>Activos</span>
                </a>
                <div id="collapseActivos" className="collapse" aria-labelledby="headingActivos" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                    <Link className="collapse-item" to="/app/createAsset"><FontAwesomeIcon icon={faPlus} /> Activo
                    </Link><Link className="collapse-item" to="/app/addSupplier"><FontAwesomeIcon icon={faPlus} /> Proveedor
                    </Link><Link className="collapse-item" to="/app/addBrand"><FontAwesomeIcon icon={faPlus} /> Marca
                    </Link><Link className="collapse-item" to="/app/addCategory"><FontAwesomeIcon icon={faPlus} /> Categoría
                    </Link><Link className="collapse-item" to="/app/addAssetModel"><FontAwesomeIcon icon={faPlus} /> Modelos</Link>
                    <Link className="collapse-item" to="/app/addSubcategory"><FontAwesomeIcon icon={faPlus} /> Subcategoría</Link>
                    <Link className="collapse-item" to="/app/addLocationType"><FontAwesomeIcon icon={faMapMarkedAlt} /> Tipo de Locación</Link>
                    <Link className="collapse-item" to="/app/addLocationNumber"><FontAwesomeIcon icon={faHashtag} /> Número de Locación</Link>
                    <Link className="collapse-item" to="/app/assetLoanRequest"><FontAwesomeIcon icon={faClipboardCheck} /> Solicitud</Link>
                    <Link className="collapse-item" to="/app/assetList"><FontAwesomeIcon icon={faList} /> Activos</Link>
                    </div>
                </div>
            </li>

            {/* Espacios Comunes Section */}
            <li className="nav-item" id="espacios-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEspacios"
                    aria-expanded="true" aria-controls="collapseEspacios">
                    <i className="fas fa-fw fa-building"></i>
                    <span>Espacios Comunes</span>
                </a>
                <div id="collapseEspacios" className="collapse" aria-labelledby="headingEspacios" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        
                        <Link className="collapse-item" to="/app/addBuilding"><FontAwesomeIcon icon={faPlus} /> Registro de Edificios</Link>
                        <Link className="collapse-item" to="/app/addBuildingLocation"><FontAwesomeIcon icon={faPlus} /> Ubicación en Edificio</Link>
                        <Link className="collapse-item" to="/app/addSpace"><FontAwesomeIcon icon={faPlus} /> Registro de Espacios</Link>
                        <Link className="collapse-item" to="/app/editSpace"><FontAwesomeIcon icon={faPenToSquare}/> Edicion de Espacios</Link>
                        <Link className="collapse-item" to="/app/spaceRequest"><FontAwesomeIcon icon={faClipboardCheck}/> Solicitud de Espacios</Link>
                        <Link className="collapse-item" to="/app/spaceList"><FontAwesomeIcon icon={faList} /> Espacios</Link>

                    </div>
                </div>
            </li>

            {/* Productos Section */}
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

            <hr className="sidebar-divider" />

            <div className="sidebar-heading" id="complementos-heading">
                Visuales
            </div>

            <li className="nav-item" id="charts-item">
                <Link className="nav-link" to="/charts">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Gráficos</span>
                </Link>
            </li>

            <li className="nav-item" id="tables-item">
                <Link className="nav-link" to="/tables">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tablas</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />

           
            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2 img-fluid" src={Escudo_UCR} alt="Escudo de la Universidad" />
                <p className="text-center mb-2"><strong>Conoce más sobre CIMPA</strong> y su impacto en nuestros proyectos y en la comunidad.</p>
                <a className="btn btn-info btn-sm" href="https://www.cimpa.ucr.ac.cr/" target="_blank" rel="noopener noreferrer">Visita el sitio web de CIMPA</a>
            </div>
        </ul>
    );
}

export default Sidebar;
