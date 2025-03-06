import { useState, useEffect, useMemo } from "react";
import { useUser } from "../../hooks/user/useUser.jsx";
import { getAssetRequestByUser, updateAssetRequest } from "../../api/assetRequest/assetRequest_API.js";
import { cancelledAssetRequest } from "../../api/assetRequest/assetRequest_API.js";
import { getSpaceRandRByUser } from "../../api/SpaceRndR/spaceRndR_API.js";
import { cancelledProductRequest } from "../../api/productRequest/productRequest.js";
import { cancelResAndReq } from "../../api/SpaceRndR/spaceRndR_API.js";
import { productAvailable } from "../../api/product/product_API.js";
import { getProductRequestByUser } from "../../api/productRequest/productRequest.js";
import { assetAvailable, getAssetById } from "../../api/asset/asset_API.js";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { toast } from "react-hot-toast";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import RequestHistoryBanner from "./RequestHistoryBanner.jsx";
import CancelButton from "../../components/button/CancelButton.jsx";
import RenewalButton from "../../components/button/RenewalButton.jsx";
import dayjs from "dayjs";
import {saveAssetRequestRenewal} from "../../api/assetRequest/assetRequest_API.js";
import { getAssetRequestById } from "../../api/assetRequest/assetRequest_API.js";
import { updateAssetRequestRenewal } from "../../api/assetRequest/assetRequest_API.js";

