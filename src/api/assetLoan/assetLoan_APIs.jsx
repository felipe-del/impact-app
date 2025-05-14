import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for asset-loan-statistics-related requests
const root = '/api/asset-loan-statistics'

/**
 * Retrieves all asset loan statistics from the server.
 * @returns {object} - The response object containing the list of asset loan statistics.
 */
export async function getAllAssetsLoansStats() {
    try {
        const { data } = await api.get(root)
        return data;
    }
    catch (error) {
        handleAxiosError(error)
    }
}