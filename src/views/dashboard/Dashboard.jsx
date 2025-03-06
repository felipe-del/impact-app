import { Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faBuilding, faClipboardList, faComments, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import AreaChart from '../../components/chart/AreaChart';
import './dashboard.css'
import {useRef, useState} from "react";
import useInventoryValueData from "../../hooks/apiData/inventoryValue/inventoryValueData.jsx";
import {Box, Typography} from "@mui/material";

const initialData = {
    startDate: '',
    endDate: '',
    inventoryValueUSD: '',
    assetQuantityUSD: '',
    inventoryValueCRC: '',
    assetQuantityCRC: ''
};

const today = new Date();
const todayDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
}

const Dashboard = () => {

    const [formData, setFormData] = useState(initialData);
    const [fetchData, setFetchData] = useState(false);
    const formRef = useRef(null);

    const {inventoryValue} = useInventoryValueData({
        startDate: formData.startDate,
        endDate: formData.endDate,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const inventoryValueAllTime = () => {
        const pad = (num) => num.toString().padStart(2, '0');
        const formattedEndDate = `${todayDate.year}-${pad(todayDate.month)}-${pad(todayDate.day)}`;

        setFormData(prevData => ({
            ...prevData,
            startDate: '1997-01-01',
            endDate: formattedEndDate,
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFetchData(true); // Set flag to true to trigger data fetching
    };

    // Sample data for demonstration purposes
    const productsCount = 120;
    const assetsCount = 75;
    const spacesCount = 30;
    const pendingRequestsCount = 18;


    return (
        <div>
            {/* Page Heading
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

            <div className="row d-flex align-items-stretch">
                <div className="col-xl-8 col-lg-8 col-md-12">
                    <Card className="shadow mb-4 h-100">
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

                <div className="col-xl-4 col-lg-4 col-md-12">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Valor del inventario</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Encabezado del Menú:</div>
                                        <a className="dropdown-item" href="#" onClick={inventoryValueAllTime}>Valor total del inventario</a>
                                        <a className="dropdown-item" href="#">Otra acción</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Algo más aquí</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="">
                                <div className="mt-0">
                                    <form ref={formRef}>
                                        <div className="">
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="startDate" className="form-label">
                                                        <i className="fas fa-calendar-alt"></i> Fecha inicial
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="startDate"
                                                        id="startDate"
                                                        className="form-control border-primary"
                                                        value={formData.startDate}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="endDate" className="form-label">
                                                        <i className="fas fa-calendar-alt"></i> Fecha final
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="endDate"
                                                        id="endDate"
                                                        className="form-control border-primary"
                                                        value={formData.endDate}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <h4 className="text-center">Información del valor del inventario</h4>
                                                </div>
                                                {inventoryValue?.data?.length ? (<>
                                                        <div className="col">
                                                            <Box
                                                                sx={{
                                                                    background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                                                                    padding: '8px',
                                                                    borderRadius: '10px',
                                                                    textAlign: 'left',
                                                                    boxShadow: '0px 2px 5px rgba(255, 255, 255, 0.1)',
                                                                    transition: '0.3s ease-in-out',
                                                                    '&:hover': {
                                                                        transform: 'scale(1.03)',
                                                                        boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.3)',
                                                                    },
                                                                }}
                                                            >
                                                                <div>
                                                                    <Typography sx={{
                                                                        fontWeight: 'bold',
                                                                        color: '#f8f9fa',
                                                                        fontFamily: '"Montserrat", sans-serif'
                                                                    }}> Valor total del inventario en
                                                                        cólones </Typography>
                                                                    <Typography sx={{
                                                                        fontFamily: '"Montserrat", sans-serif',
                                                                        color: '#f8f9fa'
                                                                    }}>
                                                                        {inventoryValue?.data[1]?.currency?.symbol}{inventoryValue?.data[1]?.amount}
                                                                    </Typography>
                                                                </div>
                                                                <div className="mt-5">
                                                                    <Typography sx={{
                                                                        fontWeight: 'bold',
                                                                        color: '#f8f9fa',
                                                                        fontFamily: '"Montserrat", sans-serif'
                                                                    }}> Cantidad de activos con su valor en
                                                                        cólones </Typography>
                                                                    <Typography sx={{
                                                                        fontFamily: '"Montserrat", sans-serif',
                                                                        color: '#f8f9fa'
                                                                    }}>
                                                                        {inventoryValue?.data[1]?.quantity}
                                                                    </Typography>
                                                                </div>
                                                            </Box>
                                                        </div>
                                                        <div className="col">
                                                            <Box
                                                                sx={{
                                                                    background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                                                                    padding: '8px',
                                                                    borderRadius: '10px',
                                                                    textAlign: 'left',
                                                                    boxShadow: '0px 2px 5px rgba(255, 255, 255, 0.1)',
                                                                    transition: '0.3s ease-in-out',
                                                                    '&:hover': {
                                                                        transform: 'scale(1.03)',
                                                                        boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.3)',
                                                                    },
                                                                }}
                                                            >
                                                                <div>
                                                                    <Typography sx={{
                                                                        fontWeight: 'bold',
                                                                        color: '#f8f9fa',
                                                                        fontFamily: '"Montserrat", sans-serif'
                                                                    }}> Valor del inventario en dólares </Typography>
                                                                    <Typography sx={{
                                                                        fontFamily: '"Montserrat", sans-serif',
                                                                        color: '#f8f9fa'
                                                                    }}>
                                                                        {inventoryValue?.data[0]?.currency?.symbol}{inventoryValue?.data[0]?.amount}
                                                                    </Typography>
                                                                </div>
                                                                <div className="mt-5">
                                                                    <Typography sx={{
                                                                        fontWeight: 'bold',
                                                                        color: '#f8f9fa',
                                                                        fontFamily: '"Montserrat", sans-serif'
                                                                    }}> Cantidad de activos con su valor en
                                                                        dólares </Typography>
                                                                    <Typography sx={{
                                                                        fontFamily: '"Montserrat", sans-serif',
                                                                        color: '#f8f9fa'
                                                                    }}>
                                                                        {inventoryValue?.data[0]?.quantity}
                                                                    </Typography>
                                                                </div>
                                                            </Box>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <Box
                                                            sx={{
                                                                background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                                                                padding: '2em',
                                                                borderRadius: '10px',
                                                                textAlign: 'left',
                                                                boxShadow: '0px 2px 5px rgba(255, 255, 255, 0.1)',
                                                                transition: '0.3s ease-in-out',
                                                                '&:hover': {
                                                                    boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.3)',
                                                                },
                                                            }}
                                                        >
                                                                <Typography sx={{
                                                                    fontWeight: 'bold',
                                                                    color: '#f8f9fa',
                                                                    fontFamily: '"Montserrat", sans-serif',
                                                                    fontSize: '2.5rem',
                                                                    textAlign: 'center'
                                                                }}> Seleccione una fecha </Typography>
                                                        </Box>
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-12 mb-4 mt-4">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <h6 className="m-2 font-weight-bold text-primary">Préstamos del último mes</h6>
                        </Card.Header>
                        <Card.Body>
                            <h4 className="small font-weight-bold mb-1">Activos <span className="float-right">20%</span>
                            </h4>
                            <ProgressBar now={34} variant="danger" className="mb-2"/>
                            <h4 className="small font-weight-bold mb-1">Productos <span
                                className="float-right">40%</span></h4>
                            <ProgressBar now={47} variant="warning" className="mb-2"/>
                            <h4 className="small font-weight-bold mb-1">Espacios <span
                                className="float-right">40%</span></h4>
                            <ProgressBar now={11} variant="info" className="mb-2"/>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Content Row */}
            <div className="row">
                {/*<div className="col-lg-6 mb-4">
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
                </div>*/}
            </div>
        </div>
    );
};

export default Dashboard;