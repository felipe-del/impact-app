import CachedIcon from '@mui/icons-material/Cached';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import MonitorIcon from '@mui/icons-material/Monitor';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';

export const getStateIcon = (state) => {
    switch (state) {
        case 'DISPONIBLE':
            return <PlayCircleOutlineIcon style={{width: '18px'}}/>;
        case 'EN MANTENIMIENTO':
            return <BuildCircleIcon style={{width: '18px'}}/>;
        case 'PRESTADO':
            return <CheckCircleOutlineIcon style={{width: '18px'}}/>;
        case 'FUERA DE SERVICIO':
            return <DoNotDisturbIcon style={{width: '18px'}}/>;
        case 'PENDIENTE':
            return <CachedIcon style={{width: '18px'}}/>;
        case 'DEVUELTO':
            return <PublishedWithChangesIcon style={{width: '18px'}}/>;
        case 'ACEPTADO':
            return <CheckCircleOutlineIcon style={{width: '18px'}}/>;
        case 'CANCELADO':
            return <DoNotDisturbIcon style={{width: '18px'}}/>;
        case 'Activo':
            return <MonitorIcon style={{width: '18px'}}/>;
        case 'Espacio':
            return <ApartmentIcon style={{width: '18px'}}/>;
        case 'Producto':
            return <TakeoutDiningIcon style={{width: '18px'}}/>;
        default:
            return 'inherit';
    }
};