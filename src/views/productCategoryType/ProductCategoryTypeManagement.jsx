import ProductCategoryTypeBanner from "./ProductCategoryTypeBanner.jsx";
import useProductCategoryTypeData from "../../hooks/apiData/productCategoryType/productCategoryTypeData.jsx";
import {useEffect, useMemo, useState} from "react";
import {
    deleteLocationNumber,
    saveLocationNumber,
    updateLocationNumber
} from "../../api/locationNumber_API/locationNumber_API.js";
import {toast} from "react-hot-toast";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    deleteProductCategoryType, saveProductCategoryType,
    updateProductCategoryType
} from "../../api/productCategoryType/productCategoryType_API.js";


const ProductCategoryTypeManagement = () => {

    const {productCategoryTypes, isError, isLoading, refetch} = useProductCategoryTypeData();
    const [productCategoryTypeData, setProductCategoryTypeData] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if(productCategoryTypes) setProductCategoryTypeData(productCategoryTypes.data);
    }, [productCategoryTypes]);

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80, enableEditing: false },
            { accessorKey: "name", header: "Nombre", enableEditing: true },
            { accessorKey: "description", header: "Descripción", enableEditing: true },
        ],
        []
    )

    const validateProductCategoryType = (values) => {
        if (!values.name) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        if (!values.description) {
            toast.error("La descripción no puede estar vacía.");
            return false;
        }
        return true;
    }

    const handleCreateProductCategoryType= async ({ values, table }) => {
        if (!validateProductCategoryType(values)) return;
        try {
            const response = await saveProductCategoryType({
                name: values.name,
                description: values.description
            });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleDeleteProductCategoryType  = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteProductCategoryType(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleUpdateProductCategoryType = async ({ values, row }) => {
        if (!validateProductCategoryType(values)) return;
        try {
            const response = await updateProductCategoryType(row.original.id, {
                name: values.name,
                description: values.description
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
        data: productCategoryTypeData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateProductCategoryType,
        onEditingRowSave: handleUpdateProductCategoryType,
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
            <ProductCategoryTypeBanner
                title="Gestión de Tipo de Categorías de Producto"
                visibleButtons={["goBack", "createProductCategoryType"]}
                createProductCategoryType={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Tipo de Categoría de Producto"}
                          bodyText={"¿Estás seguro que deseas eliminar este Tipo de Categoría de Producto?"}
                          onButtonClick={handleDeleteProductCategoryType} />
        </>
    )
}

export default ProductCategoryTypeManagement