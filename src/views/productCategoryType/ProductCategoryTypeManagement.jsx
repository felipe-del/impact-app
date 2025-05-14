/**
 * ProductCategoryTypeManagement Component
 * 
 * This component is used to manage product category types in the system.
 * It includes functionalities to create, update, and delete product category types.
 * It also displays a table with the list of product category types and their details.
 * It uses Material-UI for styling and icons.
 */
import ProductCategoryTypeBanner from "./ProductCategoryTypeBanner.jsx";
import useProductCategoryTypeData from "../../hooks/apiData/productCategoryType/productCategoryTypeData.jsx";
import {useEffect, useMemo, useState} from "react";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {toast} from "react-hot-toast";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    deleteProductCategoryType, saveProductCategoryType,
    updateProductCategoryType
} from "../../api/productCategoryType/productCategoryType_API.js";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

/**
 * This component manages the product category types in the system.
 * 
 * @param {object} values - The product category type data to validate.
 * @returns {boolean} - Returns true if the data is valid, false otherwise.
 */
const ProductCategoryTypeManagement = () => {

    const {productCategoryTypes, isError, isLoading, refetch} = useProductCategoryTypeData();
    const [productCategoryTypeData, setProductCategoryTypeData] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if(productCategoryTypes) setProductCategoryTypeData(productCategoryTypes.data);
    }, [productCategoryTypes]);

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80, enableEditing: false },
            { accessorKey: "name", header: "Nombre", enableEditing: true },
            { accessorKey: "description", header: "Descripción", enableEditing: true },
        ],
        []
    )

    /**
     * Validates the product category type data.
     * 
     * @param {object} values - The product category type data to validate.
     * @return {boolean} - Returns true if the data is valid, false otherwise.
     */
    const validateProductCategoryType = (values) => {
        if (!values.name) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        if (!values.description) {
            toast.error("La descripción no puede estar vacía.");
            return false;
        }
        return true;
    }

    /**
     * Handles the creation of a new product category type.
     * 
     * @param {object} values - The product category type data to create.
     * @param {object} table - The table instance.
     * @return {Promise<void>} - A promise that resolves when the product category type is created.
     */
    const handleCreateProductCategoryType= async ({ values, table }) => {
        if (!validateProductCategoryType(values)) return;
        try {
            const response = await saveProductCategoryType({
                name: values.name,
                description: values.description
            });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the deletion of a product category type.
     * 
     * @param {void}
     * @return {Promise<void>} - A promise that resolves when the product category type is deleted.
     */
    const handleDeleteProductCategoryType  = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteProductCategoryType(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the update of an existing product category type.
     * 
     * @param {object} values - The product category type data to update.
     * @param {object} row - The row instance.
     * @return {Promise<void>} - A promise that resolves when the product category type is updated.
     */
    const handleUpdateProductCategoryType = async ({ values, row }) => {
        if (!validateProductCategoryType(values)) return;
        try {
            const response = await updateProductCategoryType(row.original.id, {
                name: values.name,
                description: values.description
            });
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: productCategoryTypeData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateProductCategoryType,
        onEditingRowSave: handleUpdateProductCategoryType,
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
    });

    if (isError) return <div>Error al cargar los datos</div>
    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <ProductCategoryTypeBanner
                title="Gestión de Tipo de Categorías de Producto"
                visibleButtons={["goBack", "createProductCategoryType"]}
                createProductCategoryType={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Tipo de Categoría de Producto"}
                          bodyText={"¿Estás seguro que deseas eliminar este Tipo de Categoría de Producto?"}
                          onButtonClick={handleDeleteProductCategoryType} />
        </>
    )
}

export default ProductCategoryTypeManagement