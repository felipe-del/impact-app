/**
 * AllRequest component.
 * 
 * This component fetches and displays all requests (Asset, Product, Space) in a table format.
 * It includes a detail panel for each request to show more information.
 * It uses Material-UI and Material React Table for styling and functionality.
 */
import {useEffect, useMemo, useState} from "react"
import AllRequestBanner from "./AllRequestBanner.jsx"
import {getAssetRequestsExcludingEarringAndRenewal} from "../../../api/assetRequest/assetRequest_API.js"
import {getProductRequestsExcludingEarringAndRenewal} from "../../../api/productRequest/productRequest.js";
import {getSpaceRequestsExcludingEarringAndRenewal} from "../../../api/SpaceRndR/spaceRndR_API.js";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {MRT_Localization_ES} from "material-react-table/locales/es/index.js";
import {Box, Typography} from "@mui/material";
import {StatusTranslator} from "../../../util/Translator.js";
import {getStateColor} from "../../../util/SelectColorByStatus.js";
import {getStateIcon} from "../../../util/SelectIconByStatus.jsx";
import LoadingPointsSpinner from "../../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";

/**
 * AllRequest component that fetches and displays all requests (Asset, Product, Space) in a table format.
 * 
 * @component
 * @returns {JSX.Element} - The AllRequest component.
 */
