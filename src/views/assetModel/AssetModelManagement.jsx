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

    const validateAssetModel = (values) => {
        if (!values.modelName) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        return true;
    }

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
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
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