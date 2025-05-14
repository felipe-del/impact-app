import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for location-number-related requests
const root = '/api/location-number'

/**
 * Updates a location number by its ID.
 * @param {string} id - The ID of the location number to update.
 * @param {object} locationNumber - The updated location number data.
 * @returns {object} - The updated location number returned from the server.
 */
export async function updateLocationNumber(id, locationNumber) {
    try {
        const { data } = await api.put(`${root}/${id}`, locationNumber)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a location number by its ID.
 * @param {string} id - The ID of the location number to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteLocationNumber(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all location numbers from the server.
 * @returns {object} - The response object containing the list of location numbers.
 */
export async function getAllLocationNumber() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new location number to the server.
 * @param {object} locationNumber - The location number data to save.
 * @returns {object} - The saved location number returned from the server.
 */
export async function saveLocationNumber(locationNumber) {
    try {
        const { data } = await api.post(root, locationNumber)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}