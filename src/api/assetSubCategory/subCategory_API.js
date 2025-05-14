import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for asset-subcategory-related requests
const root = '/api/asset-sub-category'

/**
 * Updates an existing asset sub-category by its ID.
 * @param {string|number} id - The ID of the asset sub-category to update.
 * @param {object} subCategory - The updated asset sub-category data.
 * @returns {object} - The updated asset sub-category returned from the server.
 */
export async function updateSubCategory(id, subCategory) {
    try {
        const { data } = await api.put(`${root}/${id}`, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes an asset sub-category by its ID.
 * @param {string|number} id - The ID of the asset sub-category to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteSubCategory(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all asset sub-categories from the server.
 * @returns {object} - The response object containing the list of asset sub-categories.
 */
export async function getAllSubCategory() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new asset sub-category to the server.
 * @param {object} subCategory - The asset sub-category data to save.
 * @returns {object} - The saved asset sub-category returned from the server.
 */
export async function saveSubCategory(subCategory) {
    try {
        const { data } = await api.post(root, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}