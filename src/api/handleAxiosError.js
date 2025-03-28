import {isAxiosError} from "axios";

export default function handleAxiosError(error) {
    if (isAxiosError(error) && error.response) {
        const backendError = createErrorMessage(error.response.data)
        throw new Error(backendError)
    } else {
        throw new Error('Error de conexión')
    }
}

function createErrorMessage(responseWrapper) {
    let detailMessage = "";

    // Verifica que responseWrapper.data esté definido y sea un objeto antes de acceder a sus propiedades
    if (responseWrapper.data && responseWrapper.data.message) {
        detailMessage = responseWrapper.data.message;
    } else if (responseWrapper.data) {
        // Si no tiene message, recorre los detalles de error
        detailMessage = Object.entries(responseWrapper.data)
            .map(([field, error]) => `${field}: ${error}`)
            .join("\n");
    } else {
        // Si responseWrapper.data no está definido, asignar un mensaje de error genérico
        detailMessage = "Server Error. Please try again later.";
    }

    return `${responseWrapper.message} - ${detailMessage}`;
}
