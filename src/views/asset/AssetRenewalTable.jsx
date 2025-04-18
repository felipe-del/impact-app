import { useEffect, useState, useMemo } from "react";
import { useUser } from "../../hooks/user/useUser.jsx";
import { getAssetRequestRenewal } from "../../api/assetRequest/assetRequest_API.js"; // Asegúrate que esté bien importada
import { useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { MaterialReactTable } from "material-react-table";
import { Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import AssetRenewalBanner from "./AssetRenewalBanner.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

const AssetRenewalTable = () => {
    const user = useUser();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
  
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
        pagination: { pageSize: 5 },
      },
    });
  
    return (
      <>

          {loading && <LoadingPointsSpinner />}

          <AssetRenewalBanner title="Solicitudes de Activos por Renovar" visibleButtons={["goBack", "info"]}/>

          <MaterialReactTable table={table} />
      </>
    );
  };
  

export default AssetRenewalTable;