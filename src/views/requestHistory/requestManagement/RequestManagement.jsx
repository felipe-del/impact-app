import RequestManagementBanner from "./RequestManagementBanner.jsx";
import {useEffect, useMemo, useState} from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {MRT_Localization_ES} from "material-react-table/locales/es";
import TableApproveOrCancelRequestButtons from "../../../components/button/TableApproveOrCancelRequestButtons.jsx";
import EditButton from "../../../components/button/EditButton.jsx";
import GenericModal from "../../../components/popUp/generic/GenericModal.jsx";
import {acceptAssetRequest, getAssetRequestsWithEarring} from "../../../api/assetRequest/assetRequest_API.js";
import {acceptProductRequest, getProductRequestsWithEarring} from "../../../api/productRequest/productRequest.js";
import {acceptSpaceRequest, getSpaceRequestsWithEarring} from "../../../api/SpaceRndR/spaceRndR_API.js";
import RequestButton from "../../../components/button/RequestButton.jsx";

const RequestManagement = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editRowId, setEditRowId] = useState(null);
    const [tempRequest, setTempRequest] = useState({});
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

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
        try {
            if (request.tipo === "Activo") {
                await acceptAssetRequest(request.id);
            } else if (request.tipo === "Producto") {
                await acceptProductRequest(request.id);
            } else if (request.tipo === "Espacio") {
                await acceptSpaceRequest(request.id);
            }

            setRequests(prev => prev.filter(r => r.id !== request.id));
            cancelEditing();
        } catch (error) {
            console.error("Error al aprobar solicitud", error);
        } finally {
            handleHideConfirmationModal();
        }
    };

    const columns = useMemo(() => [
        {
            accessorKey: "tipo",
            header: "Tipo de Solicitud",
            size: 120,
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
            accessorKey: "status.name",
            header: "Estado",
            size: 120,
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
                        <TableApproveOrCancelRequestButtons
                            confirmationModal={handleShowConfirmationModal}
                            cancelEditing={cancelEditing}
                            row={row}
                        />
                    </div>
                ) : (
                    <RequestButton handleEdit={handleEdit} row={row} />
                )
            ),
        },
    ], [editRowId]);

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
    });

    return (
        <>
            <RequestManagementBanner title={"Solicitudes pendientes por gestionar"} visibleButtons={["goBack"]} />

            <MaterialReactTable table={table} />

            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desea aprobar la solicitud?"
                bodyText="Esta acción no se puede deshacer."
                onButtonClick={() => saveChanges(editRowId)}
            />
        </>
    );
};

export default RequestManagement;
