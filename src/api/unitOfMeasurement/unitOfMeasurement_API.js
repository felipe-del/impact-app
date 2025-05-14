import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for unit-of-measurement-related requests
const root = '/api/unit-of-measurement'

/**
 * Retrieves all unit of measurements from the server.
 * @returns {object} - The response object containing the list of unit of measurements.
 */
export async function getAllUnitOfMeasurement() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
