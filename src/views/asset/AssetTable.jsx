import {useEffect, useMemo, useState} from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {Box, Typography} from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "../../api/asset/asset_API.js";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import {getAllSupplier} from "../../api/supplier/Supplier.js";
import {getAllSubCategory} from "../../api/asset/subCategory_API.js";
import {getAllBrands} from "../../api/brand/brand_API.js";
import {getAllAssetStatus} from "../../api/asset/assetStatus_API.js";
import {getAllAssetModels} from "../../api/asset/assetModel_API.js";
import {getAllCurrencies} from "../../api/currency/currency_API.js";
import {getAllLocationNumber} from "../../api/locationNumber_API/locationNumber_API.js";
import AssetBanner from "./AssetBanner.jsx";
import RefreshIcon from '@mui/icons-material/Refresh';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AssetStatusModal from "../../components/popUp/assetStatusModal/AssetStatusModal.jsx";

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

const AssetTable = () => {

    const [assets, setAssets] = useState(initialArray);
    const [assetStatus, setAssetStatus] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const { data: assetsData, isLoading, isError } = useQuery({
        queryKey: ['assets'],
        queryFn: getAllAssets,
        retry: 1,
        refetchOnWindowFocus: false
    })
    const {data: suppliersData} = useQuery({queryKey: ['suppliers'], queryFn: getAllSupplier})
    const {data: subCategoriesData} = useQuery({queryKey: ['subCategories'], queryFn: getAllSubCategory})
    const {data: brandsData} = useQuery({queryKey: ['brands'], queryFn: getAllBrands})
    const {data: assetStatusData} = useQuery({queryKey: ['assetStatus'], queryFn: getAllAssetStatus})
    const {data: assetModelsData} = useQuery({queryKey: ['assetModels'], queryFn: getAllAssetModels})
    const {data: currencyData} = useQuery({queryKey: ['currencies'], queryFn: getAllCurrencies})
    const {data: locationsData} = useQuery({queryKey: ['locations'], queryFn: getAllLocationNumber})

    useEffect(() => {
        if (assetsData) setAssets(assetsData.data)
        if (assetStatusData) setAssetStatus(assetStatusData.data)
    }, [assetsData, assetStatusData]);

    const handleEdit = (row) => {
        console.log('Edit', row.original);
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
            { accessorKey: 'status.name', header: 'Estado'},
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
                    { label: 'Estado', value: row.original.status?.name },
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



    const exportToPDF = () => {
        const doc = new jsPDF();

        const tableDate = assets.map(asset => [
            asset.id,
            asset.plateNumber,
            asset.purchaseDate,
            asset.value,
            asset.user?.email || 'N/A',
            asset.supplier?.name || 'N/A',
            asset.category?.name || 'N/A',
            asset.subcategory?.name || 'N/A',
            asset.brand?.name || 'N/A',
            asset.status?.name || 'N/A',
            asset.model?.modelName || 'N/A',
            asset.currency?.stateName || 'N/A',
            asset.assetSeries || 'N/A',
            asset.locationNumber?.locationTypeName || 'N/A',
        ]);

        autoTable(doc, {
            head: [[
                'ID', 'Placa', 'Fecha de Compra', 'Valor', 'Usuario Responsable',
                'Proveedor', 'Categoría', 'Subcategoría', 'Marca', 'Estado',
                'Modelo', 'Tipo de Moneda', 'Serie', 'Ubicación'
            ]],
            body: tableDate,
            startY: 20,
            margin: { top: 20, left: 10, right: 10 },
            styles: {
                fontSize: 8,
                cellPadding: 2,
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

        doc.save('assets.pdf');
    };


    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            {isError && <div>Error fetching data</div>}
            <AssetBanner
                title="Gestión de Activos"
                exportToPDF={exportToPDF}
                handleOpen={handleOpen}
                flatAssets={flatAssets}
            />
            <MaterialReactTable table={table} />
            <AssetStatusModal  open={openModal} onClose={handleClose} assetStatuses={assetStatus} />

        </>
    );
};


export default AssetTable;
