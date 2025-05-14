
import handleAxiosError from "../handleAxiosError.js";
import api from "../../config/axios.js";

// Defines the base API path for brand-related requests
const root = '/api/brand'

/**
 * Updates an existing brand by its ID.
 * @param {string|number} id - The ID of the brand to update.
 * @param {object} brand - The updated brand data.
 * @returns {object} - The updated brand returned from the server.
 */
export async function updateBrand(id, brand) {
    try {
        const { data } = await api.put(`${root}/${id}`, brand)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a brand by its ID.
 * @param {string|number} id - The ID of the brand to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteBrand(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all brands from the server.
 * @returns {object} - The response object containing the list of brands.
 */
export async function getAllBrands() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new brand to the server.
 * @param {object} brand - The brand data to save.
 * @returns {object} - The saved brand returned from the server.
 */
export async function saveBrand(brand) {
    try {
        const { data } = await api.post(root, brand)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}