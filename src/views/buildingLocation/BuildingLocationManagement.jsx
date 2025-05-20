/**
 * BuildingLocationManagement component.
 * 
 * This component manages the building location data and provides functionality to create, update, and delete building locations.
 * It uses Material React Table for displaying the data and MUI for styling.
 * It also includes a modal for confirming deletion of building locations.
 */
import BuildingLocationBanner from "./BuildingLocationBanner.jsx";
import useBuildingLocationData from "../../hooks/apiData/buildingLocation/BuildingLocationData.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import {useEffect, useMemo, useState} from "react";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {Box, IconButton, MenuItem, Tooltip} from "@mui/material";
import useBuildingData from "../../hooks/apiData/building/BuildingData.jsx";
import {toast} from "react-hot-toast";
import {deleteBrand, saveBrand, updateBrand} from "../../api/brand/brand_API.js";
import {
    deleteBuildingLocation,
    saveBuildingLocation,
    updateBuildingLocation
} from "../../api/buildingLocation/buildingLocation_API.js";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {MRT_Localization_ES} from "material-react-table/locales/es/index.js";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";

/**
 * BuildingLocationManagement component that manages building location data.
 * 
 * @component
 * @returns {JSX.Element} - The BuildingLocationManagement component.
 */
const BuildingLocationManagement = () => {

    const {buildingLocations,isError,refetch,isLoading} = useBuildingLocationData();
    const {building} = useBuildingData();
    const [buildingLocationData, setbuildingLocationData] = useState([]);
    const [buildingData, setBuildingData] = useState([]);

    const [rowToEdit, setRowToEdit] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    useEffect(() => {
        if (buildingLocations?.data && Array.isArray(buildingLocations.data)) {
            setbuildingLocationData(buildingLocations.data);
        }
        if (building?.data && Array.isArray(building.data)) {
            setBuildingData(building.data);
        }
    }, [buildingLocations, building]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
        { accessorKey: "floor", header: "Número de Piso", enableEditing: true,
            muiEditTextFieldProps: ({ row }) => ({
                type: "number",
                inputProps: {
                    min: 0,
                    max: 10
                },
            }),
        },
        { accessorKey: "building.name", header: "Edificio", enableEditing: true,
            muiEditTextFieldProps: ({ row }) => ({
                select: true,
                defaultValue: row.original.locationTypeName || "",
                children: buildingData.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                        {type.name}
                    </MenuItem>
                )),
            }),},
    ], [buildingData]);

    /**
     * Validates the building location data before creating or updating it.
     * 
     * @param {object} values - The values of the building location.
     * @returns {boolean} - Returns true if the data is valid, false otherwise.
     */
    const validateBuildingLocation = (values) => {
        if (!values.floor) {
            toast.error("El número de piso no puede estar vacío.");
            return false;
        }
        if (!values["building.name"]) {
            toast.error("El edificio no puede estar vacío.");
            return false;
        }
        return true;
    }

    /**
     * Handles the creation of a new building location.
     * 
     * @param {object} values - The values of the new building location.
     * @param {object} table - The table instance.
     * @return {void}
     */
    const handleCreateBuildingLocation = async ({ values, table }) => {
        if (!validateBuildingLocation(values)) {
            return;
        }
        try {
            const buildingId = buildingData.find((type) => type.name === values["building.name"])?.id;
            const response = await saveBuildingLocation({
                buildingId: buildingId,
                floor: values.floor
            });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Handles the deletion of a building location.
     * 
     * @param {void}
     * @return {void}
     */
    const handleDeleteBuildingLocation  = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteBuildingLocation(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Handles the update of a building location.
     * 
     * @param {object} values - The updated values of the building location.
     * @param {object} row - The row instance.
     * @return {void}
     */
    const handleUpdateBuildingLocation  = async ({ values, row }) => {
        if (!validateBuildingLocation(values)) {
            return;
        }
        try {
            const buildingId = buildingData.find((type) => type.name === values["building.name"])?.id;
            const response = await updateBuildingLocation(row.original.id, {
                buildingId: buildingId,
                floor: values.floor
            });
            toast.success(response.message);
            refetch()
            table.setEditingRow(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: buildingLocationData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        //manualFiltering: true, 
        //manualPagination: true,
        //manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 15 } },
        onCreatingRowSave: handleCreateBuildingLocation,
        onEditingRowSave: handleUpdateBuildingLocation,
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

    if (isError) return <p>Error al cargar las marcas.</p>;

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <BuildingLocationBanner
                title={"Gestión de Números de Piso"}
                visibleButtons={[ "createBuildingLocation"]}
                createBuildingLocation={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Número de Piso"}
                          bodyText={"¿Estás seguro que deseas eliminar este Número de Piso?"}
                          onButtonClick={handleDeleteBuildingLocation} />
        </>
    );
}

export default BuildingLocationManagement;