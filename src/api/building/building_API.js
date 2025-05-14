
import handleAxiosError from "../handleAxiosError.js";
import api from "../../config/axios.js";

// Defines the base API path for building-related requests
const root = '/api/building'

/**
 * Updates an existing building by its ID.
 * @param {string|number} id - The ID of the building to update.
 * @param {object} brand - The updated building data.
 * @returns {object} - The updated building returned from the server.
 */
export async function updateBuilding(id, brand) {
    try {
        const { data } = await api.put(`${root}/${id}`, brand)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a building by its ID.
 * @param {string|number} id - The ID of the building to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteBuilding(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all buildings from the server.
 * @returns {object} - The response object containing the list of buildings.
 */
export async function getAllBuilding() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new building to the server.
 * @param {object} building - The building data to save.
 * @returns {object} - The saved building returned from the server.
 */
export async function saveBuilding(building) {
    try {
        const { data } = await api.post(root, building)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}