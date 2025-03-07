import CachedIcon from '@mui/icons-material/Cached';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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
        default:
            return 'inherit';
    }
};