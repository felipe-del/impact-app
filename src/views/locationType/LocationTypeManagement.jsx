/**
 * LocationTypeManagement Component
 * 
 * This component is used to manage location types in the system.
 * It includes functionalities to create, update, and delete location types.
 * It also displays a table with the list of location types and their details.
 * It uses Material-UI for styling and icons.
 */
import LocationTypeBanner from "./LocationTypeBanner.jsx";
import useLocationTypeData from "../../hooks/apiData/locationType/locationType.jsx";
import {useEffect, useMemo, useState} from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {toast} from "react-hot-toast";
import {deleteLocationType, saveLocationType, updateLocationType} from "../../api/locationType/locationType_API.js";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

/**
 * This component manages the location types in the system.
 * 
 * @component
 * @returns {JSX.Element} - The LocationTypeManagement component.
 */
const LocationTypeManagement = () => {

    const { locationType, isError, isLoading, refetch } = useLocationTypeData();
    const [locationTypeData, setLocationTypeData] = useState(locationType);
    const [rowToEdit, setRowToEdit] = useState(null);


    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (locationType) setLocationTypeData(locationType.data);
    }, [locationType]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
        { accessorKey: "typeName", header: "Nombre", enableEditing: true },
    ], []);

    /**
     * Validates the location type data.
     * 
     * @param {object} values - The location type data to validate.
     * @returns {boolean} - Returns true if the data is valid, false otherwise.
     */
    const validateLocationType = (values) => {
        if (!values.typeName) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        return true;
    }

    /**
     * Handles the creation of a new location type.
     * 
     * @param {object} values - The location type data to create.
     * @param {object} table - The table instance.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    const handleCreateLocationType = async ({ values, table }) => {
        if (!validateLocationType(values)) return;
        try {
            const response = await saveLocationType({ typeName: values.typeName });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the deletion of a location type.
     * 
     * @param {object} row - The row to delete.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    const handleDeleteLocationType  = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteLocationType(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * Handles the update of a location type.
     * 
     * @param {object} values - The location type data to update.
     * @param {object} row - The row to update.
     * @param {object} table - The table instance.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    const handleUpdateLocationType  = async ({ values, row }) => {
        if (!validateLocationType(values)) return;
        try {
            const response = await updateLocationType(row.original.id, {typeName: values.typeName });
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
        data: locationTypeData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        //manualFiltering: true,
        //manualPagination: true,
        //manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 15 } },
        onCreatingRowSave: handleCreateLocationType,
        onEditingRowSave: handleUpdateLocationType,
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

    if(isError) return <div>Ha ocurrido un error</div>

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <LocationTypeBanner
                title="Gestión de Tipos de Ubicación"
                visibleButtons={["goBack", "createLocationType"]}
                createLocationType={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Ubicación"}
                          bodyText={"¿Estás seguro que deseas eliminar esta ubicación?"}
                          onButtonClick={handleDeleteLocationType} />
        </>
    );
}

export default LocationTypeManagement;