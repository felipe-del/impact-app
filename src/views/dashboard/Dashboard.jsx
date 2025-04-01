import {Card, ProgressBar} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBox, faBuilding, faClipboardList, faComments, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import AreaChart from '../../components/chart/AreaChart';
import BarChart from '../../components/chart/BarChart';
import ColumnChart from '../../components/chart/ColumnChart';
import ComboChart from '../../components/chart/ComboChart';
import './dashboard.css'
import {useEffect, useRef, useState} from "react";
import useInventoryValueData from "../../hooks/apiData/inventoryValue/inventoryValueData.jsx";
import {Box, Typography} from "@mui/material";
import useAssetData from '../../hooks/apiData/assetData/AssetData.jsx';
import useProductData from '../../hooks/apiData/product/productData.jsx';
import useSpaceData from '../../hooks/apiData/space/SpaceData.jsx'
import useAssetLoanData from '../../hooks/apiData/assetLoans/assetLoans.jsx';
import useProductEntryData from "../../hooks/apiData/productEntries/productEntries.jsx";
import useProductRequestStatsData from "../../hooks/apiData/productRequestStats/productRequestStats.jsx";

const today = new Date();
const pad = (num) => num.toString().padStart(2, '0');
const formattedToday = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;


const initialData = {
    startDate: '2024-03-03',
    endDate: formattedToday,
    inventoryValueUSD: '',
    assetQuantityUSD: '',
    inventoryValueCRC: '',
    assetQuantityCRC: ''
};

// Estado inicial para activos por fecha de compra
const initialAssetsByPurchaseDate = {
    startDate: '2024-03-03',
    endDate: formattedToday
};

// Estado inicial para préstamos de activos
const initialLoanDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

// Estado inicial para solicitudes de productos
const initialProductRequestsDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

// Estado inicial para ingresos de productos
const initialProductEntriesDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

// Estado inicial para comparación
const initialComparisonDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

const todayDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
}

