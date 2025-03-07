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
            return 'gray';
        default:
            return 'inherit';
    }
};