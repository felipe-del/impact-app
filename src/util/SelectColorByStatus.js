/**
 * Function to get the color associated with a given state.
 * @param {string} state - The state for which to get the color.
 * @return {string} - The color associated with the state.
 */
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
            return 'violet';
        case 'DEVUELTO':
            return 'orange';
        case 'ACEPTADO':
            return 'green';
        case 'CANCELADO':
            return 'salmon';
        default:
            return 'black';
    }
};