import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for product-entry-related requests
const root = '/api/product-entries'

/**
 * Retrieves all product entries from the server.
 * @returns {object} - The response object containing the list of product entries.
 */
export async function getAllProductEntries() {
    try {
        const { data } = await api.get(root)
        return data
    }
    catch (error) {
        handleAxiosError(error)
    }
}