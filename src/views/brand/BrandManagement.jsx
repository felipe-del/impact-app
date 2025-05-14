/**
 * BrandManagement Component
 * 
 * This component manages the brand data, allowing users to create, update, and delete brands.
 * It uses Material React Table for displaying the data and MUI for styling.
 * It also includes a modal for confirming deletion of brands.
 */
import useBrandData from "../../hooks/apiData/brandData/BrandData.jsx";
import { useState, useMemo, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import BrandBanner from "./BrandBanner.jsx";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-hot-toast";
import { deleteBrand, saveBrand, updateBrand } from "../../api/brand/brand_API.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

/**
 * BrandManagement component that manages brand data.
 * 
 * @component
 * @returns {JSX.Element} - The BrandManagement component.
 */
const BrandManagement = () => {
    const { brands, isLoading, isError, refetch } = useBrandData();
    const [data, setData] = useState([]);

    const [rowToEdit, setRowToEdit] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    useEffect(() => {
        if (brands?.data && Array.isArray(brands.data)) {
            setData(brands.data);
        } else {
            setData([]);
        }
    }, [brands]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
        { accessorKey: "name", header: "Nombre", enableEditing: true },
    ], []);

    /**
     * Handles the creation of a new brand.
     * 
     * @param {object} values - The values of the new brand.
     * @param {object} table - The table instance.
     * @returns {void}
     */
    const handleCreateBrand = async ({ values, table }) => {
        if (!values.name) {
            toast.error("El nombre no puede estar vacío.");
            return;
        }
        try {
            const response = await saveBrand({ name: values.name });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Handles the deletion of a brand.
     * 
     * @param {void}
     * @returns {void}
     */
    const handleDeleteBrand = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteBrand(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            // update list
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Handles the update of a brand.
     * 
     * @param {object} values - The updated values of the brand.
     * @param {object} row - The row instance.
     * @returns {void}
     */
    const handleUpdateBrand = async ({ values, row }) => {
        if (!values.name || !row?.original?.id) {
            toast.error("Error al actualizar: datos inválidos.");
            return;
        }
        try {
            const response = await updateBrand(row.original.id, { name: values.name });
            toast.success(response.message);
            setData((prevData) =>
                prevData.map((brand) => (brand.id === response.data.id ? response.data : brand))
            );
            table.setEditingRow(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

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
        onCreatingRowSave: handleCreateBrand,
        onEditingRowSave: handleUpdateBrand,
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
        <div>
            {isLoading && <LoadingPointsSpinner />}
            <BrandBanner
                title="Gestión de Marcas"
                createBrandMethod={() => table.setCreatingRow(true)}
                visibleButtons={["createBrand", "goBack"]}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Marca"}
                          bodyText={"¿Estás seguro que deseas eliminar esta marca?"}
                          onButtonClick={handleDeleteBrand} />
        </div>
    );
};

export default BrandManagement;
