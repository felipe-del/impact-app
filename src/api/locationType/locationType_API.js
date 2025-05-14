import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for location-type-related requests
const root = '/api/location-type'

/**
 * Updates a location type on the server.
 * @param {string} id - The ID of the location type to update.
 * @param {object} locationType - The updated location type data.
 * @returns {object} - The updated location type returned from the server.
 */
export async function updateLocationType(id, locationType) {
    try {
        const { data } = await api.put(`${root}/${id}`, locationType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a location type from the server.
 * @param {string} id - The ID of the location type to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteLocationType(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all location types from the server.
 * @returns {object} - The response object containing the list of location types.
 */
export async function getAllLocationType() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new location type to the server.
 * @param {object} locationType - The location type data to save.
 * @returns {object} - The saved location type returned from the server.
 */
export async function saveLocationType(locationType) {
    try {
        const { data } = await api.post(root, locationType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}