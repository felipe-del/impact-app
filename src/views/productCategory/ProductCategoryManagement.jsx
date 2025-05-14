/**
 * ProductCategoryManagement Component
 * 
 * This component is used to manage product categories in the system.
 * It includes functionalities to create, update, and delete product categories.
 * It also displays a table with the list of product categories and their details.
 */
import ProductCategoryBanner from "./ProductCategoryBanner.jsx";
import useProductCategoryData from "../../hooks/apiData/productCategory/productCategoryData.jsx";
import {useEffect, useMemo, useState} from "react";
import useUnitOfMeasurementData from "../../hooks/apiData/unitOfMeasurement/UnitOfMeasurementData.jsx";
import {Box, IconButton, MenuItem, Tooltip, Typography} from "@mui/material";
import useProductCategoryTypeData from "../../hooks/apiData/productCategoryType/productCategoryTypeData.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {toast} from "react-hot-toast";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    deleteProductCategory,
    saveProductCategory,
    updateProductCategory
} from "../../api/productCategory/productCategory_API.js";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

/**
 * This component validates the product category data.
 * 
 * @param {object} values - The product category data to validate.
 * @returns {boolean} - Returns true if the data is valid, false otherwise.
 */
const ProductCategoryManagement = () => {

    const {productCategories, isLoading, isError, refetch} = useProductCategoryData();
    const {unitOfMeasurements} = useUnitOfMeasurementData();
    const {productCategoryTypes} = useProductCategoryTypeData();
    const [productCategoryData, setProductCategoryData] = useState([]);
    const [unitOfMeasurementData, setUnitOfMeasurementData] = useState([]);
    const [productCategoryTypeData, setProductCategoryTypeData] = useState([]);

    const [rowToEdit, setRowToEdit] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);



    useEffect(() => {
        if (productCategories) setProductCategoryData(productCategories.data);
        if (unitOfMeasurements) setUnitOfMeasurementData(unitOfMeasurements.data);
        if (productCategoryTypes) setProductCategoryTypeData(productCategoryTypes.data);
    }, [productCategories, unitOfMeasurements, productCategoryTypes]);

    /**
     * Validates the product category data.
     * 
     * @param {object} values - The product category data to validate.
     * @returns {boolean} - Returns true if the data is valid, false otherwise.
     */
    const validateProductCategory = (values) => {
        if (!values.name) {
            toast.error("El campo 'Nombre' es requerido.");
            return false;
        }
        if (!values.minimumQuantity) {
            toast.error("El campo 'Cantidad' es requerido.");
            return false;
        }
        if (!values["unitOfMeasurement.name"]) {
            toast.error("El campo 'Unidad de Medida' es requerido.");
            return false;
        }
        if (!values["categoryType.name"]) {
            toast.error("El campo 'Tipo de Categoría' es requerido.");
            return false;
        }
        return true;
    }

    /**
     * Handles the creation of a new product category.
     * 
     * @param {object} values - The product category data to create.
     * @param {object} table - The table instance.
     * @return {Promise<void>} - A promise that resolves when the product category is created.
     */
    const handleCreateProductCategory = async ({ values, table }) => {
        if (!validateProductCategory(values)) return;
        try {
            const categoryTypeId = productCategoryTypeData.find((type) => type.name === values["categoryType.name"])?.id;
            const unitOfMeasurementId = unitOfMeasurementData.find((type) => type.name === values["unitOfMeasurement.name"])?.id;

            const response = await saveProductCategory({
                name: values.name,
                minimumQuantity: values.minimumQuantity,
                categoryTypeId: categoryTypeId,
                unitOfMeasurementId: unitOfMeasurementId
            });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the deletion of a product category.
     * 
     * @param {void}
     * @returns {Promise<void>} - A promise that resolves when the product category is deleted.
     */
    const handleDeleteProductCategory = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteProductCategory(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the update of a product category.
     * 
     * @param {object} values - The product category data to update.
     * @param {object} row - The row instance.
     * @return {Promise<void>} - A promise that resolves when the product category is updated.
     */
    const handleUpdateProductCategory = async ({ values, row }) => {
        if (!validateProductCategory(values)) return;
        try {
            const categoryTypeId = productCategoryTypeData.find((type) => type.name === values["categoryType.name"])?.id;
            const unitOfMeasurementId = unitOfMeasurementData.find((type) => type.name === values["unitOfMeasurement.name"])?.id;
            const response = await updateProductCategory(row.original.id, {
                name: values.name,
                minimumQuantity: values.minimumQuantity,
                categoryTypeId: categoryTypeId,
                unitOfMeasurementId: unitOfMeasurementId
            });
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const columns = useMemo(() => [
            { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
            { accessorKey: "name", header: "Nombre", enableEditing: true },
            { accessorKey: "minimumQuantity", header: "Cantidad Mínima", enableEditing: true,
                muiEditTextFieldProps: ({ row }) => ({
                    type: "number",
                    min: 0,
                }),
            },
            { accessorKey: "unitOfMeasurement.name", header: "Unidad de Medida", enableEditing: true,
                muiEditTextFieldProps: ({ row }) => ({
                    select: true,
                    children: unitOfMeasurementData.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                            {type.name}
                        </MenuItem>
                    )),
                }),
            },
            { accessorKey: "categoryType.name", header: "Tipo de Categoría", enableEditing: true,
                muiEditTextFieldProps: ({ row }) => ({
                    select: true,
                    children: productCategoryTypeData.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                            {type.name}
                        </MenuItem>
                    )),
                }),
            },
    ], [unitOfMeasurementData, productCategoryTypeData]);

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: productCategoryData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateProductCategory,
        onEditingRowSave: handleUpdateProductCategory,
        renderRowActions: ({ row, table }) => {
            if (!row?.original) return null;

            return (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip title="Editar">
                        <IconButton onClick={() => table.setEditingRow(row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => handleShowConfirmationModal(row)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            );
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
                    { label: 'Nombre', value: row.original.name },
                    { label: 'Cantidad Mínima', value: row.original.minimumQuantity },
                    { label: 'Unidad de Medida', value: row.original.unitOfMeasurement?.name },
                    { label: 'Abreviatura', value: row.original.unitOfMeasurement?.abbreviation },
                    { label: 'Tipo de Categoría', value: row.original.categoryType?.name },
                    { label: 'Descripción de Categoría', value: row.original.categoryType?.description },
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
    });

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <ProductCategoryBanner
                title="Gestión de Categorías de Producto"
                visibleButtons={["goBack", "createProductCategory"]}
                createProductCategory={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable  table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Categoría de Producto"}
                          bodyText={"¿Estás seguro que deseas eliminar esta Categoría de Producto?"}
                          onButtonClick={handleDeleteProductCategory}
            />
        </>
    );
}

export default ProductCategoryManagement;