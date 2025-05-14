import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for currency-related requests
const root = '/api/currency'

/**
 * Retrieves all currencies from the server.
 * @returns {object} - The response object containing the list of currencies.
 */
export async function getAllCurrencies() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
