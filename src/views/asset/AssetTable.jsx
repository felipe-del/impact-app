import {useEffect, useMemo, useState} from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {Box, Typography} from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "../../api/asset/asset_API.js";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import {getAllAssetStatus} from "../../api/asset/assetStatus_API.js";
import AssetBanner from "./AssetBanner.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AssetStatusModal from "../../components/popUp/assetStatusModal/AssetStatusModal.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { assetInventoryValue } from '../../api/asset/asset_API.js';
import { getAllAssetRequest } from '../../api/assetRequest/assetRequest_API.js';
import { toast } from "react-hot-toast";

const initialArray = [
    {
        "id": 1,
        "purchaseDate": "2024-01-01",
        "value": 1000,
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "johndoe@example.com",
            "userRoleResponse": {
                "id": 1,
                "roleName": "USER",
                "description": "Standard system user"
            },
            "userStateResponse": {
                "id": 1,
                "stateName": "ACTIVE",
                "description": "User is active and can log in"
            }
        },
        "supplier": {
            "id": 1,
            "name": "Supplier Inc.",
            "phone": "1234-5678",
            "email": "supplier@example.com",
            "address": "123 Main Street",
            "entityTypeName": "PHYSICAL",
            "clientContact": "5678-1234",
            "idNumber": "1-2345-6789"
        },
        "subcategory": {
            "id": 1,
            "name": "Laptop",
            "description": "Portable computer",
            "assetCategoryName": "Electronics"
        },
        "category": {
            "id": 1,
            "name": "Electronics"
        },
        "brand": {
            "id": 1,
            "name": "Dell"
        },
        "status": {
            "id": 1,
            "name": "AVAILABLE",
            "description": "The asset is available for use."
        },
        "assetSeries": "SER_001",
        "plateNumber": "PLA_001",
        "model": {
            "id": 1,
            "modelName": "XPS 15"
        },
        "currency": {
            "id": 1,
            "code": "USD",
            "symbol": "$",
            "stateName": "DOLLAR"
        },
        "locationNumber": {
            "id": 1,
            "locationTypeName": "Building",
            "locationNumber": 101
        }
    }
];
import EditButton from "../../components/button/EditButton.jsx";
import {useNavigate} from "react-router-dom";
import {StatusTranslator} from "../../util/Translator.js";
import {getStateColor} from "../../util/SelectColorByStatus.js";
import {getStateIcon} from "../../util/SelectIconByStatus.jsx";

