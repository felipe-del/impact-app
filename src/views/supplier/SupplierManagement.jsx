/**
 * SupplierManagement Component
 * 
 * This component is used to manage suppliers in the system.
 * It includes functionalities to create, update, and delete suppliers.
 * It also displays a table with the list of suppliers and their details.
 * It uses Material-UI for styling and icons.
 * It also includes a modal for displaying confirmation messages.
 * It uses the Material React Table library for displaying the table.
 */
import useSupplierData from "../../hooks/apiData/supplierData/SupplierData.jsx";
import {useEffect, useMemo, useState} from "react";
import useEntityTypeData from "../../hooks/apiData/entityType/entityTypeData.jsx";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {toast} from "react-hot-toast";
import {deleteSupplier, saveSupplier, updateSupplier} from "../../api/supplier/Supplier_API.js";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {Box, IconButton, MenuItem, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import SupplierBanner from "./SupplierBanner.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

const entityTypesStatic = [
    { value: 'PHYSICAL', label: 'Fisica' },
    { value: 'LEGAL', label: 'Jurídica' },
];


/**
 * This component manages the suppliers in the system.
 * 
 * @component
 * @return {JSX.Element} - The SupplierManagement component.
 */
const SupplierManagement = () => {

    const { suppliers, isLoading, isError, refetch } = useSupplierData();
    const {
        entityTypes,
        isLoading: isLoadingEntityTypes,
        isError: isErrorEntityTypes } = useEntityTypeData();

    const [suppliersData, setSuppliersData] = useState([]);
    const [entityTypesData, setEntityTypesData] = useState([]);

    const [rowToEdit, setRowToEdit] = useState(null);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect( () => {
        if (suppliers?.data && Array.isArray(suppliers.data)) setSuppliersData(suppliers.data);
        if (entityTypes?.data && Array.isArray(entityTypes.data)) setEntityTypesData(entityTypes.data);
    } , [suppliers, entityTypes]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false },
        { accessorKey: "idNumber", header: "Número de identificación", enableEditing: true },
        { accessorKey: "name", header: "Nombre", enableEditing: true },
        { accessorKey: "phone", header: "Teléfono", enableEditing: true },
        { accessorKey: "email", header: "Email", enableEditing: true },
        { accessorKey: "address", header: "Dirección", enableEditing: true },
        { accessorKey: "entityTypeName", header: "Tipo de entidad", enableEditing: true,
            muiEditTextFieldProps: {
                select: true,
                children: entityTypesStatic.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                        {type.label}
                    </MenuItem>
                )),
            },
        },
        { accessorKey: "clientContact", header: "Contacto de cliente", enableEditing: true },

    ], []);

    /**
     * Validates the supplier data.
     * 
     * @param {object} values - The supplier data to validate.
     * @return {boolean} - Returns true if the data is valid, false otherwise.
     */
    const validateSupplier = (values) => {
        const errors = [];
        if (!values.name) errors.push("El nombre no puede estar vacío.");
        if (!values.phone) errors.push("El teléfono no puede estar vacío.");
        if (!values.email) errors.push("El email no puede estar vacío.");
        if (!values.address) errors.push("La dirección no puede estar vacía.");
        if (!values.entityTypeName) errors.push("El tipo de entidad no puede estar vacío.");
        if (!values.clientContact) errors.push("El contacto de cliente no puede estar vacío.");
        if (!values.idNumber) errors.push("El número de identificación no puede estar vacío.");
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return;
        }
        return true;
    }

    /**
     * Handles the creation of a new supplier.
     * 
     * @param {object} values - The supplier data to create.
     * @param {object} table - The table instance.
     * @return {Promise<void>} - A promise that resolves when the supplier is created.
     */
    const handleCreateSupplier = async ({ values, table }) => {

        if (!validateSupplier(values)) return;

        try {
            const response = await saveSupplier({
                name: values.name,
                phone: values.phone,
                email: values.email,
                address: values.address,
                entityTypeName: values.entityTypeName,
                clientContact: values.clientContact,
                idNumber: values.idNumber,
            });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (e) {
            toast.error(e.message);
        }
    }

    /**
     * Handles the update of an existing supplier.
     * 
     * @param {object} values - The supplier data to update.
     * @param {object} table - The table instance.
     * @return {Promise<void>} - A promise that resolves when the supplier is updated.
     */
    const handleUpdateSupplier = async ({ values, table }) => {
        if (!validateSupplier(values)) return;
        try {
            const response = await updateSupplier(values.id, {
                name: values.name,
                phone: values.phone,
                email: values.email,
                address: values.address,
                entityTypeName: values.entityTypeName,
                clientContact: values.clientContact,
                idNumber: values.idNumber,
            });
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (e) {
            toast.error(e.message);
        }
    }

    /**
     * Handles the deletion of a supplier.
     * 
     * @param {void}
     * @return {Promise<void>} - A promise that resolves when the supplier is deleted.
     */
    const handleDeleteSupplier = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteSupplier(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: suppliersData || [],
        updateData: setSuppliersData,
        keyField: "id",
        createDisplayMode: "modal",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        //manualFiltering: true,
        //manualSorting: true,
        //manualPagination: true,
        manualGrouping: true,
        initialState: { columnVisibility: { id: false, address: false, idNumber: false  }, density: "comfortable", pagination: { pageSize: 15 } },
        onCreatingRowSave: handleCreateSupplier,
        onEditingRowSave: handleUpdateSupplier,
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

    if (isError) return <p>Error al cargar los proveedores.</p>;
    return (
        <div>
            {isLoading && <LoadingPointsSpinner />}
            {isLoadingEntityTypes && <LoadingPointsSpinner />}
            {isLoadingEntityTypes && <LoadingPointsSpinner />}
            <SupplierBanner
                title="Gestión de Proveedores"
                visibleButtons={["createSupplier", "goBack"]}
                createBrandMethod={() => table.setCreatingRow(true)} />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Proveedor"}
                          bodyText={"¿Estás seguro que deseas eliminar este Proveedor?"}
                          onButtonClick={handleDeleteSupplier} />
        </div>
    );
}

export default SupplierManagement