import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/sb-admin-2.min.css';
import './sidebar.css';
import { Escudo_UCR } from '../../declarations/imageExports.js'

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

            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Panel</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Interface
            </div>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                   aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Componentes</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <Link className="collapse-item" to="/buttons">Buttons</Link>
                        <Link className="collapse-item" to="/cards">Cards</Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                   aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Útiles</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <Link className="collapse-item" to="/utilities-color">Colors</Link>
                        <Link className="collapse-item" to="/utilities-border">Borders</Link>
                        <Link className="collapse-item" to="/utilities-animation">Animations</Link>
                        <Link className="collapse-item" to="/utilities-other">Other</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Complementos
            </div>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                   aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Páginas</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Activos:</h6>
                        <Link className="collapse-item" to="/app/createAsset">Registro de activos</Link>
                        <Link className="collapse-item" to="/app/addSupplier">Agregar proveedor</Link>
                        <Link className="collapse-item" to="/app/addBrand">Agregar marca</Link>
                        <Link className="collapse-item" to="/app/addCategory">Agregar categoría</Link>
                        <Link className="collapse-item" to="/app/assetList">Lista de activos</Link>
                        <h6 className="collapse-header">Espacios comunes:</h6>
                        <Link className="collapse-item" to="/app/addBuilding">Add Building</Link>
                        <Link className="collapse-item" to="/app/addBuildingLocation">Add Building location</Link>
                        <Link className="collapse-item" to="/app/addSpaceType">Add Space-type</Link>
                        <Link className="collapse-item" to="/app/addSpace">Add Space</Link>
                        <Link className="collapse-item" to="/app/spaceList">Lista de espacios</Link>
                        <h6 className="collapse-header">Productos:</h6>
                        <Link className="collapse-item" to="/app/categoryRegister">Registro de categoría</Link>
                        <Link className="collapse-item" to="/app/productRegister">Ingreso de productos</Link>
                        <Link className="collapse-item" to="/app/productList">Lista de productos</Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
            <Link className="nav-link" to="/charts">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Gráficos</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/tables">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tablas</span>
                </Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

          

            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2 img-fluid" src={Escudo_UCR} alt="Escudo de la Universidad" />
                <p className="text-center mb-2"><strong>Conoce más sobre CIMPA</strong> y su impacto en nuestros proyectos y en la comunidad.</p>
                <a className="btn btn-info btn-sm" href="https://www.cimpa.ucr.ac.cr/" target="_blank" rel="noopener noreferrer">Visita el sitio web de CIMPA</a>
            </div>



        </ul>
    );
}

export default Sidebar;
