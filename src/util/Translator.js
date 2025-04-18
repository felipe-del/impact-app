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
        return this.statusMap[status] || "Desconocido";
    }
}