const Dashboard = () => {

    const [formData, setFormData] = useState(initialData);
    const [assetsByPurchaseDate, setAssetsByPurchaseDate] = useState(initialAssetsByPurchaseDate);
    const [loanDates, setLoanDates] = useState(initialLoanDates);
    const [productRequestsDates, setProductRequestsDates] = useState(initialProductRequestsDates);
    const [productEntriesDates, setProductEntriesDates] = useState(initialProductEntriesDates);
    const [comparisonDates, setComparisonDates] = useState(initialComparisonDates);
    const [formErrors, setFormErrors] = useState({});
    const [fetchData, setFetchData] = useState(false);
    const formRef = useRef(null);
    const {assets} = useAssetData();
    const {products} = useProductData();
    const {spaces} = useSpaceData();
    const {assetLoans} = useAssetLoanData();
    const {productEntries} = useProductEntryData();
    const {productRequestStats} = useProductRequestStatsData();
    const totalAssets = assets?.data?.length || 0;
    const totalProducts = products?.data?.length || 0;
    const totalSpaces = spaces?.data?.length || 0;

    //console.log("asset loans:"+ assetLoans);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    const {inventoryValue} = useInventoryValueData({
        startDate: formData.startDate,
        endDate: formData.endDate,
    });

    useEffect(() => {
        
    },[assetLoans],
     [formData.startDate, formData.endDate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
        setFormErrors(prevErrors => {
            const newErrors = {...prevErrors};
            if (newErrors[name]) {
                delete newErrors[name];
            }
            return newErrors;
        });
    };
    const handleAssetsPurchaseDateChange = (e) => {
        const {name, value} = e.target;
        setAssetsByPurchaseDate(prev => ({...prev, [name]: value}));
    };

    const handleLoanDateChange = (e) => {
        const {name, value} = e.target;
        setLoanDates(prev => ({...prev, [name]: value}));
    };

    const handleProductRequestsDateChange = (e) => {
        const {name, value} = e.target;
        setProductRequestsDates(prev => ({...prev, [name]: value}));
    };

    const handleProductEntriesDateChange = (e) => {
        const {name, value} = e.target;
        setProductEntriesDates(prev => ({...prev, [name]: value}));
    };

    const handleComparisonDateChange = (e) => {
        const {name, value} = e.target;
        setComparisonDates(prev => ({...prev, [name]: value}));
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

    const checkErrors = () => {
        const errors = {};

        if (!formData.startDate) errors.startDate = "La fecha inicial es obligatoria.";
        if (!formData.endDate) errors.endDate = "La fecha final es obligatoria.";
        else if (new Date(formData.endDate) < new Date(formData.startDate)) {
            errors.endDate = "La fecha final debe ser posterior a la fecha inicial.";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            handleShowConfirmationModal();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFetchData(true); // Set flag to true to trigger data fetching
    };

    // Sample data for demonstration purposes
    const pendingRequestsCount = 18;
    const getAssetsByPurchaseDate = (assets, startDate, endDate) => {
        if (!startDate || !endDate) {
            return {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                values: Array(12).fill(0)
            };
        }

        const start = new Date(startDate + "T00:00:00Z");
        const end = new Date(endDate + "T23:59:59Z");

        const monthlyCounts = {};

        const currentDate = new Date(start);
        while (currentDate <= end) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const key = `${year}-${month}`;
            if (!monthlyCounts[key]) {
                monthlyCounts[key] = 0;
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        assets.forEach((asset) => {
            if (!asset.purchaseDate) return;

            const purchaseDate = new Date(asset.purchaseDate);
            if (isNaN(purchaseDate)) return;

            if (purchaseDate >= start && purchaseDate <= end) {
                const year = purchaseDate.getFullYear();
                const month = purchaseDate.getMonth();
                const key = `${year}-${month}`;
                monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
            }
        });

        const sortedEntries = Object.entries(monthlyCounts)
            .sort(([keyA], [keyB]) => {
                const [yearA, monthA] = keyA.split('-').map(Number);
                const [yearB, monthB] = keyB.split('-').map(Number);
                return yearB === yearA ? monthB - monthA : yearB - yearA;
            })
            .slice(0, 12);

        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const labels = sortedEntries.map(([key]) => {
            const [year, month] = key.split('-').map(Number);
            return `${monthNames[month]} ${year}`;
        });

        const values = sortedEntries.map(([, count]) => count);

        // 🔹 Invertir el orden para que se muestren de más antiguo a más reciente
        return {
            labels: labels.reverse(),
            values: values.reverse()
        };
    };

    const getRequestsByDate = (productRequestStats, startDate, endDate) => {
        if (!startDate || !endDate) {
            return {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                values: Array(12).fill(0)
            };
        }

        const start = new Date(startDate + "T00:00:00Z");
        const end = new Date(endDate + "T23:59:59Z");

        const monthlyCounts = {};

        const currentDate = new Date(start);
        while (currentDate <= end) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const key = `${year}-${month}`;
            if (!monthlyCounts[key]) {
                monthlyCounts[key] = 0;
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        productRequestStats.forEach((productRequest) => {
            if (!productRequest.requestDate) return;

            const requestDate = new Date(productRequest.requestDate);
            if (isNaN(requestDate)) return;

            if (requestDate >= start && requestDate <= end) {
                const year = requestDate.getFullYear();
                const month = requestDate.getMonth();
                const key = `${year}-${month}`;
                monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
            }
        });

        const sortedRequests = Object.entries(monthlyCounts)
            .sort(([keyA], [keyB]) => {
                const [yearA, monthA] = keyA.split('-').map(Number);
                const [yearB, monthB] = keyB.split('-').map(Number);
                return yearB === yearA ? monthB - monthA : yearB - yearA;
            })
            .slice(0, 12);

        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const labels = sortedRequests.map(([key]) => {
            const [year, month] = key.split('-').map(Number);
            return `${monthNames[month]} ${year}`;
        });

        const values = sortedRequests.map(([, count]) => count);

        // 🔹 Invertir el orden para que se muestren de más antiguo a más reciente
        return {
            labels: labels.reverse(),
            values: values.reverse()
        };
    };

    const getProductEntriesByDate = (productEntries, startDate, endDate) => {
        if (!startDate || !endDate) {
            return {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                values: Array(12).fill(0)
            };
        }

        const start = new Date(startDate + "T00:00:00Z");
        const end = new Date(endDate + "T23:59:59Z");

        const monthlyCounts = {};

        const currentDate = new Date(start);
        while (currentDate <= end) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const key = `${year}-${month}`;
            if (!monthlyCounts[key]) {
                monthlyCounts[key] = 0;
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        productEntries.forEach((productEntry) => {
            if (!productEntry.purchaseDate || !productEntry.totalEntries) return;

            const entryDate = new Date(productEntry.purchaseDate);
            if (isNaN(entryDate)) return;

            if (entryDate >= start && entryDate <= end) {
                const year = entryDate.getFullYear();
                const month = entryDate.getMonth();
                const key = `${year}-${month}`;
                monthlyCounts[key] = (monthlyCounts[key] || 0) + productEntry.totalEntries; // Add totalEntries instead of 1
            }
        });

        const sortedEntries = Object.entries(monthlyCounts)
            .sort(([keyA], [keyB]) => {
                const [yearA, monthA] = keyA.split('-').map(Number);
                const [yearB, monthB] = keyB.split('-').map(Number);
                return yearB === yearA ? monthB - monthA : yearB - yearA;
            })
            .slice(0, 12);

        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const labels = sortedEntries.map(([key]) => {
            const [year, month] = key.split('-').map(Number);
            return `${monthNames[month]} ${year}`;
        });

        const values = sortedEntries.map(([, count]) => count);

        // 🔹 Invertir el orden para que se muestren de más antiguo a más reciente
        return {
            labels: labels.reverse(),
            values: values.reverse()
        };
    };

    const getAssetsLoansByDate = (assetLoans, startDate, endDate) => {
       // console.log(assetLoans)
        if (!startDate || !endDate) {
            return {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                values: Array(12).fill(0)
            };
        }
        const start = new Date(startDate + "T00:00:00Z");
        const end = new Date(endDate + "T23:59:59Z");

        const monthlyCounts = {};

        const currentDate = new Date(start);
        while (currentDate <= end) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const key = `${year}-${month}`;
            if (!monthlyCounts[key]) {
                monthlyCounts[key] = 0;
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        assetLoans.forEach((assetRequest)=>{
            if(!assetRequest.requestDate) return;

            const requestDate = new Date(assetRequest.requestDate);
            if(isNaN(requestDate))return;

            if (requestDate >= start && requestDate <= end) {
                const year = requestDate.getFullYear();
                const month = requestDate.getMonth();
                const key = `${year}-${month}`;
                monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
            }
        });
        const sortedRequests = Object.entries(monthlyCounts)
            .sort(([keyA], [keyB]) => {
                const [yearA, monthA] = keyA.split('-').map(Number);
                const [yearB, monthB] = keyB.split('-').map(Number);
                return yearB === yearA ? monthB - monthA : yearB - yearA;
            })
            .slice(0, 12);

        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const labels = sortedRequests.map(([key]) => {
            const [year, month] = key.split('-').map(Number);
            return `${monthNames[month]} ${year}`;
        });

        const values = sortedRequests.map(([, count]) => count);

        // 🔹 Invertir el orden para que se muestren de más antiguo a más reciente
        return {
            labels: labels.reverse(),
            values: values.reverse()
        };
    };

    const getComparisonData = (assets, assetLoans, startDate, endDate) => {
        const incomeData = getAssetsByPurchaseDate(assets, startDate, endDate);
        const loanData = getAssetsLoansByDate(assetLoans, startDate, endDate);
    
        // Unificar etiquetas asegurando que ambas series tienen la misma escala de tiempo
        const labelsSet = new Set([...incomeData.labels, ...loanData.labels]);
        const labels = Array.from(labelsSet).sort((a, b) => {
            const [monthA, yearA] = a.split(' ');
            const [monthB, yearB] = b.split(' ');
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            return yearA - yearB || months.indexOf(monthA) - months.indexOf(monthB);
        });
    
        // Mapear valores asegurando alineación con etiquetas
        const getValuesAligned = (data) => labels.map(label => {
            const index = data.labels.indexOf(label);
            return index !== -1 ? data.values[index] : 0;
        });
    
        return {
            incomeData: {
                labels,
                values: getValuesAligned(incomeData)
            },
            loanData: {
                labels,
                values: getValuesAligned(loanData)
            }
        };
    };      



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
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {totalProducts}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faBox} className="fa-2x text-gray-300"/>
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
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalAssets}</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faBuilding} className="fa-2x text-gray-300"/>
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
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total de
                                        Espacios
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalSpaces}</div>
                                </div>
                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faClipboardList} className="fa-2x text-gray-300"/>
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
                                    <FontAwesomeIcon icon={faComments} className="fa-2x text-gray-300"/>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Sección para el resumen de activos y valor de inventario */}
            <div className="row d-flex align-items-stretch">
                <div className="col-xl-8 col-lg-8 col-md-12">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Resumen de Activos</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
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
                                <AreaChart/>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Valor del inventario de Activos</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Encabezado del Menú:</div>
                                        <a className="dropdown-item" href="#" onClick={inventoryValueAllTime}>Valor
                                            total del inventario</a>
                                        <a className="dropdown-item" href="#">Otra acción</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Algo más aquí</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="mt-0">
                                <form ref={formRef}>
                                    <div className="">
                                        <div className="row mt-3">
                                            {inventoryValue?.data?.length ? (
                                                inventoryValue.data.map((item, index) => {
                                                   // console.log(inventoryValue.data)
                                                    // Replace currency name
                                                    const currencyName = item.currency?.stateName === "DOLLAR" ? "dólares" :
                                                        item.currency?.stateName === "COLON" ? "colónes" :
                                                            item.currency?.stateName;
                                                    return (
                                                        <div key={index} className="col">
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
                                                                    }}>
                                                                        Total del Inventario
                                                                    </Typography>
                                                                    <Typography sx={{
                                                                        fontFamily: '"Montserrat", sans-serif',
                                                                        color: '#f8f9fa',
                                                                        marginTop: '15px',
                                                                        textAlign: 'center' // Centra el valor numérico
                                                                    }}>
                                                                        {item.currency?.symbol}{item.amount.toLocaleString()}
                                                                    </Typography>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <Typography sx={{
                                                                        fontWeight: 'bold',
                                                                        color: '#f8f9fa',
                                                                        fontFamily: '"Montserrat", sans-serif'
                                                                    }}>
                                                                        Activos en {currencyName} | {item.currency.code}
                                                                    </Typography>
                                                                    <Typography sx={{
                                                                        fontFamily: '"Montserrat", sans-serif',
                                                                        color: '#f8f9fa',
                                                                        marginTop: '15px',
                                                                        marginBottom: '5px',
                                                                        textAlign: 'center' // Centra el valor numérico
                                                                    }}>
                                                                        {item.quantity.toLocaleString()}
                                                                    </Typography>
                                                                </div>
                                                            </Box>
                                                        </div>
                                                    );
                                                })
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
                                                        }}>
                                                            Seleccione una fecha
                                                        </Typography>
                                                    </Box>
                                                </div>
                                            )}
                                        </div>
                                        {/* Filtros de Fechas */}
                                        <div className="row mt-5">
                                            <div className="col-md-6">
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
                                            <div className="col-md-6">
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
                                    </div>
                                </form>
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
                            <div className="row">
                                <div className="col-md-4">
                                    <h4 className="small font-weight-bold mb-1">Activos <span
                                        className="float-right">20%</span></h4>
                                    <ProgressBar now={34} variant="danger" className="mb-2"/>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="small font-weight-bold mb-1">Productos <span
                                        className="float-right">40%</span></h4>
                                    <ProgressBar now={47} variant="warning" className="mb-2"/>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="small font-weight-bold mb-1">Espacios <span
                                        className="float-right">40%</span></h4>
                                    <ProgressBar now={11} variant="info" className="mb-2"/>
                                </div>
                            </div>
                        </Card.Body>

                    </Card>
                </div>
            </div>


            {/* Sección para estadísticas de ingresos y préstamos de activos */}
            <div className="row">
                {/* Gráfico de ingresos de activos */}
                <div className="col-xl-6 col-lg-6 col-md-12">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Ingresos de Activos</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Opciones:</div>
                                        <a className="dropdown-item" href="#">Ver por año</a>
                                        <a className="dropdown-item" href="#">Ver por semestre</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Exportar datos</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area">
                                {/* Espacio para gráfico de barras de ingresos */}
                                <BarChart
                                    data={getAssetsByPurchaseDate(
                                        assets?.data || [],
                                        assetsByPurchaseDate.startDate,
                                        assetsByPurchaseDate.endDate
                                    )}
                                    label='Ingresos de activos'
                                />
                            </div>
                            <div className="mt-3">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="assetsByPurchaseDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha inicial
                                            </label>
                                            <input
                                                type="date"
                                                id="assetsByPurchaseDate"
                                                name="startDate"
                                                className="form-control border-primary"
                                                value={assetsByPurchaseDate.startDate}
                                                onChange={handleAssetsPurchaseDateChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="assetsByPurchaseDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha final
                                            </label>
                                            <input
                                                type="date"
                                                id="assetsByPurchaseDate"
                                                name="endDate"
                                                className="form-control border-primary"
                                                value={assetsByPurchaseDate.endDate}
                                                onChange={handleAssetsPurchaseDateChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                {/* Gráfico de solicitudes de activos */}
                <div className="col-xl-6 col-lg-6 col-md-12">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Solicitudes de activos por mes</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Opciones:</div>
                                        <a className="dropdown-item" href="#">Ver por año</a>
                                        <a className="dropdown-item" href="#">Ver por semestre</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Exportar datos</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area">
                                {/* Espacio para gráfico de columnas de préstamos */}
                                <ColumnChart
                                    data={getAssetsLoansByDate(
                                        assetLoans?.data || [],
                                        loanDates.startDate,
                                        loanDates.endDate
                                    )}
                                    label='Solicitudes de activos por mes'
                                />
                            </div>
                            <div className="mt-3">
                                <form>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <label htmlFor="loanStartDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha inicial
                                            </label>
                                            <input
                                                type="date"
                                                id="loanStartDate"
                                                name="startDate"
                                                className="form-control border-primary"
                                                value={loanDates.startDate}
                                                onChange={handleLoanDateChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="loanEndDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha final
                                            </label>
                                            <input
                                                type="date"
                                                id="loanEndDate"
                                                name="endDate"
                                                className="form-control border-primary"
                                                value={loanDates.endDate}
                                                onChange={handleLoanDateChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                {/* Gráfico para solicitudes de productos */}
                <div className="col-xl-6 col-lg-6 col-md-12 mt-4">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Solicitudes de Productos por Mes</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Opciones:</div>
                                        <a className="dropdown-item" href="#">Ver por año</a>
                                        <a className="dropdown-item" href="#">Ver por semestre</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Exportar datos</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area">
                                {/* Espacio para gráfico de barras de solicitudes por mes */}
                                <BarChart
                                    data={getRequestsByDate(
                                        productRequestStats?.data || [],
                                        productRequestsDates.startDate,
                                        productRequestsDates.endDate
                                    )}
                                    label="Solicitudes de productos por mes"
                                />
                            </div>
                            <div className="mt-3">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="productRequestsStartDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha inicial
                                            </label>
                                            <input
                                                type="date"
                                                id="productRequestsStartDate"
                                                name="startDate"
                                                className="form-control border-primary"
                                                value={productRequestsDates.startDate}
                                                onChange={handleProductRequestsDateChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="productRequestsEndDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha final
                                            </label>
                                            <input
                                                type="date"
                                                id="productRequestsEndDate"
                                                name="endDate"
                                                className="form-control border-primary"
                                                value={productRequestsDates.endDate}
                                                onChange={handleProductRequestsDateChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                {/* Gráfico para los ingresos de productos */}
                <div className="col-xl-6 col-lg-6 col-md-12 mt-4">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Ingresos de productos por mes</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Opciones:</div>
                                        <a className="dropdown-item" href="#">Ver por año</a>
                                        <a className="dropdown-item" href="#">Ver por semestre</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Exportar datos</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area">
                                {/* Espacio para gráfico de ingresos de productos */}
                                <ColumnChart
                                    data={getProductEntriesByDate(
                                        productEntries?.data || [],
                                        productEntriesDates.startDate,
                                        productEntriesDates.endDate
                                    )}
                                    label='Ingresos de productos por mes'
                                />
                            </div>
                            <div className="mt-3">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="productEntriesStartDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha inicial
                                            </label>
                                            <input
                                                type="date"
                                                id="productEntriesStartDate"
                                                name="startDate"
                                                className="form-control border-primary"
                                                value={productEntriesDates.startDate}
                                                onChange={handleProductEntriesDateChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="loanEndDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha final
                                            </label>
                                            <input
                                                type="date"
                                                id="loanEndDate"
                                                name="endDate"
                                                className="form-control border-primary"
                                                value={productEntriesDates.endDate}
                                                onChange={handleProductEntriesDateChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>


            {/* Gráfico comparativo entre ingresos y préstamos */}
            <div className="row mt-4">
                <div className="col-lg-12">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Comparativo Ingresos vs Solicitudes de Préstamos</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisV} className="fa-sm fa-fw text-gray-400"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Opciones:</div>
                                        <a className="dropdown-item" href="#">Ver por año</a>
                                        <a className="dropdown-item" href="#">Ver por semestre</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Exportar datos</a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area">
                                {/* Espacio para gráfico combinado */}
                                <ComboChart
                                    {...getComparisonData(
                                        assets?.data || [],
                                        assetLoans?.data || [],
                                        comparisonDates.startDate,
                                        comparisonDates.endDate
                                    )}
                                />
                            </div>
                            <div className="mt-3">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="comparisonStartDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha inicial
                                            </label>
                                            <input
                                                type="date"
                                                id="comparisonStartDate"
                                                name="startDate"
                                                className="form-control border-primary"
                                                value={comparisonDates.startDate}
                                                onChange={handleComparisonDateChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="comparisonEndDate" className="form-label">
                                                <i className="fas fa-calendar-alt"></i> Fecha final
                                            </label>
                                            <input
                                                type="date"
                                                id="comparisonEndDate"
                                                name="endDate"
                                                className="form-control border-primary"
                                                value={comparisonDates.endDate}
                                                onChange={handleComparisonDateChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
        ;
};

export default Dashboard;