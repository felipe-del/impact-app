import {isAxiosError} from "axios";

export default function handleAxiosError(error) {
    if (isAxiosError(error) && error.response) {
        const backendError = error.response.data?.message || 'Error de conexión'
        throw new Error(backendError)
    } else {
        throw new Error('Error de conexión')
    }
}