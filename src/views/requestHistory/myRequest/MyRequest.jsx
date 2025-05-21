/**
 * MyRequest Component
 * 
 * This component is used to display the user's requests for assets, spaces, and products.
 * It includes functionality to fetch, display, cancel, and renew requests.
 * It uses Material-UI for styling and Material React Table for displaying data in a table format.
 * It also includes modals for confirming cancellation and renewal of requests.
 * It uses React hooks for state management and side effects.
 * It uses the react-hot-toast library for displaying notifications.
 */
import {useState, useMemo, useEffect} from "react";
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

/**
 * MyRequest component that displays the user's requests for assets, spaces, and products.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} activeFilters - The active filters for the requests.
 * @param {function} handleButtonClick - The function to call when a button is clicked.
 * @param {string} activeButton - The currently active button.
 * @return {JSX.Element} - The MyRequest component.
 */
const MyRequest = () => {
    const user = useUser();
    const [activeButton, setActiveButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [requests, setRequests] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [showRenewModal, setShowRenewModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const [newExpirationDate, setNewExpirationDate] = useState(null); 

    /**
     * Fetches requests based on the API call provided.
     * 
     * @param {function} apiCall - The API call function to fetch requests.
     * @returns {Promise<void>} - A promise that resolves when the requests are fetched.
     */
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

    /**
     * Handles the button click event to fetch requests based on the selected button.
     * 
     * @param {string} buttonKey - The key of the button that was clicked.
     * @returns {void}
     */
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

    /**
     * Handles the pre-cancellation of a request.
     * 
     * @param {object} row - The row data of the request to be cancelled.
     * @returns {void}
     */
    const handlePreCancel = (row) => {
        setSelectedRequest(row);
        setShowCancelModal(true);
    };

    /**
     * Handles the cancellation of a request.
     * 
     * @async
     * @param {void}
     * @returns {void}  
     */
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

    /**
     * Handles the pre-renewal of a request.
     * 
     * @param {object} row - The row data of the request to be renewed.
     * @return {void}
     */
    const handlePreRenew = (row) => {
        setSelectedRequest(row);
        setShowRenewModal(true);
    }

    /**
     * Handles the renewal of a request.
     * 
     * @async
     * @param {void}
     * @return {void}
     */
    const renewAction = async () => {
        let localAssetId;
        let localRequestId;
        const currentExpirationDate = dayjs(selectedRequest.original.expirationDate);
        const newExpiration = dayjs(newExpirationDate);

        if (newExpiration.isBefore(currentExpirationDate)) {
            toast.error("La nueva fecha de expiración debe ser posterior a la fecha de expiración actual.", {duration: 7000});
            return; 
        }

        try {
            const response = await getAssetRequestById(selectedRequest.original.id);
            localRequestId = response.data.id; 
            localAssetId = response.data.asset.id; 
        } catch (e) {
            toast.error(e.message);
            return; 
        }
        try {
            const response = await saveAssetRequestRenewal({
                assetId: localAssetId, 
                reason: selectedRequest.original.reason,
                expirationDate: newExpirationDate, 
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

            const updatedRequests = await getAssetRequestByUser(user.id);
            setRequests(updatedRequests.data);
        } catch (e) {
            toast.error(e.message);
        }
    };

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
            Cell: ({row}) => (
                row.original.status !== "Ha sido cancelada." ? (
                    <CancelButton handleCancel={handlePreCancel} row={row}/>
                ) : (
                    <div style={canceledButtonStyle}>
                        <Typography variant="caption" style={{color: 'white', fontFamily: 'Montserrat'}}>
                            Cancelado
                        </Typography>
                    </div>
                )
            ),
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
            Cell: ({row}) => (
                row.original.status !== "Ha sido cancelada." ? (
                    <CancelButton handleCancel={handlePreCancel} row={row}/>
                ) : (
                    <div style={canceledButtonStyle}>
                        <Typography variant="caption" style={{color: 'white', fontFamily: 'Montserrat'}}>
                            Cancelado
                        </Typography>
                    </div>
                )
            ),

        },
    ];
    
    const assetRequestColumns = [
        {accessorKey: 'id', header: 'ID'},
        {accessorKey: 'asset', header: 'Activo'},
        {accessorKey: 'plateNumber', header: 'Placa'},
        {accessorKey: 'user', header: 'Usuario Responsable'},
        {accessorKey: 'reason', header: 'Razón'},
        {accessorKey: 'createdAt', header: 'Fecha de Solicitud'},
        {accessorKey: 'expirationDate', header: 'Fecha de Expiración'},
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

                const hideCancelStatuses = [
                    "Pendiente de renovacion.",
                    "En espera de la renovación de otra solicitud."
                ];

                return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {!hideCancelStatuses.includes(row.original.status) && (
                            <CancelButton handleCancel={handlePreCancel} row={row} />
                        )}
                        {daysUntilExpiration >= 2 && row.original.status === "Ha sido aceptado." && (
                            <RenewalButton renewAction={() => handlePreRenew(row)} row={row} />
                        )}
                    </div>
                  );
            }
        },
    ];

    /**
     * Flattens the requests data based on the active button.
     * 
     * @returns {Array} - The flattened requests data.
     */
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
            pagination: {pageSize: 15},
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
            pagination: {pageSize: 15},
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
            pagination: {pageSize: 15},
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

    useEffect(() => {
        handleButtonClick("assetRequest");
    }, []);

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
