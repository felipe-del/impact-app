import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Typography } from '@mui/material';
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

const AssetTable = () => {
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

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID', size: 50 },
            { accessorKey: 'plateNumber', header: 'Placa' },
            { accessorKey: 'purchaseDate', header: 'Fecha de Compra', size: 100 },
            { accessorKey: 'value', header: 'Valor', size: 80 },
            { accessorKey: 'user.email', header: 'Usuario Responsable', size: 120 },
            { accessorKey: 'supplier.name', header: 'Proveedor', size: 120 },
            { accessorKey: 'category.name', header: 'Categoria' },
            { accessorKey: 'subcategory.name', header: 'Subcategoria', size: 120 },
            { accessorKey: 'brand.name', header: 'Marca', size: 100 },
            { accessorKey: 'status.name', header: 'Estado', size: 120 },
            { accessorKey: 'model.modelName', header: 'Modelo' },
            { accessorKey: 'currency.stateName', header: 'Tipo de Moneda' },
            { accessorKey: 'assetSeries', header: 'Serie', size: 120 },
            { accessorKey: 'locationNumber.locationTypeName', header: 'Ubicación' },
        ],
            []
    );

    const table = useMaterialReactTable({
        columns,
        data: assetsData?.data || [],
        enableExpandAll: false, // Deshabilitar botón de expandir todo
        initialState: {
            columnVisibility: {
                id: false,
                plateNumber: false,
                purchaseDate: false,
                value: false,
                user: false,
                supplier: false,
                category: false,
                subcategory: false,
                brand: false,
                status: false,
                model: false,
                currency: false,
                assetSeries: false,
                locationNumber: false,
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
                    gridTemplateColumns: '1fr 1fr',
                    width: '100%',
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Typography><strong>ID:</strong> {row.original.id}</Typography>
                <Typography><strong>Placa:</strong> {row.original.plateNumber}</Typography>
                <Typography><strong>Fecha de Compra:</strong> {row.original.purchaseDate}</Typography>
                <Typography><strong>Valor:</strong> {row.original.value}</Typography>
                <Typography><strong>Usuario Responsable:</strong> {row.original.user?.email}</Typography>
                <Typography><strong>Proveedor:</strong> {row.original.supplier?.name}</Typography>
                <Typography><strong>Categoria:</strong> {row.original.category?.name}</Typography>
                <Typography><strong>Subcategoria:</strong> {row.original.subcategory?.name}</Typography>
                <Typography><strong>Marca:</strong> {row.original.brand?.name}</Typography>
                <Typography><strong>Estado:</strong> {row.original.status?.name}</Typography>
                <Typography><strong>Modelo:</strong> {row.original.model?.modelName}</Typography>
                <Typography><strong>Tipo de Moneda:</strong> {row.original.currency?.stateName}</Typography>
                <Typography><strong>Serie:</strong> {row.original.assetSeries}</Typography>
                <Typography><strong>Ubicación:</strong> {row.original.locationNumber?.locationTypeName}</Typography>

            </Box>
        )
    });

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            {isError && <div>Error fetching data</div>}
            <MaterialReactTable table={table} />
        </>
    );
};

export default AssetTable;
