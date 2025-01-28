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
    return `${responseWrapper.message} - ${responseWrapper.data.message}`
}