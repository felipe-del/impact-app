import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for asset-related requests
const root_asset = '/api/asset'

/**
 * Retrieves all assets from the server.
 * @returns {object} - The response object containing the list of assets.
 */
export async function getAllAssets() {
    try {
        const { data } = await api.get(root_asset)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}