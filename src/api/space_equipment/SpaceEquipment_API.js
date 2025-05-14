import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for space-equipment-related requests
const root = '/api/space-equipment'

/**
 * Updates the space equipment with the given ID.
 * @param {string} id - The ID of the space equipment to update.
 * @param {object} spaceEquipment - The updated space equipment data.
 * @returns {object} - The updated space equipment returned from the server.
 */
export async function updateSpaceEquipment(id, spaceEquipment) {
    try {
        const { data } = await api.put(`${root}/${id}`, spaceEquipment)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes the space equipment with the given ID.
 * @param {string} id - The ID of the space equipment to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteSpaceEquipment(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all space equipment from the server.
 * @returns {object} - The response object containing the list of space equipment.
 */
export async function getAllSpaceEquipment() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new space equipment to the server.
 * @param {object} spaceEquipment - The space equipment data to save.
 * @returns {object} - The saved space equipment returned from the server.
 */
export async function saveSpaceEquipment(spaceEquipment) {
    try {
        const { data } = await api.post(root, spaceEquipment)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}