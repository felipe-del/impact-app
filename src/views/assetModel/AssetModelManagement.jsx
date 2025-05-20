/**
 * AssetModelManagement component.
 * 
 * This component is used to manage asset models in the application.
 * It includes functionality to create, update, and delete asset models.
 * It uses Material-UI for styling and Material React Table for displaying the data.
 */
import AssetModelBanner from "./AssetModelBanner.jsx";
import useAssetModel from "../../hooks/apiData/assetModel/AssetModelData.jsx";
import {useEffect, useState, useMemo} from "react";
import { toast } from "react-hot-toast";
import {deleteAssetModel, saveAssetModel, updateAssetModel} from "../../api/assetModel/assetModel_API.js";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';

/**
 * AssetModelManagement component that manages asset models.
 *
 * @component
 * @returns {JSX.Element} - The AssetModelManagement component.
 */
const AssetModelManagement = () => {

    const { assetModels, isLoading, isError, refetch } = useAssetModel();
    const [data, setData] = useState([]);

    const [rowToEdit, setRowToEdit] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (assetModels?.data && Array.isArray(assetModels.data)) setData(assetModels.data);
    }, [assetModels]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
        { accessorKey: "modelName", header: "Nombre", enableEditing: true },
    ], []);

    /**
     * Validates the asset model data.
     * 
     * @param {object} values - The asset model data to validate.
     * @returns {boolean} - Returns true if the data is valid, false otherwise.
     */
    const validateAssetModel = (values) => {
        if (!values.modelName) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        return true;
    }

    /**
     * Handles the creation of a new asset model.
     * 
     * @param {object} params - The parameters for creating the asset model.
     * @param {object} params.values - The values for the new asset model.
     * @param {object} params.table - The table instance.
     * @returns {Promise<void>} - A promise that resolves when the asset model is created.
     */
    const handleCreateAssetModel = async ({ values, table }) => {
        if (!validateAssetModel(values)) return;
        try {
            const response = await saveAssetModel({ modelName: values.modelName });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the deletion of an asset model.
     * 
     * @param {object} row - The row to delete.
     * @returns {Promise<void>} - A promise that resolves when the asset model is deleted.
     */
    const handleDeleteAssetModel = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteAssetModel(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the update of an asset model.
     * 
     * @param {object} params - The parameters for updating the asset model.
     * @param {object} params.values - The values for the updated asset model.
     * @param {object} params.row - The row to update.
     * @param {object} params.table - The table instance.
     * @returns {Promise<void>} - A promise that resolves when the asset model is updated.
     */
    const handleUpdateAssetModel = async ({ values, row }) => {
        if (!validateAssetModel(values)) return;
        try {
            const response = await updateAssetModel(row.original.id, {modelName: values.modelName });
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
        //manualFiltering: true,
        //manualPagination: true,
        //manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 15 } },
        onCreatingRowSave: handleCreateAssetModel,
        onEditingRowSave: handleUpdateAssetModel,
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
            <AssetModelBanner
                title={"Modelos de Activos"}
                visibleButtons={["goBack", "createAssetModel"]}
                createAssetModel={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Modelo de Activo"}
                          bodyText={"¿Estás seguro que deseas eliminar este modelo de activo?"}
                          onButtonClick={handleDeleteAssetModel} />
        </>
    )
}

export default AssetModelManagement