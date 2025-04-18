export const getStateColor = (state) => {
    switch (state) {
        case 'DISPONIBLE':
            return 'green';
        case 'EN MANTENIMIENTO':
            return 'orange';
        case 'PRESTADO':
            return 'blue';
        case 'FUERA DE SERVICIO':
            return 'red';
        case 'PENDIENTE':
            return 'blue';
        case 'DEVUELTO':
            return 'orange';
        case 'ACEPTADO':
            return 'green';
        case 'CANCELADO':
            return 'red';
        default:
            return 'inherit';
    }
};