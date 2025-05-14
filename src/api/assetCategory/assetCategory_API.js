
import handleAxiosError from "../handleAxiosError.js";
import api from "../../config/axios.js";

// Defines the base API path for asset-category-related requests
const root = '/api/asset-category'

/**
 * Updates an existing asset category by its ID.
 * @param {string|number} id - The ID of the asset category to update.
 * @param {object} assetCategory - The updated asset category data.
 * @returns {object} - The updated asset category returned from the server.
 */
export async function updateAssetCategory(id, assetCategory) {
    try {
        const { data } = await api.put(`${root}/${id}`, assetCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes an asset category by its ID.
 * @param {string|number} id - The ID of the asset category to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteAssetCategory(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all asset categories from the server.
 * @returns {object} - The response object containing the list of asset categories.
 */
export async function getAllAssetCategories() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new asset category to the server.
 * @param {object} assetCategory - The asset category data to save.
 * @returns {object} - The saved asset category returned from the server.
 */
export async function saveAssetCategory(assetCategory) {
    try {
        const { data } = await api.post(root, assetCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}