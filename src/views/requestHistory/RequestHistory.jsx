import { useState, useMemo } from "react";
import { useUser } from "../../hooks/user/useUser.jsx";
import { getAssetRequestByUser, cancelledAssetRequest } from "../../api/assetRequest/assetRequest_API.js";
import { getSpaceRandRByUser, cancelResAndReq } from "../../api/SpaceRndR/spaceRndR_API.js";
import { getProductRequestByUser, cancelledProductRequest } from "../../api/productRequest/productRequest.js";
import { assetAvailable } from "../../api/asset/asset_API.js";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { toast } from "react-hot-toast";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import RequestHistoryBanner from "./RequestHistoryBanner.jsx";
import CancelButton from "../../components/button/CancelButton.jsx";
import { Typography } from "@mui/material";
import { gradientMapping } from "../../style/codeStyle.js";

const RequestHistory = () => {
    const user = useUser();
    const [activeButton, setActiveButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [cancelReason, setCancelReason] = useState("");

    const fetchRequests = async (apiCall) => {
        if (!user?.id) return;
        setLoading(true);
        try {
            const response = await apiCall(user.id);
            setRequests(response.data);
            toast.success(response.message);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

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
            toast.error("Por favor ingrese una razón de cancelación.", { duration: 7000 });
            return;
        }

        setLoading(true);
        try {
            if (selectedRequest.original.asset) {
                await cancelledAssetRequest(selectedRequest.original.id);
                await assetAvailable(selectedRequest.original.plateNumber);
                const response = await getAssetRequestByUser(user.id);
                setRequests(response.data);
            } else if (selectedRequest.original.productName) {
                await cancelledProductRequest(selectedRequest.original.id);
                const response = await getProductRequestByUser(user.id);
                setRequests(response.data);
            } else if (selectedRequest.original.spaceName) {
                await cancelResAndReq(selectedRequest.original.id);
                const response = await getSpaceRandRByUser(user.id);
                setRequests(response.data);
            }
            toast.success(`Solicitud cancelada: ${cancelReason}`, { duration: 7000 });
        } catch (error) {
            console.error(error);
            toast.error(error.message, { duration: 7000 });
        } finally {
            setLoading(false);
            setShowCancelModal(false);
            setCancelReason("");
        }
    };

    // Columnas y datos para cada tipo de solicitud
    const spaceRequestColumns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'spaceName', header: 'Espacio' },
        { accessorKey: 'building', header: 'Ubicación' },
        { accessorKey: 'maxPeople', header: 'Número de personas' },
        { accessorKey: 'eventDesc', header: 'Descripción del evento' },
        { accessorKey: 'eventObs', header: 'Observaciones del evento' },
        { accessorKey: 'startTime', header: 'Hora de inicio' },
        { accessorKey: 'endTime', header: 'Hora de finalización' },
        { accessorKey: 'status', header: 'Estado' },
        {
            id: 'actions',
            header: 'Acciones',
            size: 'small',
            Cell: ({ row }) => (
                row.original.status !== "Ha sido cancelada." ? (
                    <CancelButton handleCancel={handlePreCancel} row={row} />
                ) : (
                    <div style={canceledButtonStyle}>
                        <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>
                            Cancelado
                        </Typography>
                    </div>
                )
            ),
        },
    ];

    const productRequestColumns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'productName', header: 'Nombre de Producto' },
        { accessorKey: 'productId', header: 'Id del producto' },
        { accessorKey: 'createdAt', header: 'Fecha de Solicitud' },
        { accessorKey: 'reason', header: 'Razón' },
        { accessorKey: 'user', header: 'Usuario Responsable' },
        { accessorKey: 'status', header: 'Estado' },
        {
            id: 'actions',
            header: 'Acciones',
            size: 'small',
            Cell: ({ row }) => (
                row.original.status !== "Ha sido cancelada." ? (
                    <CancelButton handleCancel={handlePreCancel} row={row} />
                ) : (
                    <div style={canceledButtonStyle}>
                        <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>
                            Cancelado
                        </Typography>
                    </div>
                )
            ),
        },
    ];

    const assetRequestColumns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'plateNumber', header: 'Placa' },
        { accessorKey: 'createdAt', header: 'Fecha de Solicitud' },
        { accessorKey: 'reason', header: 'Razón' },
        { accessorKey: 'asset', header: 'Activo' },
        { accessorKey: 'user', header: 'Usuario Responsable' },
        { accessorKey: 'status', header: 'Estado' },
        {
            id: 'actions',
            header: 'Acciones',
            size: 'small',
            Cell: ({ row }) => (
                row.original.status !== "Ha sido cancelada." ? (
                    <CancelButton handleCancel={handlePreCancel} row={row} />
                ) : (
                    <div style={canceledButtonStyle}>
                        <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>
                            Cancelado
                        </Typography>
                    </div>
                )
            ),
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
            },
            density: 'comfortable',
            pagination: { pageSize: 5 },
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
            pagination: { pageSize: 5 },
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
            pagination: { pageSize: 5 },
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

    return (
        <>
            <RequestHistoryBanner
                title={"Historial de Solicitudes"}
                activeFilters={[activeButton].filter(Boolean)}
                handleButtonClick={handleButtonClick}
                activeButton={activeButton}
            />

            {!activeButton && (
                <div
                    className="d-flex justify-content-center align-items-center mt-4"
                    style={{
                        background: "#f8f9fa",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    <span style={{ fontSize: "1.5rem", marginRight: "8px", color: "#0d6efd" }}>
                        📜
                    </span>
                    <p className="fw-bold text-primary mb-0 text-center"
                       style={{
                           fontFamily: "Montserrat, sans-serif",
                           fontSize: "1.1rem",
                           letterSpacing: "0.5px",
                           lineHeight: "1.5",
                       }}
                    >
                        Seleccione la opción de
                        <span className="text-danger fw-semibold"> historial de solicitudes </span>
                        que desea visualizar.
                    </p>
                </div>
            )}

            {loading && <LoadingPointsSpinner />}

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

            {activeButton === "spaceRequest" && requests.length > 0 && !loading && (
                <MaterialReactTable table={spaceRequestTable} />
            )}

            {activeButton === "productRequest" && requests.length > 0 && !loading && (
                <MaterialReactTable table={productRequestTable} />
            )}

            {activeButton === "assetRequest" && requests.length > 0 && !loading && (
                <MaterialReactTable table={assetRequestTable} />
            )}
        </>
    );
};

export default RequestHistory;