import {useEffect, useMemo, useState} from "react"
import AllRequestBanner from "./AllRequestBanner.jsx"
import { getAssetRequestsExcludingEarringAndRenewal } from "../../../api/assetRequest/assetRequest_API.js"
import {getProductRequestsExcludingEarringAndRenewal} from "../../../api/productRequest/productRequest.js";
import {getSpaceRequestsExcludingEarringAndRenewal} from "../../../api/SpaceRndR/spaceRndR_API.js";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {MRT_Localization_ES} from "material-react-table/locales/es/index.js";
import {Box, Typography} from "@mui/material";

const AllRequest = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllRequests = async () => {
            try {
                const [assetRes, productRes, spaceRes] = await Promise.all([
                    getAssetRequestsExcludingEarringAndRenewal(),
                    getProductRequestsExcludingEarringAndRenewal(),
                    getSpaceRequestsExcludingEarringAndRenewal()
                ])

                const assetRequests = assetRes?.data?.map(req => ({ ...req, tipo: "Activo" })) || []
                const productRequests = productRes?.data?.map(req => ({ ...req, tipo: "Producto" })) || []
                const spaceRequests = spaceRes?.data?.map(req => ({ ...req, tipo: "Espacio" })) || []

                const all = [...assetRequests, ...productRequests, ...spaceRequests]
                setRequests(all)
            } catch (error) {
                console.error("Error al cargar solicitudes", error)
            } finally {
                setLoading(false)
            }
        }

        fetchAllRequests()
    }, [])

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
                row.tipo === "Espacio"
                    ? row.eventObs
                    : row.reason,
            header: "Motivo",
            size: 200,
        },
        {
            accessorFn: (row) => row.tipo === "Activo" ? row.asset?.subcategory?.name : row.tipo === "Producto" ? row.product?.category?.name : row.space?.name,
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
    ], []);


    const renderDetailPanel = ({ row }) => {
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
                    <Typography sx={{ fontFamily: '"Montserrat", sans-serif' }}>
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
                        { label: "ID", value: data.id },
                        { label: "Fecha de Compra", value: data.purchaseDate },
                        { label: "Estado", value: data.status.name },
                        { label: "Serie del Activo", value: data.assetSeries },
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
                        { label: "ID", value: data.product?.id },
                        { label: "Fecha de Compra", value: data.product?.purchaseDate },
                        { label: "Fecha de Expiración", value: data.product?.expiryDate ?? "N/A" },
                        { label: "Categoría", value: data.product?.category.name },
                        { label: "Estado", value: data.product?.status.name },
                        { label: "Razón", value: data.reason },
                        { label: "Usuario", value: data.user.name },
                        { label: "Tipo de Usuario", value: data.user.userRoleResponse.roleName },
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
                        { label: "ID", value: data.space.id },
                        { label: "Fecha de Expiración", value: data.space.expiryDate ?? "N/A" },
                        { label: "Razón", value: data.eventObs },
                        { label: "Usuario", value: data.user.name },
                        { label: "Tipo de Usuario", value: data.user.userRoleResponse.roleName },
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
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
                transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
                transition: "transform 0.2s",
            },
        }),
        renderDetailPanel
    });


    return (
        <>
            <AllRequestBanner title={"Todas las solicitudes"} visibleButtons={["goBack"]} />

            <MaterialReactTable table={table} />
        </>
    )
}

export default AllRequest
