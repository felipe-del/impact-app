import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for space-status-related requests
const root = '/api/space-status'

/**
 * Retrieves all space statuses from the server.
 * @returns {object} - The response object containing the list of space statuses.
 */
export async function getAllSpaceStatus() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
