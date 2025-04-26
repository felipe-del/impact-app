import {useState, useMemo} from "react";
import {useUser} from "../../../hooks/user/useUser.jsx";
import {getAssetRequestByUser, cancelledAssetRequest} from "../../../api/assetRequest/assetRequest_API.js";
import {getSpaceRandRByUser, cancelResAndReq} from "../../../api/SpaceRndR/spaceRndR_API.js";
import {getProductRequestByUser, cancelledProductRequest} from "../../../api/productRequest/productRequest.js";
import {assetAvailable} from "../../../api/asset/asset_API.js";
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import {MRT_Localization_ES} from 'material-react-table/locales/es';
import LoadingPointsSpinner from "../../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import {toast} from "react-hot-toast";
import GenericModal from "../../../components/popUp/generic/GenericModal.jsx";
import MyRequestsBanner from "./MyRequestsBanner.jsx";
import CancelButton from "../../../components/button/CancelButton.jsx";
import RenewalButton from "../../../components/button/RenewalButton.jsx";
import dayjs from "dayjs";
import {saveAssetRequestRenewal} from "../../../api/assetRequest/assetRequest_API.js";
import {getAssetRequestById} from "../../../api/assetRequest/assetRequest_API.js";
import {updateAssetRequestRenewal} from "../../../api/assetRequest/assetRequest_API.js";
import {Typography} from "@mui/material";
import {gradientMapping} from "../../../style/codeStyle.js";

