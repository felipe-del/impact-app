/**
 * Dashboard Component
 * 
 * This component serves as the main dashboard for the application, displaying various statistics and charts related to assets, products, and spaces.
 * It includes functionality to filter data by date ranges and export reports in PDF and CSV formats.
 */
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
import { getAllAssetRequest } from '../../api/assetRequest/assetRequest_API.js';
import { getAllProductRequests } from '../../api/productRequest/productRequest.js';
import { getAllSpaceRequests } from '../../api/spaceRequest/SpaceRequest.js';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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

const initialAssetsByPurchaseDate = {
    startDate: '2024-03-03',
    endDate: formattedToday
};

const initialLoanDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

const initialProductRequestsDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

const initialProductEntriesDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

const initialComparisonDates = {
    startDate: '2024-03-11',
    endDate: formattedToday
};

const todayDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
}

/**
 * Dashboard component that displays various statistics and charts related to assets, products, and spaces.
 * 
 * @component
 * @returns {JSX.Element} - The Dashboard component.
 */
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
    const [requests,setRequests] = useState([]);
    const [loading, setLoading] = useState(true)
    const totalAssets = assets?.data?.length || 0;
    const totalProducts = products?.data?.length || 0;
    const totalSpaces = spaces?.data?.length || 0;


    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    const {inventoryValue} = useInventoryValueData({
        startDate: formData.startDate,
        endDate: formData.endDate,
    });

    useEffect(()=>{
        const fetchAllRequests = async () =>{
            try{
                const[assetRes,productRes,spaceRes] = await Promise.all([
                    getAllAssetRequest(),
                    getAllProductRequests(),
                    getAllSpaceRequests()
                ])
                const assetRequests = assetRes?.data?.map(req => ({...req, tipo: "Activo"})) || []
                const productRequests = productRes?.data?.map(req => ({...req, tipo: "Producto"})) || []
                const spaceRequests = spaceRes?.data?.map(req => ({...req, tipo: "Espacio"})) || []
                const all = [...assetRequests,...productRequests,...spaceRequests]
                setRequests(all)
            }catch(error){
                console.error("Error al cargar solicitudes", error)
            }finally{
                setLoading(false)
            }
        }
        fetchAllRequests()
    },[])

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
        setFetchData(true); 
    };

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
                monthlyCounts[key] = (monthlyCounts[key] || 0) + productEntry.totalEntries; 
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

        return {
            labels: labels.reverse(),
            values: values.reverse()
        };
    };

    const getAssetsLoansByDate = (assetLoans, startDate, endDate) => {
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

    const getAllRequestByDate = (requests,startDate,endDate) => {
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
        requests.forEach((request)=>{
            if(!request.createdAt) return;

            const createdAt = new Date(request.createdAt);
            if(isNaN(createdAt)) return;

            if(createdAt>= start && createdAt <= end){
                const year = createdAt.getFullYear();
                const month = createdAt.getMonth();
                const key = `${year}-${month}`;
                monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
            }
        })
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

        return {
            labels: labels.reverse(),
            values: values.reverse()
        };
    }    
    
    const getComparisonData = (requests, assets, productEntries, startDate, endDate) => {
        const loanData = getAllRequestByDate(requests, startDate, endDate);
    
        // Obtener ambos conjuntos de datos
        const assetsData = getAssetsByPurchaseDate(assets, startDate, endDate);
        const productsData = getProductEntriesByDate(productEntries, startDate, endDate);
    
        // Unificar etiquetas asegurando que ambas series tienen la misma escala de tiempo
        const labelsSet = new Set([...loanData.labels, ...assetsData.labels, ...productsData.labels]);
        const labels = Array.from(labelsSet).sort((a, b) => {
            const [monthA, yearA] = a.split(' ');
            const [monthB, yearB] = b.split(' ');
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            return yearA - yearB || months.indexOf(monthA) - months.indexOf(monthB);
        });
    
        // Función para alinear y mapear valores por etiqueta
        const getValuesAligned = (data) => labels.map(label => {
            const index = data.labels.indexOf(label);
            return index !== -1 ? data.values[index] : 0;
        });
    
        // Alinear y sumar los datos de incomeData
        const alignedAssets = getValuesAligned(assetsData);
        const alignedProducts = getValuesAligned(productsData);
        const combinedIncome = alignedAssets.map((val, idx) => val + alignedProducts[idx]);
    
        return {
            loanData: {
                labels,
                values: getValuesAligned(loanData)
            },
            incomeData: {
                labels,
                values: combinedIncome
            }
        };
    };
    
    
    
    const csvRequestData = [
        ["Fecha de solicitud", "Tipo", "Estado", "Usuario responsable"],
        ...requests.map(req => [
            req.createdAt,
            req.tipo,
            req.status?.description || "N/A",
            req.user?.email || "N/A",
        ])
    ];
    const handleExportToPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [297, 210]
        });
    
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        doc.setFontSize(8);
        doc.text(`Fecha de elaboración: ${formattedDate}`, 80, 10);
    
        const CIMPA = "/UCR_CIMPA_BANNER_LOGO.png";
        doc.addImage(CIMPA, 'PNG', 10, 15, 80, 22);
    
        const impactLogo = "/NEW_IMPACT_WHITE_LOGO.png";
        doc.addImage(impactLogo, 'PNG', 140, 10, 60, 34);
    
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Bitácora: Préstamos del sistema", 80, 50);  // Título centrado
    
        doc.setFontSize(14);
        doc.text("Registros de solicitudes", 14, 60);
    
        const headers = [["Fecha de solicitud", "Tipo", "Estado", "Usuario responsable"]];
        const data = requests.map(req => [
            req.createdAt,
            req.tipo,
            req.status?.description || "N/A",
            req.user?.email || "N/A",
        ]);
    
        autoTable(doc, {
            startY: 65,
            head: headers,
            body: data,
            styles: { fontSize: 10 },
            headStyles: {
                fillColor: [0, 60, 116],  // Azul oscuro (como en el otro método)
                textColor: 255,
                fontSize: 9,
                fontStyle: 'bold',
            },
            bodyStyles: {
                textColor: 50,
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            },
            margin: { top: 20, left: 10, right: 10 },
        });
    
        doc.save("Comparativo_SolicitudesVSIngresos.pdf");
    };
    


    // Contamos la cantidad de cada tipo
    const activos = requests.filter(req => req.tipo === "Activo").length;
    const productos = requests.filter(req => req.tipo === "Producto").length;
    const espacios = requests.filter(req => req.tipo === "Espacio").length;

    const total = activos + productos + espacios;

    // Calculamos porcentajes
    const activosPercentage = total ? (activos / total) * 100 : 0;
    const productosPercentage = total ? (productos / total) * 100 : 0;
    const espaciosPercentage = total ? (espacios / total) * 100 : 0;

    return (
        <div>
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
                            <h6 className="m-2 font-weight-bold text-primary">Préstamos del sistema</h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-around align-items-center h-100">
                                {[
                                    {label: 'Activos', value: activosPercentage, variant: 'danger'},
                                    {label: 'Productos', value: productosPercentage, variant: 'warning'},
                                    {label: 'Espacios', value: espaciosPercentage, variant: 'info'}
                                ].map((item, idx) => (
                                    <div key={idx} className="text-center" style={{width: '30%'}}>
                                        <h4 className="small font-weight-bold mb-2">
                                            {item.label} <span className="d-block mt-1">{item.value.toFixed(0)}%</span>
                                        </h4>
                                        <ProgressBar
                                            now={item.value}
                                            variant={item.variant}
                                            style={{height: '10vh', borderRadius: '1vh'}}
                                        />
                                    </div>
                                ))}
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
                                    </a>
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
            </div>

            <div className="row mb-4 mt-3">
                <div className="col-12 text-center">
                    <hr className="mb-3 border-primary"/>
                    <h4 className="font-weight-bold text-primary">📊 Estadísticas de Activos</h4>
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
                <div className="row mb-2 mt-5">
                    <div className="col-12 text-center">
                        <hr className="mb-3 border-primary" />
                        <h4 className="font-weight-bold text-primary">📊 Estadísticas de Productos </h4>
                    </div>
                </div>
                {/* Gráfico para solicitudes de productos */}
                <div className="col-xl-6 col-lg-6 col-md-12 mt-4">
                    <Card className="shadow mb-4 h-100">
                        <Card.Header>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Solicitudes de Productos por Mes</h6>
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
                                            <div className="dropdown-divider"></div>
                                            <CSVLink
                                            data={csvRequestData}
                                            filename="Comparativo_Solicitudes.csv"
                                            className="dropdown-item"
                                            style={{ color: 'black', textDecoration: 'none' }}
                                            >
                                            Exportar a CSV
                                            </CSVLink>
                                            <a className="dropdown-item" href="#" onClick={handleExportToPDF}>
                                            Exportar a PDF
                                            </a>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="chart-area">
                                {/* Espacio para gráfico combinado */}
                                <ComboChart
                                    {...getComparisonData(
                                        requests,
                                        assets?.data || [],
                                        productEntries?.data || [],
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