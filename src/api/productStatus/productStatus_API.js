import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for product-status-related requests
const root = '/api/product-status'

/**
 * Retrieves all product statuses from the server.
 * @returns {object} - The response object containing the list of product statuses.
 */
export async function getAllProductStatus() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
