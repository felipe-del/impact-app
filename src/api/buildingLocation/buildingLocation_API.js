import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for building-location-related requests
const root = '/api/building-location'

/**
 * Updates an existing building location by its ID.
 * @param {string|number} id - The ID of the building location to update.
 * @param {object} buildingLocation - The updated building location data.
 * @returns {object} - The updated building location returned from the server.
 */
export async function updateBuildingLocation(id, buildingLocation) {
    try {
        const { data } = await api.put(`${root}/${id}`, buildingLocation)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a building location by its ID.
 * @param {string|number} id - The ID of the building location to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteBuildingLocation(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all building locations from the server.
 * @returns {object} - The response object containing the list of building locations.
 */
export async function getAllBuildingLocation() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new building location to the server.
 * @param {object} buildingLocation - The building location data to save.
 * @returns {object} - The saved building location returned from the server.
 */
export async function saveBuildingLocation(buildingLocation) {
    try {
        const { data } = await api.post(root, buildingLocation)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}