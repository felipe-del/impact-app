import { useEffect } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faChartLine, faBuilding, faClipboardList, faComments, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import AreaChart from '../../components/chart/AreaChart';
import PieChart from '../../components/chart/PieChart';
import { usePage } from '../../context/pageContext';

const Dashboard = () => {
    // Sample data for demonstration purposes
    const productsCount = 120;
    const assetsCount = 75;
    const spacesCount = 30;
    const pendingRequestsCount = 18;
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Panel"); // Update as necessary
    }, [setPageName]);

    return (
        <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0" style={{ color: '#005da4' }}>Tablero de Control</h1>

                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <FontAwesomeIcon icon={faChartLine} className="text-white-50" /> Generar Reporte
                </a>
            </div>

            {/* Content Row */}
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-primary shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total de Productos
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{productsCount}</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faBox} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-success shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Total de Activos
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{assetsCount}</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faBuilding} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-info shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total de Espacios</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{spacesCount}</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faClipboardList} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <Card className="border-left-warning shadow h-100 py-2">
                        <Card.Body>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Solicitudes Pendientes
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{pendingRequestsCount}</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faComments} className="fa-2x text-gray-300" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Content Row */}
            <div className="row">
                <div className="col-xl-8 col-lg-7">
                    <Card className="shadow mb-4">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Resumen de Activos</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Encabezado del Menú:</div>
                                        <a className="dropdown-item" href="#">Acción</a>
                                        <a className="dropdown-item" href="#">Otra acción</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Algo más aquí</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area mb-4">
                                <AreaChart />
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-4 col-lg-5">
                    <Card className="shadow mb-4">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Resumen de Productos</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Encabezado del Menú:</div>
                                        <a className="dropdown-item" href="#">Acción</a>
                                        <a className="dropdown-item" href="#">Otra acción</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Algo más aquí</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-pie pt-4 pb-2">
                                <PieChart />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Content Row */}
            <div className="row">
            <div className="col-lg-6 mb-4">
                <Card className="shadow mb-4">
                    <Card.Header>
                        <h6 className="m-2 font-weight-bold text-primary">Préstamos del utlimos mes</h6>
                    </Card.Header>
                    <Card.Body>
                        <h4 className="small font-weight-bold mb-1">Activos <span className="float-right">20%</span></h4>
                        <ProgressBar now={20} variant="danger" className="mb-2" />
                        <h4 className="small font-weight-bold mb-1">Productos <span className="float-right">40%</span></h4>
                        <ProgressBar now={40} variant="warning" className="mb-2" />
                    </Card.Body>
                </Card>
            </div>
                <div className="col-lg-6 mb-4">
                    <Card className="shadow mb-4">
                        <Card.Header>
                            <h6 className="m-0 font-weight-bold text-primary">Resumen de Tareas</h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="todo-list">
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Tarea 1</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Tarea 2</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Tarea 3</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Tarea 4</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
