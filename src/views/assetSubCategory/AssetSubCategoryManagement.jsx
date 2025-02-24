import AssetSubCategoryBanner from "./AssetSubCategoryBanner.jsx";
import useAssetSubCategory from "../../hooks/apiData/assetSubCategory/AssetSubCategoryData.jsx";
import {useEffect, useMemo, useState} from "react";
import {toast} from "react-hot-toast";
import {deleteSubCategory, saveSubCategory, updateSubCategory} from "../../api/assetSubCategory/subCategory_API.js";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, MenuItem, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import useAssetCategory from "../../hooks/apiData/assetCategory/AssetCategoryData.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";


const AssetSubCategoryManagement = () => {

    const { assetSubCategory, isLoading, isError, refetch } = useAssetSubCategory();
    const [data, setData] = useState([]);
    const { assetCategories} = useAssetCategory();
    const [assetCategoriesData, setAssetCategoriesData] = useState([]);

    const [rowToEdit, setRowToEdit] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (assetSubCategory?.data && Array.isArray(assetSubCategory.data)) {
            setData(assetSubCategory.data);
        }
        if (assetCategories?.data && Array.isArray(assetCategories.data)) {
            setAssetCategoriesData(assetCategories.data);
        }
        console.log(assetCategoriesData);
    }, [assetSubCategory, assetCategoriesData]);

    const columns = useMemo(() => {
        // Check if assetCategoriesData has been populated
        if (!assetCategoriesData.length) {
            return []; // Return an empty array or you can handle loading state here
        }

        return [
            { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
            { accessorKey: "name", header: "Nombre", enableEditing: true },
            { accessorKey: "description", header: "Descripción", enableEditing: true },
            {
                accessorKey: "assetCategoryName",
                header: "Categoría de Activo",
                enableEditing: true,
                muiEditTextFieldProps: {
                    select: true,
                    children: assetCategoriesData.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.name}
                        </MenuItem>
                    )),
                },
            },
        ];
    }, [assetCategoriesData]); // Add assetCategoriesData as a dependency

    const validateAssetSubCategory = (values) => {
        if (!values.name) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        if (!values.description) {
            toast.error("La descripción no puede estar vacía.");
            return false;
        }
        if (!values.assetCategoryName) {
            toast.error("La categoría de activo no puede estar vacía.");
            return false;
        }
        return true;
    }

    const handleCreateAssetSubCategory = async ({ values, table }) => {
        if (!validateAssetSubCategory(values)) return;
        try {
            const response = await saveSubCategory({ name: values.name, description: values.description, assetCategoryId: values.assetCategoryName });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleDeleteAssetSubCategory = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteSubCategory(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleUpdateAssetSubCategory = async ({ values, row }) => {
        if (!validateAssetSubCategory(values)) return;
        try {
            const response = await updateSubCategory(row.original.id, {name: values.name, description: values.description, assetCategoryId: values.assetCategoryName });
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const table = useMaterialReactTable({
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
        onCreatingRowSave: handleCreateAssetSubCategory,
        onEditingRowSave: handleUpdateAssetSubCategory,
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
            <AssetSubCategoryBanner
                title={"Sub-Categorías de Activos"}
                visibleButtons={["goBack", "createAssetSubCategory"]}
                createAssetSubCategory={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Sub-Categoría de Activo"}
                          bodyText={"¿Estás seguro que deseas eliminar esta sub-categoría de activo?"}
                          onButtonClick={handleDeleteAssetSubCategory}
            />
        </>
    );
}

export default AssetSubCategoryManagement;