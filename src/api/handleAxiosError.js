import {isAxiosError} from "axios";

/**
 * Handles errors from Axios requests by checking if the error is an AxiosError and has a response.
 * If so, it creates a detailed error message based on the response data.
 * If not, it throws a generic connection error.
 * @param {object} error - The error object from the Axios request.
 * @throws {Error} - Throws an error with a detailed message based on the response data or a generic connection error.
 * @returns {void}
 */
export default function handleAxiosError(error) {
    if (isAxiosError(error) && error.response) {
        const backendError = createErrorMessage(error.response.data)
        throw new Error(backendError)
    } else {
        throw new Error('Error de conexión')
    }
}

/**
 * Creates a detailed error message based on the response from the server.
 * @param {object} responseWrapper - The response object from the server.
 * @returns {string} - A detailed error message.
 */
function createErrorMessage(responseWrapper) {
    let detailMessage = "";

    if (responseWrapper.data && responseWrapper.data.message) {
        detailMessage = responseWrapper.data.message;
    } else if (responseWrapper.data) {
        detailMessage = Object.entries(responseWrapper.data)
            .map(([field, error]) => `${field}: ${error}`)
            .join("\n");
    } else {
        detailMessage = "Server Error. Please try again later.";
    }

    return `${responseWrapper.message} - ${detailMessage}`;
}
