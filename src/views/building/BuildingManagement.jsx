/**
 * BuildingManagement component.
 * 
 * This component manages the building data and provides functionality to create, update, and delete buildings.
 * It uses Material React Table for displaying the data and MUI for styling.
 * It also includes a modal for confirming deletion of buildings.
 */
import BuildingBanner from "./BuildingBanner.jsx";
import useBuildingData from "../../hooks/apiData/building/BuildingData.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import {useEffect, useMemo, useState} from "react";
import {toast} from "react-hot-toast";
import {deleteBrand, saveBrand, updateBrand} from "../../api/brand/brand_API.js";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {MRT_Localization_ES} from "material-react-table/locales/es/index.js";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {deleteBuilding, saveBuilding, updateBuilding} from "../../api/building/building_API.js";

/**
 * BuildingManagement component that manages building data.
 * 
 * @component
 * @returns {JSX.Element} - The BuildingManagement component.
 */
const BuildingManagement = () => {

    const {building, isError, isLoading, refetch} = useBuildingData();
    const [buildingData, setBuildingData] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (building?.data && Array.isArray(building.data)) {
            setBuildingData(building.data);
        }
    }, [building]);

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80, enableEditing: false },
            { accessorKey: "name", header: "Nombre" },
        ],
        []
    )

    /**
     * Handles the creation of a new building.
     * 
     * @param {object} values - The values of the new building.
     * @param {object} table - The table instance.
     * @returns {void}
     */
    const handleCreateBuilding = async ({ values, table }) => {
        if (!values.name) {
            toast.error("El nombre no puede estar vacío.");
            return;
        }
        try {
            const response = await saveBuilding({ name: values.name });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Handles the deletion of a building.
     * 
     * @param {void}
     * @returns {void}
     */
    const handleDeleteBuilding = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteBuilding(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Handles the update of a building.
     * 
     * @param {object} values - The updated values of the building.
     * @param {object} row - The row instance.
     * @param {object} table - The table instance.
     * @returns {void}
     */
    const handleUpdateBuilding = async ({ values, row }) => {
        if (!values.name || !row?.original?.id) {
            toast.error("Error al actualizar: datos inválidos.");
            return;
        }
        try {
            const response = await updateBuilding(row.original.id, { name: values.name });
            toast.success(response.message);
            refetch();
            table.setEditingRow(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: buildingData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        manualFiltering: true, 
        manualPagination: true, 
        manualSorting: true, 
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateBuilding,
        onEditingRowSave: handleUpdateBuilding,
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
            <BuildingBanner
                title={"Gestión de Edificios"}
                visibleButtons={["createBuilding"]}
                createBuilding={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Edificio"}
                          bodyText={"¿Estás seguro que deseas eliminar este edificio?"}
                          onButtonClick={handleDeleteBuilding} />
        </>
    )
}

export default BuildingManagement;