/**
 * AssetRenewalTable component.
 * 
 * This component displays a table of asset renewal requests.
 * It allows users to accept or reject renewal requests.
 * It uses Material React Table for rendering the table and Axios for API calls.
 */
import { useEffect, useState, useMemo } from "react";
import { useUser } from "../../hooks/user/useUser.jsx";
import {
    acceptAssetRenewalRequest,
    getAssetRequestRenewal,
    rejectAssetRenewalRequest
} from "../../api/assetRequest/assetRequest_API.js"; // Asegúrate que esté bien importada
import { useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import AssetRenewalBanner from "./AssetRenewalBanner.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import CancelButton from "../../components/button/CancelButton.jsx";
import AcceptButton from "../../components/button/AcceptButton.jsx";
import handleAxiosError from "../../api/handleAxiosError.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";

/**
 * AssetRenewalTable component that displays a table of asset renewal requests.
 * 
 * @component
 * @returns {JSX.Element} - The AssetRenewalTable component.
 */
const AssetRenewalTable = () => {
    const user = useUser();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [requestToHandle, setRequestToHandle] = useState(null);
    const [showAcceptRequestModal, setShowAcceptRequestModal] = useState(false);
    const [showRejectRequestModal, setShowRejectRequestModal] = useState(false);

    /**
     * Fetches asset renewal requests from the API.
     * 
     * @async
     * @function fetchRenewRequests
     * @return {Promise<void>} - A promise that resolves when the requests are fetched.
     */
    const fetchRenewRequests = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const response = await getAssetRequestRenewal(user.id);
        setRequests(response.data);
        if (response.data.length === 0) {
          toast("No hay solicitudes de renovación pendientes.", { icon: "🔔" });
        }
      } catch (error) {
        toast.error("Error al obtener las solicitudes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    /**
     * Handles the pre-cancellation of an asset renewal request.
     * 
     * @param {object} row - The row object containing the request data.
     * @returns {void}
     */
    const handlePreCancel = (row) => {
        setRequestToHandle(row);
        setShowRejectRequestModal(true);
    };

    /**
     * Handles the cancellation of an asset renewal request.
     * 
     * @async
     * @function handleCancel
     * @return {Promise<void>} - A promise that resolves when the request is cancelled.
     */
    const handleCancel = async () => {
        setRequestToHandle(true);
        try {
            const response = await rejectAssetRenewalRequest(requestToHandle.original.id);

            if(!response){
                throw new Error("La solicitud no se pudo cancelar. Intente de nuevo.");
            }

            toast.success("Renovación de solicitud cancelada", { duration: 7000 });
            await fetchRenewRequests();
        }
        catch(error) {
            handleAxiosError(error);
        }
        finally {
            setLoading(false);
            setShowRejectRequestModal(false);
        }
    }

    /**
     * Handles the pre-acceptance of an asset renewal request.
     * 
     * @param {object} row - The row object containing the request data.
     * @returns {void}
     */
    const handlePreAccept = (row) => {
        setRequestToHandle(row);
        setShowAcceptRequestModal(true);
    }

    /**
     * Handles the acceptance of an asset renewal request.
     * 
     * @async
     * @function handleAccept
     * @return {Promise<void>} - A promise that resolves when the request is accepted.
     */
    const handleAccept = async () => {
        setLoading(true);
        try {
            const response = await acceptAssetRenewalRequest(requestToHandle.original.id);

            if (!response) {
                throw new Error("La solicitud no se pudo aceptar. Intente de nuevo.");
            }

            toast.success("Renovación de solicitud aceptada", { duration: 7000 });
            await fetchRenewRequests();
        } catch (error){
            handleAxiosError(error);
        }
        finally {
            setLoading(false);
            setShowAcceptRequestModal(false);
        }
    }

    useEffect(() => {
      fetchRenewRequests();
    }, [user?.id]);

    const columns = [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "asset", header: "Activo" },
      { accessorKey: "plateNumber", header: "Placa" },
      { accessorKey: "user", header: "Usuario Responsable" },
      { accessorKey: "reason", header: "Razón" },
      { accessorKey: "createdAt", header: "Fecha de Solicitud" },
      { accessorKey: "expirationDate", header: "Fecha de Expiración" },
      { accessorKey: "status", header: "Estado" },
      {   id: 'actions',
          header: 'Acciones',
          size: 'small',
          Cell: ({ row }) => {
              return (
                  <div style={{ display: 'flex', gap: '8px' }}>
                      <AcceptButton handleAccept={handlePreAccept} row={row} />
                      <CancelButton handleCancel={handlePreCancel} row={row} />
                  </div>
              );
          }
      }
    ];

    const data = useMemo(() => {
      return requests.map((r) => ({
        id: r.id,
        asset: r.asset?.subcategory?.description || "No disponible",
        plateNumber: r.asset?.plateNumber || "No disponible",
        user: r.user?.name || "No disponible",
        reason: r.reason || "No disponible",
        createdAt: dayjs(r.createdAt).format("YYYY-MM-DD"),
        expirationDate: dayjs(r.expirationDate).format("YYYY-MM-DD"),
        status: r.status?.description || "Pendiente de renovación",
      }));
    }, [requests]);

    const table = useMaterialReactTable({
      columns,
      data,
      localization: MRT_Localization_ES,
      enableExpandAll: false,
      initialState: {
        columnVisibility: { id: false },
        density: "comfortable",
        pagination: { pageSize: 15 },
      },
    });

    return (
      <>

          {loading && <LoadingPointsSpinner />}

          <AssetRenewalBanner title="Solicitudes de Activos por Renovar" visibleButtons={["goBack", "info"]}/>

          <MaterialReactTable table={table} />

          <GenericModal
              show={showAcceptRequestModal}
              onHide={() => setShowAcceptRequestModal(false)}
              title="Aceptar renovación de solicitud de activo"
              bodyText={`<p>¿Estás seguro de aceptar esta solicitud?</p>`}
              onButtonClick={handleAccept}
          />
          <GenericModal
              show={showRejectRequestModal}
              onHide={() => setShowRejectRequestModal(false)}
              title="Rechazar renovación de solicitud de activo"
              bodyText={`<p>¿Estás seguro de rechazar esta solicitud?</p>`}
              onButtonClick={handleCancel}
          />

      </>
    );
  };


export default AssetRenewalTable;