const AllRequest = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        /**
         * Fetches all requests (Asset, Product, Space) excluding earring and renewal.
         * 
         * @async
         * @function fetchAllRequests
         * @returns {Promise<void>} - A promise that resolves when the requests are fetched and set in state.
         */
        const fetchAllRequests = async () => {
            try {
                const [assetRes, productRes, spaceRes] = await Promise.all([
                    getAssetRequestsExcludingEarringAndRenewal(),
                    getProductRequestsExcludingEarringAndRenewal(),
                    getSpaceRequestsExcludingEarringAndRenewal()
                ])

                const assetRequests = assetRes?.data?.map(req => ({...req, tipo: "Activo"})) || []
                const productRequests = productRes?.data?.map(req => ({...req, tipo: "Producto"})) || []
                const spaceRequests = spaceRes?.data?.map(req => ({...req, tipo: "Espacio"})) || []

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
            accessorKey: 'tipo',
            header: 'Tipo de Solicitud',
            size: 120,
            Cell: ({row}) => {
                const tipo = row.original.tipo;
                return (
                    <Typography
                        sx={{
                            color:
                                tipo === 'Activo' ? 'primary.main' :
                                tipo === 'Producto' ? 'success.main' :
                                    tipo === 'Espacio' ? 'warning.main' : 'text.primary',
                            fontFamily: 'Montserrat, sans-serif',
                        }}
                    >
                        {getStateIcon(tipo)} {tipo}
                    </Typography>
                )
            }
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
        {
            accessorKey: 'status.name',
            header: 'Estado',
            Cell: ({row}) => {
                const status = row.original.status;
                const translatedStatus = StatusTranslator.translate(status.name);
                return (
                    <Typography
                        sx={{
                            color: getStateColor(translatedStatus),
                            fontFamily: 'Montserrat, sans-serif',
                        }}
                    >
                        {getStateIcon(translatedStatus)} {translatedStatus}
                    </Typography>
                )
            }
        },
    ], []);

    /**
     * Renders the detail panel for each row in the table.
     * 
     * @param {object} row - The row data for which to render the detail panel.
     * @returns {JSX.Element} - The detail panel component.
     */
    const renderDetailPanel = ({row}) => {
        const data = row.original;
        const tipo = data.tipo;

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
                    <Typography sx={{fontFamily: '"Montserrat", sans-serif'}}>
                        {item.value ?? "N/A"}
                    </Typography>
                </Box>
            ));
        };

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
                        { label: 'ID de Solicitud', value: data.id },
                        { label: 'Tipo de Solicitud', value: data.tipo },
                        { label: 'Fecha de Creación', value: data.createdAt },
                        { label: 'Estado de la Solicitud', value: StatusTranslator.translate(data.status?.name) },
                        { label: 'Razón', value: data.reason },
                        { label: 'Fecha de Expiración', value: data.expirationDate },
                        { label: 'Placa', value: data.asset?.plateNumber },
                        { label: 'Fecha de Compra', value: data.asset?.purchaseDate },
                        { label: 'Valor', value: `${data.asset?.value} ${data.asset?.currency?.symbol}` },
                        { label: 'Usuario Responsable', value: data.asset?.user?.email },
                        { label: 'Proveedor', value: data.asset?.supplier?.name },
                        { label: 'Categoría', value: data.asset?.category?.name },
                        { label: 'Subcategoría', value: data.asset?.subcategory?.name },
                        { label: 'Marca', value: data.asset?.brand?.name },
                        { label: 'Estado del Activo', value: StatusTranslator.translate(data.asset?.status?.name) },
                        { label: 'Modelo', value: data.asset?.model?.modelName },
                        { label: 'Tipo de Moneda', value: `${data.asset?.currency?.stateName} - ${data.asset?.currency?.code} - ${data.asset?.currency?.symbol}` },
                        { label: 'Serie', value: data.asset?.assetSeries },
                        { label: 'Ubicación', value: data.asset?.locationNumber?.locationTypeName },
                    ])}


                </Box>
            );
        }

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
                        { label: "ID de Producto", value: data.product?.id },
                        { label: "Fecha de Compra", value: data.product?.purchaseDate },
                        { label: "Fecha de Expiración", value: data.product?.expiryDate ?? "N/A" },
                        { label: "Categoría", value: data.product?.category?.name },
                        { label: "Tipo de Categoría", value: data.product?.category?.categoryType?.name },
                        { label: "Unidad de Medida", value: `${data.product?.category?.unitOfMeasurement?.name} (${data.product?.category?.unitOfMeasurement?.abbreviation})` },
                        { label: "Estado del Producto", value: StatusTranslator.translate(data.product?.status?.name) },
                        { label: "Estado de la Solicitud", value: StatusTranslator.translate(data.status?.name) },
                        { label: "Razón", value: data.reason },
                        { label: "Usuario", value: data.user?.name },
                        { label: "Correo del Usuario", value: data.user?.email },
                        { label: "Tipo de Usuario", value: data.user?.userRoleResponse?.roleName },
                        { label: "Fecha de Creación", value: data.createdAt },
                    ])}

                </Box>
            );
        }

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
                        { label: "ID de Solicitud", value: data.id },
                        { label: "Espacio", value: data.space?.name },
                        { label: "Código del Espacio", value: data.space?.spaceCode },
                        { label: "Ubicación del Edificio", value: data.space?.buildingLocationResponse?.building?.name },
                        { label: "Piso", value: data.space?.buildingLocationResponse?.floor },
                        { label: "Capacidad Máxima", value: data.space?.maxPeople },
                        { label: "Horario de Apertura", value: data.space?.openTime },
                        { label: "Horario de Cierre", value: data.space?.closeTime },
                        { label: "Estado del Espacio", value: StatusTranslator.translate(data.space?.spaceStatus?.name) },
                        { label: "Cantidad de Personas", value: data.numPeople },
                        { label: "Descripción del Evento", value: data.eventDesc },
                        { label: "Observaciones", value: data.eventObs },
                        { label: "Solicita Equipos", value: data.useEquipment ? "Sí" : "No" },
                        { label: "Usuario Solicitante", value: data.user?.name },
                        { label: "Correo del Usuario", value: data.user?.email },
                        { label: "Rol del Usuario", value: data.user?.userRoleResponse?.roleName },
                        { label: "Estado de la Solicitud", value: StatusTranslator.translate(data.status?.name) },
                        { label: "Fecha de Creación", value: data.createdAt },
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
            columnVisibility: {id: false},
            density: "comfortable",
            pagination: {pageSize: 5},
        },
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === "dark"
                        ? "rgba(255,210,244,0.1)"
                        : "rgba(0,0,0,0.1)",
            }),
        }),
        muiExpandButtonProps: ({row, table}) => ({
            onClick: () => table.setExpanded({[row.id]: !row.getIsExpanded()}),
            sx: {
                transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
                transition: "transform 0.2s",
            },
        }),
        renderDetailPanel
    });


    return (
        <>
            {loading && <LoadingPointsSpinner />}

            <AllRequestBanner title={"Todas las solicitudes"} visibleButtons={["goBack", "info"]}/>

            <MaterialReactTable table={table}/>
        </>
    )
}

export default AllRequest
