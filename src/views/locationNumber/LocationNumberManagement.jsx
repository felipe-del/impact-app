import LocationNumberBanner from "./LocationNumberBanner.jsx";
import useLocationNumberData from "../../hooks/apiData/locationNumber/locationNumber.jsx";
import {useEffect, useMemo, useState} from "react";
import useLocationTypeData from "../../hooks/apiData/locationType/locationType.jsx";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, MenuItem, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import {toast} from "react-hot-toast";
import {deleteLocationType, saveLocationType, updateLocationType} from "../../api/locationType/locationType_API.js";
import {
    deleteLocationNumber,
    saveLocationNumber,
    updateLocationNumber
} from "../../api/locationNumber_API/locationNumber_API.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";


const LocationNumberManagement = () => {

    const {locationNumber, isError, isLoading, refetch} = useLocationNumberData();
    const { locationType } = useLocationTypeData();
    const [locationNumberData, setLocationNumberData] = useState([]);
    const [locationTypeData, setLocationTypeData] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (locationNumber) setLocationNumberData(locationNumber.data);
        if (locationType) setLocationTypeData(locationType.data);
    }, [locationNumber, locationType]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
        { accessorKey: "locationNumber", header: "Número de Ubicación", enableEditing: true,
            muiEditTextFieldProps: ({ row }) => ({
                type: "number",
                min: 0,
            }),
        },
        {
            accessorKey: "locationTypeName",
            header: "Nombre de Ubicación",
            enableEditing: true,
            muiEditTextFieldProps: ({ row }) => ({
                select: true,
                defaultValue: row.original.locationTypeName || "", // Asegúrate de que defaultValue no sea undefined
                children: locationTypeData.map((type) => (
                    <MenuItem key={type.id} value={type.typeName}>
                        {type.typeName}
                    </MenuItem>
                )),
            }),
        }

    ], [locationTypeData]);

    const validateLocationNumber = (values) => {
        if (!values.locationTypeName) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        if (!values.locationNumber) {
            toast.error("El número de ubicación no puede estar vacío.");
            return false;
        }
        return true;
    }

    const handleCreateLocationNumber = async ({ values, table }) => {
        if (!validateLocationNumber(values)) return;
        try {
            const locationTypeId = locationTypeData.find((type) => type.typeName === values.locationTypeName)?.id;
            const response = await saveLocationNumber({
                locationTypeId: locationTypeId,
                    locationNumber: values.locationNumber
            });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleDeleteLocationNumber  = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteLocationNumber(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleUpdateLocationNumber = async ({ values, row }) => {
        if (!validateLocationNumber(values)) return;
        try {
            const locationTypeId = locationTypeData.find((type) => type.typeName === values.locationTypeName)?.id;
            const response = await updateLocationNumber(row.original.id, {
                locationTypeId: locationTypeId,
                locationNumber: values.locationNumber
            });
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const table = useMaterialReactTable({
        columns,
        data: locationNumberData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateLocationNumber,
        onEditingRowSave: handleUpdateLocationNumber,
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


    return (
        <>
            <LocationNumberBanner
                title="Gestión de Números de Ubicación"
                visibleButtons={["goBack", "createLocationNumber"]}
                createLocationNumber={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Número Ubicación"}
                          bodyText={"¿Estás seguro que deseas eliminar este número de ubicación?"}
                          onButtonClick={handleDeleteLocationNumber} />
        </>
    )
}

export default LocationNumberManagement;