import ProductBanner from "./ProductBanner.jsx";
import useProductData from "../../hooks/apiData/product/productData.jsx";
import {useEffect, useMemo, useState} from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, Typography} from "@mui/material";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import EditButton from "../../components/button/EditButton.jsx";
import {useNavigate} from "react-router-dom";
import {StatusTranslator} from "../../util/Translator.js";
import {getStateColor} from "../../util/SelectColorByStatus.js";
import {getStateIcon} from "../../util/SelectIconByStatus.jsx";

const ProductManagement = () => {

    const { products, isLoading, isError, refetch } = useProductData();
    const [productData, setProductData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (products?.data && Array.isArray(products.data)) setProductData(products.data);
        console.log(products.data)
    }, [products]);

    const handleEdit = (row) => {
        navigate("/app/updateProduct/" + row.original.id)
    }

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80 },
            { accessorKey: "purchaseDate", header: "Fecha de Compra" },
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
            { accessorKey: "category.unitOfMeasurement.name", header: "Unidad de Medida" },
            { accessorKey: "category.categoryType.name", header: "Categoría" },
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
    )

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: productData,
        enableExpandAll: false,
        initialState: {
            columnVisibility: {
                id: false,
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
                    { label: 'Fecha de Compra', value: row.original.purchaseDate },
                    { label: 'Fecha de Expiración', value: row.original.expiryDate },
                    { label: 'Estado', value: StatusTranslator.translate(row.original.status.name) },
                    { label: 'Descripción de Estado', value: row.original.status.description },
                    { label: 'Unidad de Medida', value: row.original.category.unitOfMeasurement.name },
                    { label: 'Abreviatura Unidad', value: row.original.category.unitOfMeasurement.abbreviation },
                    { label: 'Categoría', value: row.original.category.name },
                    { label: 'Cantidad Mínima', value: row.original.category.minimumQuantity },
                    { label: 'Tipo de Categoría', value: row.original.category.categoryType.name },
                    { label: 'Descripción de Categoría', value: row.original.category.categoryType.description }
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

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <ProductBanner
                title="Gestión de Productos"
                visibleButtons={[ "createProduct"]}
            />
            <MaterialReactTable table={table} />
        </>
    )
}

export default ProductManagement