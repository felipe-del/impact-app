import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for user-state-related requests
const root = '/api/user-state'

/**
 * Retrieves all user states from the server.
 * @returns {object} - The response object containing the list of user states.
 */
export async function getAllUserStates() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}