const RequestHistory = () => {
    const user = useUser();

    const [activeButton, setActiveButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [requests, setRequests] = useState([]); // Estado para guardar los datos de la API
    const [loading, setLoading] = useState(false); // Estado para manejar la carga de solicitudes
    const [showRenewModal, setShowRenewModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);  // To hold the selected request for cancellation
    const [cancelReason, setCancelReason] = useState("");
    const [newExpirationDate, setNewExpirationDate] = useState(null); // Estado para la nueva fecha de expiración

    const handleButtonClick = async (buttonKey) => {
        setActiveButton(buttonKey);
        setShowAdditionalButtons(
            buttonKey === "spaceRequest" || buttonKey === "productRequest" || buttonKey === "assetRequest"
        );

        // Solo hace la petición si se selecciona un botón activo
        if (buttonKey === "assetRequest" && user?.id) {
            setLoading(true); // Inicia el estado de carga
            try {
                const response = await getAssetRequestByUser(user.id);
                setRequests(response.data)
                toast.success(response.message, { duration: 7000 });
            } catch (error) {
                console.log({ error });
                toast.error(error.message, { duration: 7000 });
            } finally {
                setLoading(false); // Finaliza la carga
            }
        }
        if (buttonKey === "spaceRequest" && user?.id) {
            setLoading(true); // Inicia la carga
            try {
                const response = await getSpaceRandRByUser(user.id);
                setRequests(response.data)
                console.log(response.data)
                toast.success(response.message, { duration: 7000 });
            } catch (error) {
                console.log({ error });
                toast.error(error.message, { duration: 7000 });
            } finally {
                setLoading(false); // Finaliza la carga
            }
            
        }

        if (buttonKey === "productRequest" && user?.id) {
            setLoading(true); // Inicia la carga
            try {
                const response = await getProductRequestByUser(user.id);
                setRequests(response.data)
                toast.success(response.message, { duration: 7000 });
            } catch (error) {
                console.log({ error });
                toast.error(error.message, { duration: 7000 });
            } finally {
                setLoading(false); // Finaliza la carga
            }
        }
    };

    const activeFilters = [];
    if (activeButton) activeFilters.push(activeButton);
    // if (activeAdditionalButton) activeFilters.push(activeButton);

    const handlePreCancel = (row) => {
        console.log(row);
        setSelectedRequest(row);
        setShowCancelModal(true);
    }
    const handleCancel = async () => {
        if (cancelReason.trim()) {
            if(selectedRequest.original.asset){
                console.log("here asset")
                setLoading(true); // Inicia el estado de carga
            try {
                const response = await cancelledAssetRequest(selectedRequest.original.id);
                toast.success(response.message, { duration: 7000 });
                const responseA = await assetAvailable(selectedRequest.original.plateNumber);
                toast.success(responseA.message, { duration: 7000 });
            } catch (error) {
                console.log({ error });
                toast.error(error.message, { duration: 7000 });
            } finally {
                setLoading(false); // Finaliza la carga
            }
            const response = await getAssetRequestByUser(user.id);
            setRequests(response.data);
            }
            if(selectedRequest.original.productName){
                setLoading(true); // Inicia el estado de carga
            try {
                const response = await cancelledProductRequest(selectedRequest.original.id);
                toast.success(response.message , { duration: 7000 });
            } catch (error) {
                console.log({ error });
                toast.error(error.message, { duration: 7000 });
            } finally {
                setLoading(false); // Finaliza la carga
            }
            const response = await getProductRequestByUser(user.id);
            setRequests(response.data);
            }
            if(selectedRequest.original.spaceName){
                setLoading(true); // Inicia el estado de carga
            try {
                const response = await cancelResAndReq(selectedRequest.original.id);
                toast.success(response.message , { duration: 7000 });
            } catch (error) {
                console.log({ error });
                toast.error(error.message, { duration: 7000 });
            } finally {
                setLoading(false); // Finaliza la carga
            }
            const response = await getSpaceRandRByUser(user.id);
            setRequests(response.data);
            console.log(response.data)
            }
            toast.success(`Solicitud cancelada: ${cancelReason}`, { duration: 7000 });
            setShowCancelModal(false);  // Close the modal after cancellation
            setCancelReason("");  // Clear the reason field
            
        } else {
            toast.error("Por favor ingrese una razón de cancelación.", { duration: 7000 });
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
            toast.error("La nueva fecha de expiración debe ser posterior a la fecha de expiración actual.", { duration: 7000 });
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
            toast.success(response.message, { duration: 7000 });
            setShowRenewModal(false); 
            setNewExpirationDate(null); 

            const update = await updateAssetRequestRenewal(localRequestId, { 
                assetId: localAssetId,
                status: "Pendiente de renovacion." ,
                reason: selectedRequest.original.reason,
                expirationDate: selectedRequest.original.expirationDate,
            });
            toast.success(update.message, { duration: 7000 });
    
            // Actualizar la tabla después de la renovación
            const updatedRequests = await getAssetRequestByUser(user.id);
            setRequests(updatedRequests.data);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const columns = useMemo(() => {
        switch (activeButton) {
            case "spaceRequest":
                return [
                    { accessorKey: 'id', header: 'Id'},
                    { accessorKey: 'spaceName', header: 'Espacio' },
                    { accessorKey: 'status', header: 'Estado' },
                    { accessorKey: 'building', header: 'Ubicación' },
                    { accessorKey: 'maxPeople', header: 'Número de personas' },
                    { accessorKey: 'eventDesc', header: 'Descripción del evento' },
                    { accessorKey: 'eventObs', header: 'Observaciones del evento' },
                    { accessorKey: 'startTime', header: 'Hora de inicio' },
                    { accessorKey: 'endTime', header: 'Hora de finalización' },
                    {
                        id: 'actions',
                        header: 'Acciones',
                        size: 'small',
                        Cell: ({ row }) => (
                            <CancelButton handleCancel={handlePreCancel} row={row} />
                        ),
                    },
                ];
            case "productRequest":
                return [
                    { accessorKey: 'id', header: 'ID' },
                    { accessorKey: 'productName', header: 'Nombre de Producto' },
                    { accessorKey: 'productId', header: 'Id del producto'},
                    { accessorKey: 'createdAt', header: 'Fecha de Solicitud' },
                    { accessorKey: 'status', header: 'Estado' },
                    { accessorKey: 'reason', header: 'Razón' },
                    { accessorKey: 'user', header: 'Usuario Responsable' },
                    {
                        id: 'actions',
                        header: 'Acciones',
                        size: 'small',
                        Cell: ({ row }) => (
                            <CancelButton handleCancel={handlePreCancel} row={row} />
                        ),
                    },
                ];
            case "assetRequest":
            default:
                return [
                    { accessorKey: 'id', header: 'ID' },
                    { accessorKey: 'plateNumber', header: 'Placa' },
                    { accessorKey: 'createdAt', header: 'Fecha de Solicitud' },
                    { accessorKey: 'status', header: 'Estado' },
                    { accessorKey: 'reason', header: 'Razón' },
                    { accessorKey: 'asset', header: 'Activo' },
                    { accessorKey: 'user', header: 'Usuario Responsable' },
                    { accessorKey: 'expirationDate', header: 'Fecha de Expiración' },
                    {
                        id: 'actions',
                        header: 'Acciones',
                        size: 'small',
                        Cell: ({ row }) => {
                            const expirationDate = dayjs(row.original.expirationDate);
                            const today = dayjs();
                            const daysUntilExpiration = expirationDate.diff(today, 'day');
                            return (
                                <div style={{ display: "flex", justifyContent: "space-evenly", marginRight: "50px" }}>
                                    <CancelButton handleCancel={handlePreCancel} row={row} />
                                    {daysUntilExpiration >= 2 && row.original.status === "Ha sido aceptado." && (
                                        <RenewalButton renewAction={() => handlePreRenew(row)} row={row} />
                                    )}
                                </div>
                            );
                        },
                    },
                ];
        }
    }, [activeButton]);

    const flatRequests = useMemo(() => {
        return requests.map(request => {
            const expirationDate = dayjs(request.expirationDate);
            const today = dayjs();
            const daysUntilExpiration = expirationDate.diff(today, 'day');
            switch (activeButton) {
                case "spaceRequest":
                    return {
                        id: request.reqAndResId,
                        spaceName: request.space?.name,
                        status: request.status.description,
                        building: request.space?.buildingLocationResponse?.building.name + "- Piso "+ request.space?.buildingLocationResponse?.floor,
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
                        reason: request.reason ,
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

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: flatRequests,
        enableExpandAll: false,
        initialState: {
            columnVisibility: {
                id: true,
                // spaceName: activeButton === "spaceRequest",
                // productName: activeButton === "productRequest",
                productId:false,
                // plateNumber: activeButton === "assetRequest",
                createdAt: true,
                status: true,
                reason: true,
                // asset: activeButton === "assetRequest",
                user: false,
            },
            density: 'comfortable',
            pagination: {
                pageSize: 5,
            },
        },
    });

    return (
        <>
            <RequestHistoryBanner
                title={"Historial de Solicitudes"}
                activeFilters={activeFilters}
                handleButtonClick={handleButtonClick}
                activeButton={activeButton}
            />

            {activeFilters.length === 0 && (
                <p className="fw-bold text-primary text-center mt-3">
                    📜 Seleccione la opción de <span className="text-danger">historial de solicitudes</span> que desea
                    visualizar.
                </p>
            )}
            {/*activeFilters.length > 0 && (
            {activeFilters.length > 0 && (
                <div style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}>
                    <p style={{
                        margin: "0",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#495057",
                        whiteSpace: "nowrap",
                    }}>
                        🎯 Filtros activos:
                    </p>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        paddingLeft: "0",
                        marginLeft: "0",
                    }}>
                        {activeFilters.map((filter, index) => (
                            <div key={index} style={{
                                padding: "8px 12px",
                                backgroundColor: "#ffffff",
                                borderRadius: "6px",
                                border: "1px solid #dee2e6",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "14px",
                                color: "#343a40",
                            }}>
                                <span style={{ color: "#6c757d" }}>✔️</span> {filter}
                            </div>
                        ))}
                    </div>
                </div>
            )*/}

            {loading && <LoadingPointsSpinner />} {/* Solo muestra el spinner cuando los datos se están cargando */}

            {showCancelModal && (
    <GenericModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        title="Cancelar Solicitud"
        bodyText={`<p>¿Estás seguro de cancelar esta solicitud?</p>`}
        customContent={
            <div>
                <textarea
                    id="cancelReason"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)} // Controla el estado
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
            </div>
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
             <label htmlFor="expirationDate" className="form-label">
            <i className="fas fa-calendar-alt"></i> Fecha de finalización del nuevo préstamo
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


            {requests.length > 0 && !loading && (
                <MaterialReactTable table={table} />
            )}
            

        </>
    );
};

export default RequestHistory;