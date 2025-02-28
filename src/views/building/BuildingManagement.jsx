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
        console.log(building.data)
    }, [building]);

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80, enableEditing: false },
            { accessorKey: "name", header: "Nombre" },
        ],
        []
    )

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
        manualFiltering: true, //turn off built-in client-side filtering
        manualPagination: true, //turn off built-in client-side pagination
        manualSorting: true, //turn off built-in client-side sorting
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateBuilding,
        onEditingRowSave: handleUpdateBuilding,
        renderRowActions: ({ row, table }) => {
            if (!row?.original) return null; // Evita errores si row no está bien definido

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