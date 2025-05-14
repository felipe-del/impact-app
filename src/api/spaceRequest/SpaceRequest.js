import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for space-request-and-reservation-related requests
const root = '/api/space-request&reservation'

/**
 * Saves a space request to the server.
 * @param {object} spaceRequest - The space request object to be saved.
 * @returns {object} - The response object containing the saved space request.
 */
export async function saveSpaceRequest(spaceRequest) {
    try {
        const { data } = await api.post(root, spaceRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all space requests from the server.
 * @returns {object} - The response object containing the list of space requests.
 */
export async function getAllSpaceRequests() {
    try {
        const { data } = await api.get(`${root}/all`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}