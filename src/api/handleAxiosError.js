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

    if (!responseWrapper.data.message) {
        detailMessage = Object.entries(responseWrapper.data)
            .map(([field, error]) => `${field}: ${error}`)
            .join("\n");
    } else {
        detailMessage = responseWrapper.data.message;
    }

    return `${responseWrapper.message} - ${detailMessage}`;
}
