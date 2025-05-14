import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for user-role-related requests
const root = '/api/user-role'

/**
 * Retrieves all user roles from the server.
 * @returns {object} - The response object containing the list of user roles.
 */
export async function getAllUserRoles() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}