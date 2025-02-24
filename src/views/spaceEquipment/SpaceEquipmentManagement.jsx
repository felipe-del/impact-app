import SpaceEquipmentBanner from "./SpaceSquipmentBanner.jsx";
import useSpaceEquipmentData from "../../hooks/apiData/spaceEquipment/SpaceEquipmentData.jsx";
import {useEffect, useMemo, useState} from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {toast} from "react-hot-toast";
import {
    deleteSpaceEquipment,
    saveSpaceEquipment,
    updateSpaceEquipment
} from "../../api/space_equipment/SpaceEquipment_API.js";
import {Box, IconButton, MenuItem, Tooltip, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import useSpaceData from "../../hooks/apiData/space/SpaceData.jsx";
import useBrandData from "../../hooks/apiData/brandData/BrandData.jsx";
import PropTypes from "prop-types";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";


const DetailItem = ({ label, value = "N/A" }) => (
    <Box
        sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '8px',
            borderRadius: '10px',
            textAlign: 'left',
            boxShadow: '0px 2px 5px rgba(255, 255, 255, 0.1)',
            transition: '0.3s ease-in-out',
            '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.3)',
            },
        }}
    >
        <Typography sx={{ fontWeight: 'bold', color: '#f8f9fa', fontFamily: '"Montserrat", sans-serif' }}>
            {label}
        </Typography>
        <Typography sx={{ fontFamily: '"Montserrat", sans-serif' }}>
            {value ?? "N/A"}
        </Typography>
    </Box>
);

DetailItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
const SpaceEquipmentManagement = () => {

    const { spaceEquipment, isError, isLoading, refetch } = useSpaceEquipmentData();
    const { space } = useSpaceData();
    const { brands } = useBrandData();

    const [spaceEquipmentData, setSpaceEquipmentData] = useState([]);
    const [spaceData, setSpaceData] = useState([]);
    const [brandsData, setBrandsData] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = (row) => {
        setRowToEdit(row)
        setShowConfirmationModal(true);
    }
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (spaceEquipment) setSpaceEquipmentData(spaceEquipment.data);
        if (space) setSpaceData(space.data);
        if (brands) setBrandsData(brands.data);
    }, [spaceEquipment, space, brands]);

    const validateAssetEquipment = (values) => {
        if (!values.name) {
            toast.error("El nombre no puede estar vacío.");
            return false;
        }
        if (!values.quantity) {
            toast.error("La cantidad no puede estar vacía.");
            return false;
        }
        return true;
    }

    const handleCreateSpaceEquipment = async ({ values, table }) => {
        if (!validateAssetEquipment(values)) return;
        const brandId = brandsData.find(brand => brand.name === values["brandResponse.name"])?.id;
        const spaceId = spaceData.find(space => space.name === values["spaceResponse.name"])?.id;
        try {
            const response = await saveSpaceEquipment({
                name: values.name,
                brandId: brandId,
                spaceId: spaceId,
                quantity: values.quantity
            });
            toast.success(response.message);
            table.setCreatingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleDeleteSpaceEquipment = async () => {
        if (!rowToEdit?.original?.id) {
            toast.error("Error al eliminar: ID no encontrado.");
            return;
        }
        try {
            const response = await deleteSpaceEquipment(rowToEdit.original.id);
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleUpdateSpaceEquipment = async ({ values, row }) => {
        if (!validateAssetEquipment(values)) return;
        const brandId = brandsData.find(brand => brand.name === values["brandResponse.name"])?.id;
        const spaceId = spaceData.find(space => space.name === values["spaceResponse.name"])?.id;
        try {
            const response = await updateSpaceEquipment(row.original.id, {
                name: values.name,
                brandId: brandId,
                spaceId: spaceId,
                quantity: values.quantity
            });
            toast.success(response.message);
            table.setEditingRow(null);
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
        { accessorKey: "name", header: "Nombre", enableEditing: true },
        { accessorKey: "quantity", header: "Cantidad", enableEditing: true,
        muiEditTextFieldProps: {
            type: "number",
            inputProps: { min: 0 }
        }},
        { accessorKey: "brandResponse.name", header: "Marca", enableEditing: true,
            muiEditTextFieldProps: ({ row }) => ({
                select: true,
                defaultValue: row.original.brandResponse?.id || "",
                children: brandsData.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                        {type.name}
                    </MenuItem>
                )),
            }),
        },
        {
            accessorKey: "spaceResponse.name", header: "Espacio", enableEditing: true,
            muiEditTextFieldProps: ({ row }) => ({
                select: true,
                defaultValue: row.original.spaceResponse?.id || "",
                children: spaceData.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                        {type.name}
                    </MenuItem>
                )),
            }),
        }


    ], [brandsData, spaceData]);

    const table = useMaterialReactTable({
        columns,
        data: spaceEquipmentData || [],
        createDisplayMode: "row",
        enableEditing: true,
        editingMode: "row",
        enableExpandAll: false,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        initialState: { density: "comfortable", pagination: { pageSize: 5 } },
        onCreatingRowSave: handleCreateSpaceEquipment,
        onEditingRowSave: handleUpdateSpaceEquipment,
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
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark' ? 'rgba(255,210,244,0.1)' : 'rgba(0,0,0,0.1)'
            })
        }),
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s'
            }
        }),

        renderDetailPanel: ({ row }) => (
            <Box
                sx={{
                    display: 'grid',
                    margin: 'auto',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    width: '100%',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 10px rgba(0, 93, 164, 0.3)',
                    color: '#f8f9fa',
                    fontFamily: '"Montserrat", sans-serif',
                    letterSpacing: '0.5px',
                    gap: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                {/* Sección: Información del Equipamiento */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f8f9fa', textAlign: 'center', fontFamily: '"Montserrat", sans-serif' }}>
                        Equipamiento
                    </Typography>
                    {[
                        { label: 'ID', value: row.original.id || 'N/A' },
                        { label: 'Nombre', value: row.original.name || 'N/A' },
                        { label: 'Cantidad', value: row.original.quantity || 'N/A' },
                    ].map((item, index) => (
                        <DetailItem key={index} label={item.label} value={item.value} />
                    ))}
                </Box>

                {/* Sección: Espacio donde está el equipamiento */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f8f9fa', textAlign: 'center', fontFamily: '"Montserrat", sans-serif' }}>
                        Espacio
                    </Typography>
                    {[
                        { label: 'Nombre del Espacio', value: row.original.spaceResponse?.name },
                        { label: 'Edificio', value: row.original.spaceResponse?.buildingLocationResponse?.building?.name },
                        { label: 'Número de Piso', value: row.original.spaceResponse?.buildingLocationResponse?.floor },
                    ].map((item, index) => (
                        <DetailItem key={index} label={item.label} value={item.value} />
                    ))}
                </Box>

                {/* Sección: Marca del Equipamiento */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f8f9fa', textAlign: 'center', fontFamily: '"Montserrat", sans-serif' }}>
                        Marca
                    </Typography>
                    {[
                        { label: 'Marca', value: row.original.brandResponse?.name },
                        { label: 'Id', value: row.original.brandResponse?.id },
                    ].map((item, index) => (
                        <DetailItem key={index} label={item.label} value={item.value} />
                    ))}
                </Box>
            </Box>
        ),
    });

    if (isError) return <p>Ha ocurrido un error</p>;

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <SpaceEquipmentBanner
                title="Gestión de Equipamiento de Espacio"
                visibleButtons={["goBack", "createSpaceEquipment"]}
                createSpaceEquipment={() => table.setCreatingRow(true)}
            />
            <MaterialReactTable table={table} />
            <GenericModal show={showConfirmationModal}
                          onHide={handleHideConfirmationModal}
                          title={"Eliminar Equipamiento de Espacio"}
                          bodyText={"¿Estás seguro que deseas eliminar este equipamiento de espacio?"}
                          onButtonClick={handleDeleteSpaceEquipment} />
        </>
    );
}

export default SpaceEquipmentManagement;