const AssetTable = () => {

    const [assets, setAssets] = useState(initialArray);
    const [assetStatus, setAssetStatus] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [assetRequests, setAssetRequests] = useState([]);
    const [inventoryValue, setinventoryValue] = useState(0);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data: assetsData, isLoading, isError } = useQuery({
        queryKey: ['assets'],
        queryFn: getAllAssets,
        retry: 1,
        refetchOnWindowFocus: false
    })


    const {data: assetStatusData} = useQuery({queryKey: ['assetStatus'], queryFn: getAllAssetStatus})

    useEffect(() => {
        if (assetsData) setAssets(assetsData.data)
        if (assetStatusData) setAssetStatus(assetStatusData.data)
            preparePDF()
    }, [assetsData, assetStatusData]);

    const navigate = useNavigate();

    const handleEdit = (row) => {
        navigate("/app/editAsset/" + row.original.id)
    }

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID'},
            { accessorKey: 'plateNumber', header: 'Placa'},
            { accessorKey: 'purchaseDate', header: 'Fecha de Compra'},
            {
                accessorKey: 'value',
                header: 'Valor',
                Cell: ({ row }) => {
                    const value = row.original.value;
                    const currencyCode = row.original.currency?.code;

                    if (typeof value === 'number' && currencyCode) {
                        const formattedValue = new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: currencyCode,
                        }).format(value);

                        return <span>{formattedValue}</span>;
                    }

                    // Si no se cumplen las condiciones, devolver un valor por defecto
                    return <span>N/A</span>;
                },
            },
            { accessorKey: 'user.email', header: 'Usuario Responsable'},
            { accessorKey: 'supplier.name', header: 'Proveedor'},
            { accessorKey: 'category.name', header: 'Categoria'},
            { accessorKey: 'subcategory.name', header: 'Subcategoria'},
            { accessorKey: 'brand.name', header: 'Marca'},
            { accessorKey: 'status.name', header: 'Estado',
                Cell: ({ row }) => {
                const status = row.original.status;
                const translatedStatus = StatusTranslator.translate(status.name);
                return(
                    <Typography
                        sx={{
                            color: getStateColor(translatedStatus),
                            fontFamily: 'Montserrat, sans-serif',
                        }}
                    >
                        {getStateIcon(translatedStatus)} {translatedStatus}
                    </Typography>
                )
                }},
            { accessorKey: 'model.modelName', header: 'Modelo'},
            { accessorKey: 'currency.stateName', header: 'Tipo de Moneda'},
            { accessorKey: 'assetSeries', header: 'Serie'},
            { accessorKey: 'locationNumber.locationTypeName', header: 'Ubicación'},
            {
                id: 'actions',
                header: 'Acciones',
                size: 'small',
                Cell: ({ row }) => (
                    <EditButton handleEdit={handleEdit} row={row} />
                ),
            },
        ],
            []
    );

    const flatAssets = assets.map(asset => ({
        id: asset.id,
        plateNumber: asset.plateNumber,
        purchaseDate: new Date(asset.purchaseDate).toString(),
        value: asset.value,
        user: asset.user?.email,
        supplier: asset.supplier?.name,
        category: asset.category?.name,
        subcategory: asset.subcategory?.name,
        brand: asset.brand?.name,
        status: asset.status?.name,
        model: asset.model?.modelName,
        currency: asset.currency?.stateName,
        assetSeries: asset.assetSeries,
        locationNumber: asset.locationNumber?.locationTypeName,
    }));

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: assets,
        enableExpandAll: false,
        initialState: {
            columnVisibility: {
                id: false,
                plateNumber: true,
                purchaseDate: false,
                value: true,
                'user.email': false,
                'supplier.name': false,
                'category.name': false,
                'subcategory.name': true,
                'brand.name': false,
                'status.name': true,
                'model.modelName': false,
                'currency.stateName': false,
                assetSeries: true,
                'locationNumber.locationTypeName': false,
            },
            density: 'comfortable',
            pagination: {
                pageSize: 5,
            },
        },
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark' ? 'rgba(255,210,244,0.1)' : 'rgba(0,0,0,0.1)'
            })
        }),
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s'
            }
        }),
        
        renderDetailPanel: ({ row }) => (
            <Box
                sx={{
                    display: 'grid',
                    margin: 'auto',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    width: '100%',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 10px rgba(0, 93, 164, 0.3)',
                    color: '#f8f9fa',
                    fontFamily: '"Montserrat", sans-serif',
                    letterSpacing: '0.5px',
                    gap: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                {[
                    { label: 'ID', value: row.original.id },
                    { label: 'Placa', value: row.original.plateNumber },
                    { label: 'Fecha de Compra', value: row.original.purchaseDate },
                    { label: 'Valor', value: `${row.original.value} ${row.original.currency?.symbol}` },
                    { label: 'Usuario Responsable', value: row.original.user?.email },
                    { label: 'Proveedor', value: row.original.supplier?.name },
                    { label: 'Categoría', value: row.original.category?.name },
                    { label: 'Subcategoría', value: row.original.subcategory?.name },
                    { label: 'Marca', value: row.original.brand?.name },
                    { label: 'Estado', value: StatusTranslator.translate(row.original.status?.name) },
                    { label: 'Modelo', value: row.original.model?.modelName },
                    { label: 'Tipo de Moneda', value: `${row.original.currency?.stateName} - ${row.original.currency?.code} - ${row.original.currency?.symbol}` },
                    { label: 'Serie', value: row.original.assetSeries },
                    { label: 'Ubicación', value: row.original.locationNumber?.locationTypeName },
                ].map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
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
                        <Typography sx={{ fontWeight: 'bold', color: '#f8f9fa', fontFamily: '"Montserrat", sans-serif' }}>
                            {item.label}
                        </Typography>
                        <Typography sx={{fontFamily: '"Montserrat", sans-serif' }}>{item.value || 'N/A'}</Typography>
                    </Box>
                ))}
            </Box>
        ),
        state: {
            isLoading: isLoading,
            showAlertBanner: isError
        }
    });

    const preparePDF = async () =>{
        try {
            const response = await getAllAssetRequest();
            setAssetRequests(response.data);
            if (response?.data.length === 0) {
                toast.success("No hay solicitudes pendientes.", { icon: "🔔" });
                return
            }
            console.log(assetRequests)
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } 
        try {
            const today = new Date();
        const todayDate = {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        }
            const pad = (num) => num.toString().padStart(2, '0');
            const formattedEndDate = `${todayDate.year}-${pad(todayDate.month)}-${pad(todayDate.day)}`;
            const response = await assetInventoryValue('1997-01-01', formattedEndDate);
            setinventoryValue(response.data);
            if (response?.data.length === 0) {
                toast.success("No hay activos en el sistema.", { icon: "🔔" });
                return
            }
            console.log(inventoryValue[0]?.amount)
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } 
    }

    const exportToPDF = async () => {
        const doc = new jsPDF({
            orientation: 'landscape',  // Hace que la página sea horizontal
            unit: 'mm',
            format: [297, 210]  // Personalizado (ancho 297mm, alto 210mm)
        });

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        doc.setFontSize(8);
        doc.text(`Fecha de elaboración: ${formattedDate}`, 80, 10);

        const CIMPA = "/UCR_CIMPA_BANNER_LOGO.png";
        doc.addImage(CIMPA,'PNG', 10, 15, 80, 22)
        

        const impactLogo ="/NEW_IMPACT_WHITE_LOGO.png"
        doc.addImage(impactLogo,'PNG', 140, 10, 60, 34)

        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Informe de activos", 80, 50);

        doc.setFontSize(14);
        doc.text("Existencias actuales", 14, 60);

        const tableDate = assets.map(asset => [
            asset.id,
            asset.plateNumber,
            asset.purchaseDate,
            asset.value,
            asset.user?.email || 'N/A',
            asset.supplier?.name || 'N/A',
            asset.category?.name || 'N/A',
            asset.subcategory?.description || 'N/A',
            asset.brand?.name || 'N/A',
            asset.status?.name || 'N/A',
            asset.model?.modelName || 'N/A',
            asset.assetSeries || 'N/A',
            asset.locationNumber?.locationTypeName || 'N/A',
        ]);

        autoTable(doc, {
            head: [[
                'ID', 'Placa', 'Fecha de Compra', 'Valor', 'Usuario Responsable',
                'Proveedor', 'Categoría', 'Subcategoría', 'Marca', 'Estado',
                'Modelo', 'Serie', 'Ubicación'
            ]],
            body: tableDate,
            startY: 65,
            margin: { top: 20, left: 10, right: 10 },
            
            columnStyles: {
                10: {cellWidth: 15 },
                11: {cellWidth: 15}
            },
            headStyles: {
                fillColor: [0, 60, 116],
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
        });

        // Valor total del inventario
    const afterInventoryTableY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14)
    doc.text('Valor total de activos: '+ `${inventoryValue[0]?.amount} colones`, 14, afterInventoryTableY);

    // Tabla de Requests de Activos
    const afterValueTextY = afterInventoryTableY + 10;
    doc.setFontSize(14);
    doc.text("Salidas de activos (Préstamos)",14, afterValueTextY);
    autoTable(doc, {
        startY: afterValueTextY + 5,
        head: [["Fecha de solicitud", "Activo", "Placa", "Usuario", "Razón", "Estado"]],
        body: assetRequests.map(req => [
            req.createdAt, req.asset.subcategory.description, req.asset.plateNumber, req.user.name, req.reason, req.status.name
        ]),
        headStyles: {
            fillColor: [0, 60, 116],
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
    });

    // Guardar PDF
    doc.save("Informe_de_Activos.pdf");
    };


    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            {isError && <div>Error fetching data</div>}
            <AssetBanner
                title="Gestión de Activos"
                exportToPDF={exportToPDF}
                preparePDF={preparePDF}
                handleOpen={handleOpen}
                flatAssets={assets}
                flatRequests={assetRequests}
                inventoryValue={inventoryValue}
            />
            <MaterialReactTable table={table} />
            <AssetStatusModal  open={openModal} onClose={handleClose} assetStatuses={assetStatus} />

        </>
    );
};


export default AssetTable;
