import { useState, useEffect, useMemo } from "react";
import { useUser } from "../../hooks/user/useUser.jsx";
import { getAssetRequestByUser } from "../../api/assetRequest/assetRequest_API.js";
import { getProductRequestByUser } from "../../api/productRequest/productRequest.js";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { toast } from "react-hot-toast";
import RequestHistoryBanner from "./RequestHistoryBanner.jsx";

const RequestHistory = () => {
    const user = useUser();

    const [activeButton, setActiveButton] = useState(null);
    // const [activeAdditionalButton, setActiveAdditionalButton] = useState(null);
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
    const [requests, setRequests] = useState([]); // Estado para guardar los datos de la API
    const [loading, setLoading] = useState(false); // Estado para manejar la carga de solicitudes
    
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
            // Aquí puedes realizar la llamada a la API para obtener los datos de espacio
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

    const columns = useMemo(() => {
        switch (activeButton) {
            case "spaceRequest":
                return [
                    { accessorKey: 'id', header: 'ID' },
                    { accessorKey: 'spaceName', header: 'Nombre de Espacio' },
                    { accessorKey: 'createdAt', header: 'Fecha de Solicitud' },
                    { accessorKey: 'status', header: 'Estado' },
                    { accessorKey: 'reason', header: 'Razón' },
                    { accessorKey: 'user', header: 'Usuario Responsable' },
                ];
            case "productRequest":
                return [
                    { accessorKey: 'id', header: 'ID' },
                    { accessorKey: 'productName', header: 'Nombre de Producto' },
                    { accessorKey: 'createdAt', header: 'Fecha de Solicitud' },
                    { accessorKey: 'status', header: 'Estado' },
                    { accessorKey: 'reason', header: 'Razón' },
                    { accessorKey: 'user', header: 'Usuario Responsable' },
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
                    
                ];
        }
    }, [activeButton]);

    // Definir los datos según el tipo de solicitud
    const flatRequests = useMemo(() => {
        return requests.map(request => {
            switch (activeButton) {
                case "spaceRequest":
                    return {
                        id: request.id,
                        spaceName: request.space?.name || "No disponible",
                        createdAt: request.createdAt,
                        status: request.status?.description || "No disponible",
                        reason: request.reason || "No disponible",
                        user: request.user?.name || "No disponible",
                    };
                case "productRequest":
                    return {
                        id: request.id,
                        productName: request.product?.name,
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
                spaceName: activeButton === "spaceRequest",
                productName: activeButton === "productRequest",
                plateNumber: activeButton === "assetRequest",
                createdAt: true,
                status: true,
                reason: true,
                asset: activeButton === "assetRequest",
                user: true,
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
                // activeAdditionalButton={activeAdditionalButton}
                // showAdditionalButtons={showAdditionalButtons}
            />

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
            )}

            {loading && <LoadingPointsSpinner />} {/* Solo muestra el spinner cuando los datos se están cargando */}

            {requests.length > 0 && !loading && (
                <MaterialReactTable table={table} />
            )}
        </>
    );
};

export default RequestHistory;
