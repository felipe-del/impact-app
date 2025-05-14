import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for entity-type-related requests
const root = '/api/entity-type'

/**
 * Retrieves all entity types from the server.
 * @returns {object} - The response object containing the list of entity types.
 */
export async function getAllEntityType() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
