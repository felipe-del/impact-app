/**
 * Function to translate status codes to Spanish.
 * 
 * @class
 * @static
 * @property {object} statusMap - A mapping of status codes to their Spanish translations.
 * @method translate - Translates a given status code to Spanish.
 * @param {string} status - The status code to translate.
 * @returns {string} - The translated status code in Spanish.
 */
export class StatusTranslator {
    static statusMap = {
        "AVAILABLE": "DISPONIBLE",
        "IN_MAINTENANCE": "EN MANTENIMIENTO",
        "LOANED": "PRESTADO",
        "OUT_OF_SERVICE": "FUERA DE SERVICIO",
        "EARRING": "PENDIENTE",
        "INACTIVE": "INACTIVO",
        "ACTIVE": "ACTIVO",
        "SUSPENDED": "SUSPENDIDO",
        "RETURNED": "DEVUELTO",
        "ACCEPTED": "ACEPTADO",
        "CANCELED": "CANCELADO",
        "ADMINISTRATOR": "ADMINISTRADOR",
        "MANAGER": "GERENTE",
        "TEACHER": "PROFESOR",
    };

    static translate(status) {
        return this.statusMap[status] ?? status;
    }
}