const MyRequest = () => {
    const user = useUser();
    const [activeButton, setActiveButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [requests, setRequests] = useState([]); // Estado para guardar los datos de la API
    const [loading, setLoading] = useState(false); // Estado para manejar la carga de solicitudes
    const [showRenewModal, setShowRenewModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const [newExpirationDate, setNewExpirationDate] = useState(null); // Estado para la nueva fecha de expiración

    const fetchRequests = async (apiCall) => {
        if (!user?.id) return;
        setLoading(true);
        try {
            const response = await apiCall(user.id);
            setRequests(response.data);
            if (response?.data.length === 0) {
                toast.success("No hay solicitudes pendientes.", {icon: "🔔"});
                return
            }
            toast.success(response.message);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const activeFilters = [];
    if (activeButton) activeFilters.push(activeButton);
    // if (activeAdditionalButton) activeFilters.push(activeButton);
    const handleButtonClick = (buttonKey) => {
        setActiveButton(buttonKey);
        setShowAdditionalButtons(["spaceRequest", "productRequest", "assetRequest"].includes(buttonKey));

        switch (buttonKey) {
            case "assetRequest":
                fetchRequests(getAssetRequestByUser);
                break;
            case "spaceRequest":
                fetchRequests(getSpaceRandRByUser);
                break;
            case "productRequest":
                fetchRequests(getProductRequestByUser);
                break;
            default:
                break;
        }
    };

    const handlePreCancel = (row) => {
        setSelectedRequest(row);
        setShowCancelModal(true);
    };

    const handleCancel = async () => {
        if (!cancelReason.trim()) {
            toast.error("Por favor ingrese una razón de cancelación.", {duration: 7000});
            return;
        }

        setLoading(true);
        try {
            if (selectedRequest.original.asset) {
                await cancelledAssetRequest(selectedRequest.original.id, {cancelReason});
                await assetAvailable(selectedRequest.original.id);
                const response = await getAssetRequestByUser(user.id);
                setRequests(response.data);
            } else if (selectedRequest.original.productName) {
                await cancelledProductRequest(selectedRequest.original.id, {cancelReason});
                const response = await getProductRequestByUser(user.id);
                setRequests(response.data);
            } else if (selectedRequest.original.spaceName) {
                await cancelResAndReq(selectedRequest.original.id, {cancelReason});
                const response = await getSpaceRandRByUser(user.id);
                setRequests(response.data);
            }
            toast.success(`Solicitud cancelada: ${cancelReason}`, {duration: 7000});
        } catch (error) {
            console.error(error);
            toast.error(error.message, {duration: 7000});
        } finally {
            setLoading(false);
            setShowCancelModal(false);
            setCancelReason("");
        }
    };

    const handlePreRenew = (row) => {
        console.log(row);
        setSelectedRequest(row);
        setShowRenewModal(true);
    }

    const renewAction = async () => {
        console.log(selectedRequest);
        let localAssetId;
        let localRequestId;
        const currentExpirationDate = dayjs(selectedRequest.original.expirationDate);
        const newExpiration = dayjs(newExpirationDate);

        // Validar que la nueva fecha de expiración sea posterior a la fecha de expiración actual
        if (newExpiration.isBefore(currentExpirationDate)) {
            toast.error("La nueva fecha de expiración debe ser posterior a la fecha de expiración actual.", {duration: 7000});
            return; // Detener la ejecución si la validación falla
        }

        try {
            const response = await getAssetRequestById(selectedRequest.original.id);
            localRequestId = response.data.id; // Almacena el ID de la solicitud en una variable local
            localAssetId = response.data.asset.id; // Almacena el ID del activo en una variable local
            console.log(localAssetId);
        } catch (e) {
            toast.error(e.message);
            return; // Detener la ejecución si hay un error
        }
        try {
            const response = await saveAssetRequestRenewal({
                assetId: localAssetId, // Usa la variable local en lugar del estado
                reason: selectedRequest.original.reason,
                expirationDate: newExpirationDate, // Usar la nueva fecha de expiración seleccionada
                createdAt: selectedRequest.original.expirationDate,
            });
            toast.success(response.message, {duration: 7000});
            setShowRenewModal(false);
            setNewExpirationDate(null);

            const update = await updateAssetRequestRenewal(localRequestId, {
                assetId: localAssetId,
                status: "Pendiente de renovacion.",
                reason: selectedRequest.original.reason,
                expirationDate: selectedRequest.original.expirationDate,
            });
            toast.success(update.message, {duration: 7000});

            // Actualizar la tabla después de la renovación
            const updatedRequests = await getAssetRequestByUser(user.id);
            setRequests(updatedRequests.data);
        } catch (e) {
            toast.error(e.message);
        }
    };

    // Columnas y datos para cada tipo de solicitud
    const spaceRequestColumns = [
        {accessorKey: 'id', header: 'Id'},
        {accessorKey: 'maxPeople', header: 'Número de personas'},
        {accessorKey: 'spaceName', header: 'Espacio'},
        {accessorKey: 'building', header: 'Ubicación'},
        {accessorKey: 'eventDesc', header: 'Descripción del evento'},
        {accessorKey: 'eventObs', header: 'Observaciones del evento'},
        {accessorKey: 'startTime', header: 'Hora de inicio'},
        {accessorKey: 'endTime', header: 'Hora de finalización'},
        {accessorKey: 'status', header: 'Estado'},
        {
            id: 'actions',
            header: 'Acciones',
            size: 'small',
            Cell: ({ row }) => {
                const status = row.original.status;

                if (status === "Ha sido cancelada.") {
                    return (
                        <div style={canceledButtonStyle}>
                            <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>
                                Cancelado
                            </Typography>
                        </div>
                    );
                }

                if (status === "Ha sido aceptado.") {
                    return (
                        <div style={acceptButtonStyle}>
                            <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>
                                Aceptado
                            </Typography>
                        </div>
                    );
                }

                // Para otros estados (pendiente, por renovar, etc.)
                return (
                    <CancelButton handleCancel={handlePreCancel} row={row} />
                );
            }
        },
    ];

    const productRequestColumns = [
        {accessorKey: 'id', header: 'ID'},
        {accessorKey: 'productName', header: 'Nombre de Producto'},
        {accessorKey: 'productId', header: 'Id del producto'},
        {accessorKey: 'user', header: 'Usuario Responsable'},
        {accessorKey: 'reason', header: 'Razón'},
        {accessorKey: 'createdAt', header: 'Fecha de Solicitud'},
        {accessorKey: 'status', header: 'Estado'},
        {
            id: 'actions',
            header: 'Acciones',
            size: 'small',
            Cell: ({ row }) => {
                const status = row.original.status;

                if (status === "Ha sido cancelada.") {
                    return (
                        <div style={canceledButtonStyle}>
                            <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>
                                Cancelado
                            </Typography>
                        </div>
                    );
                }

                if (status === "Ha sido aceptado.") {
                    return (
                        <div style={acceptButtonStyle}>
                            <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>
                                Aceptado
                            </Typography>
                        </div>
                    );
                }

                // Para otros estados (pendiente, por renovar, etc.)
                return (
                    <CancelButton handleCancel={handlePreCancel} row={row} />
                );
            }

        },
    ];

    const assetRequestColumns = [
        {accessorKey: 'id', header: 'ID'},
        {accessorKey: 'asset', header: 'Activo'},
        {accessorKey: 'plateNumber', header: 'Placa'},
        {accessorKey: 'user', header: 'Usuario Responsable'},
        {accessorKey: 'reason', header: 'Razón'},
        {accessorKey: 'createdAt', header: 'Fecha de Solicitud'},
        {accessorKey: 'status', header: 'Estado'},
        {
            id: 'actions',
            header: 'Acciones',
            size: 'small',
            Cell: ({row}) => {
                if (row.original.status === "Ha sido cancelada.") {
                    return (
                        <div style={canceledButtonStyle}>
                            <Typography variant="caption" style={{color: 'white', fontFamily: 'Montserrat'}}>
                                Cancelado
                            </Typography>
                        </div>
                    );
                }

                const expirationDate = dayjs(row.original.expirationDate);
                const today = dayjs();
                const daysUntilExpiration = expirationDate.diff(today, 'day');

                return (
                    <>
                        <CancelButton handleCancel={handlePreCancel} row={row}/>
                        {
                            daysUntilExpiration >= 2 && row.original.status === "Ha sido aceptado." && (
                            <RenewalButton renewAction={() => handlePreRenew(row)} row={row}/>
                        )}
                    </>
                );
            }
        },
    ];

    // Transformar los datos según el tipo de solicitud
    const flatRequests = useMemo(() => {
        return requests.map(request => {
            switch (activeButton) {
                case "spaceRequest":
                    return {
                        id: request.reqAndResId,
                        spaceName: request.space?.name,
                        status: request.status.description,
                        building: `${request.space?.buildingLocationResponse?.building.name} - Piso ${request.space?.buildingLocationResponse?.floor}`,
                        maxPeople: request.numPeople,
                        eventDesc: request.eventDesc,
                        eventObs: request.eventObs,
                        startTime: request.startTime || "Cancelado",
                        endTime: request.endTime || "Cancelado",
                    };
                case "productRequest":
                    return {
                        id: request.id,
                        productName: request.product?.category.name,
                        productId: request.product?.id,
                        createdAt: request.createdAt,
                        status: request.status?.description,
                        reason: request.reason,
                        user: request.user?.name,
                    };
                case "assetRequest":
                default:
                    return {
                        id: request.id,
                        plateNumber: request.asset?.plateNumber || "No disponible",
                        createdAt: request.createdAt,
                        status: request.status?.description || "No disponible",
                        reason: request.reason || "No disponible",
                        asset: request.asset?.subcategory?.description || "No disponible",
                        user: request.user?.name || "No disponible",
                        expirationDate: request.expirationDate || "No disponible",
                    };
            }
        });
    }, [requests, activeButton]);

    // Configuración de la tabla para cada tipo de solicitud
    const spaceRequestTable = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns: spaceRequestColumns,
        data: activeButton === "spaceRequest" ? flatRequests : [],
        enableExpandAll: false,
        initialState: {
            columnVisibility: {
                id: false,
                eventObs: false,
                eventDesc: false
            },
            density: 'comfortable',
            pagination: {pageSize: 5},
        },
    });

    const productRequestTable = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns: productRequestColumns,
        data: activeButton === "productRequest" ? flatRequests : [],
        enableExpandAll: false,
        initialState: {
            columnVisibility: {
                id: false,
                productId: false,
            },
            density: 'comfortable',
            pagination: {pageSize: 5},
        },
    });

    const assetRequestTable = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns: assetRequestColumns,
        data: activeButton === "assetRequest" ? flatRequests : [],
        enableExpandAll: false,
        initialState: {
            columnVisibility: {
                id: false,
            },
            density: 'comfortable',
            pagination: {pageSize: 5},
        },
    });

    const canceledButtonStyle = {
        width: '90px',
        height: '24px',
        borderRadius: '8px',
        padding: '0 8px',
        background: gradientMapping['warning'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'width 0.2s ease-in-out',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    };

    const acceptButtonStyle = {
        width: '90px',
        height: '24px',
        borderRadius: '8px',
        padding: '0 8px',
        background: gradientMapping['success'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'width 0.2s ease-in-out',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    };

    return (
        <>
            {loading && <LoadingPointsSpinner />}

            <MyRequestsBanner
                title={
                    activeButton
                        ? `Historial de Solicitudes ${
                            activeButton === "assetRequest"
                                ? "de Activos"
                                : activeButton === "productRequest"
                                    ? "de Productos"
                                    : activeButton === "spaceRequest"
                                        ? "de Espacios"
                                        : ""
                        }`
                        : "Seleccione un tipo de solicitud"
                }
                activeFilters={[activeButton].filter(Boolean)}
                handleButtonClick={handleButtonClick}
                activeButton={activeButton}
            />

            {loading && <LoadingPointsSpinner/>}

            {showCancelModal && (
                <GenericModal
                    show={showCancelModal}
                    onHide={() => setShowCancelModal(false)}
                    title="Cancelar Solicitud"
                    bodyText="¿Estás seguro de cancelar esta solicitud?"
                    customContent={
                        <textarea
                            id="cancelReason"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Escribe tu razón de cancelación aquí"
                            rows="3"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                resize: 'none',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                                color: '#333',
                                outline: 'none',
                                fontFamily: 'Montserrat, sans-serif',
                                transition: 'all 0.3s ease-in-out',
                            }}
                        />
                    }
                    buttonText="Confirmar Cancelación"
                    onButtonClick={handleCancel}
                />
            )}

            <GenericModal
                show={showRenewModal}
                onHide={() => setShowRenewModal(false)}
                title="Renovar Solicitud"
                bodyText={`<p>¿Estás seguro de renovar esta solicitud?</p>`}
                customContent={
                    <div>
                        <label htmlFor="expirationDate" className="form-label" style={{color: "#ffffff"}}>

                            <i className="fas fa-calendar-alt"></i> Fecha de finalización del nuevo préstamo
                            <span className="text-danger">*</span>
                        </label>

                        <input
                            type="date"
                            id="expirationDate"
                            className="form-control border-primary"
                            onChange={(e) => setNewExpirationDate(e.target.value)}
                        />
                    </div>
                }
                buttonText="Confirmar Renovación"
                onButtonClick={renewAction}
            />

            {activeButton === "spaceRequest" && requests.length > 0 && !loading && (
                <MaterialReactTable table={spaceRequestTable}/>
            )}

            {activeButton === "productRequest" && requests.length > 0 && !loading && (
                <MaterialReactTable table={productRequestTable}/>
            )}

            {activeButton === "assetRequest" && requests.length > 0 && !loading && (
                <MaterialReactTable table={assetRequestTable}/>
            )}
        </>
    );
};

export default MyRequest;