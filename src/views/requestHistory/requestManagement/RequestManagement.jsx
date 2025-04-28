import RequestManagementBanner from "./RequestManagementBanner.jsx";
import {useEffect, useMemo, useState} from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {MRT_Localization_ES} from "material-react-table/locales/es";
import GenericModal from "../../../components/popUp/generic/GenericModal.jsx";
import {
    acceptAssetRequest,
    getAssetRequestsWithEarring,
    rejectAssetRequest
} from "../../../api/assetRequest/assetRequest_API.js";
import {
    acceptProductRequest,
    getProductRequestsWithEarring,
    rejectProductRequest
} from "../../../api/productRequest/productRequest.js";
import {
    acceptSpaceRequest,
    getSpaceRequestsWithEarring,
    rejectSpaceRequest
} from "../../../api/SpaceRndR/spaceRndR_API.js";
import RequestButton from "../../../components/button/RequestButton.jsx";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import {StatusTranslator} from "../../../util/Translator.js";
import {getStateIcon} from "../../../util/SelectIconByStatus.jsx";
import {getStateColor} from "../../../util/SelectColorByStatus.js";
import LoadingPointsSpinner from "../../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {gradientMapping as toastr} from "../../../style/codeStyle.js";
import {toast} from "react-hot-toast";

const RequestManagement = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editRowId, setEditRowId] = useState(null);
    const [tempRequest, setTempRequest] = useState({});
    const [showConfirmationAcceptModal, setShowConfirmationAcceptModal] = useState(false);
    const [showConfirmationRejectModal, setShowConfirmationRejectModal] = useState(false);
    const handleShowConfirmationAcceptModal = () => setShowConfirmationAcceptModal(true);
    const handleHideConfirmationAcceptModal = () => setShowConfirmationAcceptModal(false);

    const handleShowConfirmationRejectModal = () => setShowConfirmationRejectModal(true);
    const handleHideConfirmationRejectModal = () => setShowConfirmationRejectModal(false);

    const cancelEditing = () => {
        setEditRowId(null);
        setTempRequest({});
    };

    const startEditing = (rowId, currentRequest) => {
        setEditRowId(rowId);
        setTempRequest(prev => ({ ...prev, [rowId]: currentRequest }));
    };

    const handleEdit = (row) => {
        startEditing(row.original.id, row.original);
    };

    const fetchAllRequests = async () => {
        try {
            const [assetEarring, productEarring, spaceEarring] = await Promise.all([
                getAssetRequestsWithEarring(),
                getProductRequestsWithEarring(),
                getSpaceRequestsWithEarring()
            ]);

            const assetRequests = assetEarring?.data?.map(req => ({ ...req, tipo: "Activo" })) || [];
            const productRequests = productEarring?.data?.map(req => ({ ...req, tipo: "Producto" })) || [];
            const spaceRequests = spaceEarring?.data?.map(req => ({ ...req, tipo: "Espacio" })) || [];

            setRequests([...assetRequests, ...productRequests, ...spaceRequests]);
        } catch (error) {
            console.error("Error al cargar solicitudes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllRequests();
    }, []);

    const saveChanges = async (rowId) => {
        const request = tempRequest[rowId];
        let response
        try {
            if (request.tipo === "Activo") {
                response = await acceptAssetRequest(request.id);
            } else if (request.tipo === "Producto") {
                response = await acceptProductRequest(request.id);
            } else if (request.tipo === "Espacio") {
                response = await acceptSpaceRequest(request.id);
            }
            toast.success(response.message);
            setRequests(prev => prev.filter(r => r.id !== request.id));
            cancelEditing();
        } catch (error) {
            console.error("Error al aprobar solicitud", error);
        } finally {
            handleHideConfirmationAcceptModal();
        }
    };

    const rejectChanges = async (rowId) => {
        const request = tempRequest[rowId];
        let response
        try {
            if (request.tipo === "Activo") {
                response = await rejectAssetRequest(request.id);
            } else if (request.tipo === "Producto") {
                response = await rejectProductRequest(request.id);
            } else if (request.tipo === "Espacio") {
                response = await rejectSpaceRequest(request.id);
            }
            toast.success(response.message);
            setRequests(prev => prev.filter(r => r.id !== request.id));
            cancelEditing();
        } catch (error) {
            console.error("Error al cancelar solicitud", error);
        } finally {
            handleHideConfirmationAcceptModal();
        }
    };


    const columns = useMemo(() => [
        {
            accessorKey: 'tipo',
            header: 'Tipo de Solicitud',
            size: 120,
            Cell: ({row}) => {
                const tipo = row.original.tipo;
                return (
                    <Typography
                        sx={{
                            color:
                                tipo === 'Activo' ? 'primary.main' :
                                    tipo === 'Producto' ? 'success.main' :
                                        tipo === 'Espacio' ? 'warning.main' : 'text.primary',
                            fontFamily: 'Montserrat, sans-serif',
                        }}
                    >
                        {getStateIcon(tipo)} {tipo}
                    </Typography>
                )
            }
        },
        {
            accessorKey: "id",
            header: "ID Solicitud",
            size: 80,
        },
        {
            accessorKey: "user.name",
            header: "Usuario",
            size: 150,
        },
        {
            accessorFn: (row) =>
                row.tipo === "Espacio" ? row.eventObs : row.reason,
            header: "Motivo",
            size: 200,
        },
        {
            accessorFn: (row) =>
                row.tipo === "Activo"
                    ? row.asset?.subcategory?.name
                    : row.tipo === "Producto"
                        ? row.product?.category?.name
                        : row.space?.name,
            id: "recurso",
            header: "Recurso",
            size: 200,
        },
        {
            accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
            id: "fecha",
            header: "Fecha de Solicitud",
            size: 120,
        },
        {
            accessorKey: 'status.name',
            header: 'Estado',
            Cell: ({row}) => {
                const status = row.original.status;
                const translatedStatus = StatusTranslator.translate(status.name);
                return (
                    <Typography
                        sx={{
                            color: getStateColor(translatedStatus),
                            fontFamily: 'Montserrat, sans-serif',
                        }}
                    >
                        {getStateIcon(translatedStatus)} {translatedStatus}
                    </Typography>
                )
            }
        },
        {
            accessorKey: 'actions',
            header: 'Acciones',
            size: 'small',
            enableSorting: false,
            enableColumnFilter: false,
            enableHiding: false,
            Cell: ({ row }) => (
                editRowId === row.original.id ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '10px',
                        flexWrap: 'wrap'
                    }}>
                        {/* Botón Aprobar */}
                        <Tooltip title="Aprobar" arrow>
                            <IconButton
                                onClick={handleShowConfirmationAcceptModal}
                                color="success"
                                style={{
                                    width: '90px',
                                    height: '34px',
                                    borderRadius: '8px 8px 8px 8px',
                                    padding: '0',
                                    backgroundColor: '#4caf50',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    transition: 'width 0.2s ease-in-out',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <CheckIcon style={{ fontSize: '16px', color: 'white', marginRight: '6px' }} />
                                <Typography variant="caption" style={{ color: 'white', fontSize: '12px', fontFamily: 'Montserrat' }}>Aprobar</Typography>
                            </IconButton>
                        </Tooltip>

                        {/* Botón Rechazar */}
                        <Tooltip title="Rechazar" arrow>
                            <IconButton
                                onClick={handleShowConfirmationRejectModal}
                                color="error"
                                style={{
                                    width: '90px',
                                    height: '34px',
                                    borderRadius: '8px 8px 8px 8px',
                                    padding: '0',
                                    backgroundColor: '#f44336',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    transition: 'width 0.2s ease-in-out',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <CloseIcon style={{ fontSize: '16px', color: 'white', marginRight: '6px' }} />
                                <Typography variant="caption" style={{ color: 'white', fontSize: '12px', fontFamily: 'Montserrat' }}>Rechazar</Typography>
                            </IconButton>
                        </Tooltip>
                    </div>

                ) : (
                    <RequestButton handleEdit={handleEdit} row={row} />
                )
            ),
        },
    ], [editRowId]);

    const renderDetailPanel = ({row}) => {
        const data = row.original;
        const tipo = data.tipo;

        // Función para renderizar detalles comunes
        const renderCommonDetails = (items) => {
            return items.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        background: "rgba(255, 255, 255, 0.1)",
                        padding: "8px",
                        borderRadius: "10px",
                        textAlign: "left",
                        boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.1)",
                        transition: "0.3s ease-in-out",
                        "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.3)",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            color: "#f8f9fa",
                            fontFamily: '"Montserrat", sans-serif',
                        }}
                    >
                        {item.label}
                    </Typography>
                    <Typography sx={{fontFamily: '"Montserrat", sans-serif'}}>
                        {item.value ?? "N/A"}
                    </Typography>
                </Box>
            ));
        };

        // Detalles específicos de tipo "Activo"
        if (tipo === "Activo") {
            return (
                <Box
                    sx={{
                        display: "grid",
                        margin: "auto",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        width: "100%",
                        padding: "20px",
                        background: "linear-gradient(135deg, #003c74 0%, #005DA4 100%)",
                        borderRadius: "15px",
                        boxShadow: "0px 4px 10px rgba(0, 93, 164, 0.3)",
                        color: "#f8f9fa",
                        fontFamily: '"Montserrat", sans-serif',
                        letterSpacing: "0.5px",
                        gap: "15px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    {renderCommonDetails([
                        { label: 'ID de Solicitud', value: data.id },
                        { label: 'Tipo de Solicitud', value: data.tipo },
                        { label: 'Fecha de Creación', value: data.createdAt },
                        { label: 'Estado de la Solicitud', value: StatusTranslator.translate(data.status?.name) },
                        { label: 'Razón', value: data.reason },
                        { label: 'Fecha de Expiración', value: data.expirationDate },
                        { label: 'Placa', value: data.asset?.plateNumber },
                        { label: 'Fecha de Compra', value: data.asset?.purchaseDate },
                        { label: 'Valor', value: `${data.asset?.value} ${data.asset?.currency?.symbol}` },
                        { label: 'Usuario Responsable', value: data.asset?.user?.email },
                        { label: 'Proveedor', value: data.asset?.supplier?.name },
                        { label: 'Categoría', value: data.asset?.category?.name },
                        { label: 'Subcategoría', value: data.asset?.subcategory?.name },
                        { label: 'Marca', value: data.asset?.brand?.name },
                        { label: 'Estado del Activo', value: StatusTranslator.translate(data.asset?.status?.name) },
                        { label: 'Modelo', value: data.asset?.model?.modelName },
                        { label: 'Tipo de Moneda', value: `${data.asset?.currency?.stateName} - ${data.asset?.currency?.code} - ${data.asset?.currency?.symbol}` },
                        { label: 'Serie', value: data.asset?.assetSeries },
                        { label: 'Ubicación', value: data.asset?.locationNumber?.locationTypeName },
                    ])}


                </Box>
            );
        }

        // Detalles específicos de tipo "Producto"
        if (tipo === "Producto") {
            return (
                <Box
                    sx={{
                        display: "grid",
                        margin: "auto",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        width: "100%",
                        padding: "20px",
                        background: "linear-gradient(135deg, #003c74 0%, #005DA4 100%)",
                        borderRadius: "15px",
                        boxShadow: "0px 4px 10px rgba(0, 93, 164, 0.3)",
                        color: "#f8f9fa",
                        fontFamily: '"Montserrat", sans-serif',
                        letterSpacing: "0.5px",
                        gap: "15px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    {renderCommonDetails([
                        { label: "ID de Producto", value: data.product?.id },
                        { label: "Fecha de Compra", value: data.product?.purchaseDate },
                        { label: "Fecha de Expiración", value: data.product?.expiryDate ?? "N/A" },
                        { label: "Categoría", value: data.product?.category?.name },
                        { label: "Tipo de Categoría", value: data.product?.category?.categoryType?.name },
                        { label: "Unidad de Medida", value: `${data.product?.category?.unitOfMeasurement?.name} (${data.product?.category?.unitOfMeasurement?.abbreviation})` },
                        { label: "Estado del Producto", value: StatusTranslator.translate(data.product?.status?.name) },
                        { label: "Estado de la Solicitud", value: StatusTranslator.translate(data.status?.name) },
                        { label: "Razón", value: data.reason },
                        { label: "Usuario", value: data.user?.name },
                        { label: "Correo del Usuario", value: data.user?.email },
                        { label: "Tipo de Usuario", value: data.user?.userRoleResponse?.roleName },
                        { label: "Fecha de Creación", value: data.createdAt },
                    ])}

                </Box>
            );
        }

        // Detalles específicos de tipo "Espacio"
        if (tipo === "Espacio") {
            return (
                <Box
                    sx={{
                        display: "grid",
                        margin: "auto",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        width: "100%",
                        padding: "20px",
                        background: "linear-gradient(135deg, #003c74 0%, #005DA4 100%)",
                        borderRadius: "15px",
                        boxShadow: "0px 4px 10px rgba(0, 93, 164, 0.3)",
                        color: "#f8f9fa",
                        fontFamily: '"Montserrat", sans-serif',
                        letterSpacing: "0.5px",
                        gap: "15px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    {renderCommonDetails([
                        { label: "ID de Solicitud", value: data.id },
                        { label: "Espacio", value: data.space?.name },
                        { label: "Código del Espacio", value: data.space?.spaceCode },
                        { label: "Ubicación del Edificio", value: data.space?.buildingLocationResponse?.building?.name },
                        { label: "Piso", value: data.space?.buildingLocationResponse?.floor },
                        { label: "Capacidad Máxima", value: data.space?.maxPeople },
                        { label: "Horario de Apertura", value: data.space?.openTime },
                        { label: "Horario de Cierre", value: data.space?.closeTime },
                        { label: "Estado del Espacio", value: StatusTranslator.translate(data.space?.spaceStatus?.name) },
                        { label: "Cantidad de Personas", value: data.numPeople },
                        { label: "Descripción del Evento", value: data.eventDesc },
                        { label: "Observaciones", value: data.eventObs },
                        { label: "Solicita Equipos", value: data.useEquipment ? "Sí" : "No" },
                        { label: "Usuario Solicitante", value: data.user?.name },
                        { label: "Correo del Usuario", value: data.user?.email },
                        { label: "Rol del Usuario", value: data.user?.userRoleResponse?.roleName },
                        { label: "Estado de la Solicitud", value: StatusTranslator.translate(data.status?.name) },
                        { label: "Fecha de Creación", value: data.createdAt },
                    ])}

                </Box>
            );
        }

        return null;
    };

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: requests,
        enableExpandAll: false,
        initialState: {
            columnVisibility: { id: false },
            density: "comfortable",
            pagination: { pageSize: 5 },
        },
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === "dark"
                        ? "rgba(255,210,244,0.1)"
                        : "rgba(0,0,0,0.1)",
            }),
        }),
        muiExpandButtonProps: ({row, table}) => ({
            onClick: () => table.setExpanded({[row.id]: !row.getIsExpanded()}),
            sx: {
                transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
                transition: "transform 0.2s",
            },
        }),
        renderDetailPanel,
    });

    return (
        <>
            {loading && <LoadingPointsSpinner />}

            <RequestManagementBanner title={"Solicitudes pendientes por gestionar"} visibleButtons={["goBack", "info"]} />

            <MaterialReactTable table={table} />

            <GenericModal
                show={showConfirmationAcceptModal}
                onHide={handleHideConfirmationAcceptModal}
                title="¿Desea aprobar la solicitud?"
                bodyText="Esta acción no se puede deshacer."
                onButtonClick={() => saveChanges(editRowId)}
            />

            <GenericModal
                show={showConfirmationRejectModal}
                onHide={handleHideConfirmationRejectModal}
                title="¿Desea rechazar la solicitud?"
                bodyText="Esta acción no se puede deshacer."
                onButtonClick={() => rejectChanges(editRowId)}
            />
        </>
    );
};

export default RequestManagement;
