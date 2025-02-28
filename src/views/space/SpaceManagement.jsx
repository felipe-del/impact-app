import useSpaceData from "../../hooks/apiData/space/SpaceData.jsx";
import {useEffect, useMemo, useState} from "react";
import SpaceBanner from "./SpaceBanner.jsx";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, Typography} from "@mui/material";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';


const SpaceManagement = () => {

    const {space, isError, isLoading, refetch} = useSpaceData();
    const [spaceData, setSpaceData] = useState([]);

    useEffect(() => {
        if (space?.data && Array.isArray(space.data)) {
            setSpaceData(space.data);
        }
    }, [space]);

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80 },
            { accessorKey: "maxPeople", header: "Capacidad Máxima" },
            { accessorKey: "name", header: "Nombre" },
            { accessorKey: "openTime", header: "Hora de Apertura" },
            { accessorKey: "spaceCode", header: "Código de Espacio" },
            { accessorKey: "spaceStatus.name", header: "Estado" },
            { accessorKey: "buildingLocationResponse.building.name", header: "Edificio" },
        ],
        []
    )

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: spaceData,
        enableExpandAll: false,
        initialState: {
            columnVisibility: {
                id: false,
                'buildingLocationResponse.building.name': false,
            },
            density: "comfortable",
            pagination: {
                pageSize: 5,
            },
        },
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark' ? 'rgba(255,210,244,0.1)' : 'rgba(0,0,0,0.1)'
            })
        }),
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s'
            }
        }),

        renderDetailPanel: ({ row }) => (
            <Box
                sx={{
                    display: 'grid',
                    margin: 'auto',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    width: '100%',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 10px rgba(0, 93, 164, 0.3)',
                    color: '#f8f9fa',
                    fontFamily: '"Montserrat", sans-serif',
                    letterSpacing: '0.5px',
                    gap: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                {[
                    { label: 'ID', value: row.original.id },
                    { label: 'Capacidad Máxima', value: row.original.maxPeople },
                    { label: 'Nombre', value: row.original.name },
                    { label: 'Hora de Apertura', value: row.original.openTime },
                    { label: 'Código de Espacio', value: row.original.spaceCode },
                    { label: 'Estado', value: row.original.spaceStatus.name },
                    { label: 'Descripción de Estado', value: row.original.spaceStatus.description },
                    { label: 'Edificio', value: row.original.buildingLocationResponse.building.name },
                    { label: 'Número de piso', value: row.original.buildingLocationResponse.floor },
                ].map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '8px',
                            borderRadius: '10px',
                            textAlign: 'left',
                            boxShadow: '0px 2px 5px rgba(255, 255, 255, 0.1)',
                            transition: '0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.3)',
                            },
                        }}
                    >
                        <Typography sx={{ fontWeight: 'bold', color: '#f8f9fa', fontFamily: '"Montserrat", sans-serif' }}>
                            {item.label}
                        </Typography>
                        <Typography sx={{fontFamily: '"Montserrat", sans-serif' }}>{item.value || 'N/A'}</Typography>
                    </Box>
                ))}
            </Box>
        ),
        state: {
            isLoading: isLoading,
            showAlertBanner: isError
        }
    })

    if (isError) return <div>Error</div>

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <SpaceBanner
                title="Gestión de Espacios"
                visibleButtons={["createSpace"]}
            />
            <MaterialReactTable table={table} />
        </>
    );
}

export default SpaceManagement;