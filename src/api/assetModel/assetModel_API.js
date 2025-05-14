
import handleAxiosError from "../handleAxiosError.js";
import api from "../../config/axios.js";

// Defines the base API path for asset-model-related requests
const root = '/api/asset-model'

/**
 * Updates an existing asset model by its ID.
 * @param {string|number} id - The ID of the asset model to update.
 * @param {object} assetModel - The updated asset model data.
 * @returns {object} - The updated asset model returned from the server.
 */
export async function updateAssetModel(id, assetModel) {
    try {
        const { data } = await api.put(`${root}/${id}`, assetModel)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes an asset model by its ID.
 * @param {string|number} id - The ID of the asset model to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteAssetModel(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all asset models from the server.
 * @returns {object} - The response object containing the list of asset models.
 */
export async function getAllAssetModels() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new asset model to the server.
 * @param {object} assetModel - The asset model data to save.
 * @returns {object} - The saved asset model returned from the server.
 */
export async function saveAssetModel(assetModel) {
    try {
        const { data } = await api.post(root, assetModel)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}