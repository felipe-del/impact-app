import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for asset-status-related requests
const root = '/api/asset-status'

/**
 * Retrieves all asset statuses from the server.
 * @returns {object} - The response object containing the list of asset statuses.
 */
export async function getAllAssetStatus() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
