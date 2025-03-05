import { useState, useEffect, useMemo } from "react";
import { useUser } from "../../hooks/user/useUser.jsx";
import { getAssetRequestByUser } from "../../api/assetRequest/assetRequest_API.js";
import { cancelledAssetRequest } from "../../api/assetRequest/assetRequest_API.js";
import { getSpaceRandRByUser } from "../../api/SpaceRndR/spaceRndR_API.js";
import { cancelledProductRequest } from "../../api/productRequest/productRequest.js";
import { productAvailable } from "../../api/product/product_API.js";
import { getProductRequestByUser } from "../../api/productRequest/productRequest.js";
import { assetAvailable } from "../../api/asset/asset_API.js";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { toast } from "react-hot-toast";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import RequestHistoryBanner from "./RequestHistoryBanner.jsx";
import CancelButton from "../../components/button/CancelButton.jsx";

const RequestHistory = () => {
    const user = useUser();

    const [activeButton, setActiveButton] = useState(null);
    // const [activeAdditionalButton, setActiveAdditionalButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [requests, setRequests] = useState([]); // Estado para guardar los datos de la API
    const [loading, setLoading] = useState(false); // Estado para manejar la carga de solicitudes
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);  // To hold the selected request for cancellation
    const [cancelReason, setCancelReason] = useState("");

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

    // const handleAdditionalButtonClick = (buttonKey) => {
    //     setActiveAdditionalButton(buttonKey);
    // };

    // Recolectar filtros activos
    const activeFilters = [];
    if (activeButton) activeFilters.push(activeButton);
    // if (activeAdditionalButton) activeFilters.push(activeAdditionalButton);

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
            }
            if(selectedRequest.original.productName){
                setLoading(true); // Inicia el estado de carga
            try {
                const response = await cancelledProductRequest(selectedRequest.original.id);
                toast.success(response.message , { duration: 7000 });
                const responseA = await assetAvailable(selectedRequest.original.productId);
                toast.success(responseA.message, { duration: 7000 });
            } catch (error) {
                console.log({ error });
                toast.error(error.message, { duration: 7000 });
            } finally {
                setLoading(false); // Finaliza la carga
            }
            }
            toast.success(`Solicitud cancelada: ${cancelReason}`, { duration: 7000 });
            setShowCancelModal(false);  // Close the modal after cancellation
            setCancelReason("");  // Clear the reason field
            
            const response = await getAssetRequestByUser(user.id);
            setRequests(response.data);
        } else {
            toast.error("Por favor ingrese una razón de cancelación.", { duration: 7000 });
        }
    };

    const columns = useMemo(() => {
        switch (activeButton) {
            case "spaceRequest":
                return [
                    { accessorKey: 'name', header: 'Espacio' },
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
                    {
                        id: 'actions',
                        header: 'Acciones',
                        size: 'small',
                        Cell: ({ row }) => (
                            <CancelButton handleCancel={handlePreCancel} row={row} />
                        ),
                    },
                    
                ];
        }
    }, [activeButton]);

    // Definir los datos según el tipo de solicitud
    const flatRequests = useMemo(() => {
        return requests.map(request => {
            switch (activeButton) {
                case "spaceRequest":
                    return {
                        name: request.space?.name,
                        building: request.space?.buildingLocationResponse?.building.name + "- Piso "+ request.space?.buildingLocationResponse?.floor,
                        maxPeople: request.numPeople,
                        eventDesc: request.eventDesc,
                        eventObs: request.eventObs,
                        startTime: request.startTime,
                        endTime: request.endTime,
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
                // handleAdditionalButtonClick={handleAdditionalButtonClick}
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


            {requests.length > 0 && !loading && (
                <MaterialReactTable table={table} />
            )}
            

        </>
    );
};

export default RequestHistory;
