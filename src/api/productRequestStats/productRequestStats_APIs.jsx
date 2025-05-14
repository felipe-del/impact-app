import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for product-request-statistics-related requests
const root = '/api/product-request-statistics'

/**
 * Retrieves all product request statistics from the server.
 * @returns {object} - The response object containing the list of product request statistics.
 */
export async function getAllProductRequestStats() {
    try {
        const { data } = await api.get(root)
        return data;
    }
    catch (error) {
        handleAxiosError(error)
    }
}