/**
 * AssetCategoryManagement component.
 * 
 * This component is responsible for managing asset categories.
 * It includes a banner for navigation and action buttons,
 * a table for displaying asset categories,
 * and modals for creating, editing, and deleting categories.
 * It uses Material-UI for styling and Material React Table for displaying the data.
 */
import AssetCategoryBanner from "./AssetCategoryBanner.jsx";
import useAssetCategory from "../../hooks/apiData/assetCategory/AssetCategoryData.jsx";
import {useEffect, useMemo, useState} from "react";
import {
    deleteAssetCategory,
    saveAssetCategory,
    updateAssetCategory
} from "../../api/assetCategory/assetCategory_API.js";
import {toast} from "react-hot-toast";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';

/**
 * AssetCategoryManagement component that manages asset categories.
 * 
 * @component
 * @returns {JSX.Element} - The AssetCategoryManagement component.
 */
const AssetCategoryManagement = () => {

    const { assetCategories, isLoading, isError, refetch } = useAssetCategory();
    const [data, setData] = useState([]);

    const [rowToEdit, setRowToEdit] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (assetCategories?.data && Array.isArray(assetCategories.data)) setData(assetCategories.data);

    }, [assetCategories]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
        { accessorKey: "name", header: "Nombre", enableEditing: true },
    ], []);

    /**
     * Validates the asset category data.
     * 
     * @param {object} values - The asset category data to validate.
     * @returns {boolean} - Returns true if the data is valid, false otherwise.
     */
    const validateAssetCategory = (values) => {
        if (!values.name) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        return true;
    }

    /**
     * Handles the creation of a new asset category.
     *
     * @param {object} params - The parameters for creating the asset category.
     * @param {object} params.values - The values for the new asset category.
     * @param {object} params.table - The table instance.
     * @returns {void}
     */
    const handleCreateAssetCategory = async ({ values, table }) => {
        if (!validateAssetCategory(values)) return;
        try {
            const response = await saveAssetCategory({ name: values.name });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the deletion of an asset category.
     * 
     * @param {void}
     * @returns {void}
     */
    const handleDeleteAssetCategory = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteAssetCategory(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the update of an asset category.
     * 
     * @param {object} params - The parameters for updating the asset category.
     * @param {object} params.values - The updated values of the asset category.
     * @param {object} params.row - The row instance.
     * @returns {void}
     */
    const handleUpdateAssetCategory = async ({ values, row }) => {
        if (!validateAssetCategory(values)) return;
        try {
            const response = await updateAssetCategory(row.original.id, { name: values.name });
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
        data: data || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateAssetCategory,
        onEditingRowSave: handleUpdateAssetCategory,
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

    if (isError) return <p>Error al cargar los datos.</p>;

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <AssetCategoryBanner
                title="Gestión de Categorías de Activos"
                visibleButtons={["goBack", "createAssetCategory"]}
                createAssetCategory={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Categoria de Activo"}
                          bodyText={"¿Estás seguro que deseas eliminar esta categoría de activo?"}
                          onButtonClick={handleDeleteAssetCategory} />
        </>
    )
}

export default AssetCategoryManagement