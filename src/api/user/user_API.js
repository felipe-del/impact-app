import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for user-related requests
const root = '/api/user'

/**
 * Retrieves all users from the server.
 * @returns {object} - The response object containing the list of users.
 */
export async function getAllUsers() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

