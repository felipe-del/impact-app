import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

// Defines the base API path for asset-related requests
const root = '/api/asset'

/**
 * Updates an existing asset by its ID.
 * @param {string|number} id - The ID of the asset to update.
 * @param {object} asset - The updated asset data.
 * @returns {object} - The updated asset returned from the server.
 */
export async function updateAsset(id, asset) {
    try {
        const { data } = await api.put(`${root}/${id}`, asset)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes an asset by its ID.
 * @param {string|number} id - The ID of the asset to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteAsset(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all assets and translates their status names.
 * @returns {object} - The response object with the list of assets and translated status names.
 */
export async function getAllAssets() {
    try {
        const { data } = await api.get(root)

        // Translate the status name for each asset
        const translatedAssets = data.data.map(asset => {
            const originalStatus = asset.status?.name
            const translatedStatus = StatusTranslator.translate(originalStatus)

            return {
                ...asset,
                status: {
                    ...asset.status,
                    name: translatedStatus
                }
            }
        })

        // Return the full response with translated assets
        const response = {
            ...data,
            data: translatedAssets
        }

        return response
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves a specific asset by its ID.
 * @param {string|number} id - The ID of the asset.
 * @returns {object} - The corresponding asset data.
 */
export async function getAssetById(id) {
    try {
        const { data } = await api.get(`${root}/${id}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Creates a new asset in the database.
 * @param {object} asset - The new asset data to be saved.
 * @returns {object} - The server's response with the saved asset.
 */
export async function saveAsset(asset) {
    try {
        const { data } = await api.post(root, asset)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves the total inventory value of assets within a date range.
 * @param {string} start_date - Start date in YYYY-MM-DD format.
 * @param {string} end_date - End date in YYYY-MM-DD format.
 * @returns {object} - Data containing the inventory value for the given range.
 */
export async function assetInventoryValue(start_date, end_date) {
    try {
        const { data } = await api.get(`${root}/inventory-value?start_date=${start_date}&end_date=${end_date}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Marks an asset as available using a PUT request.
 * @param {string|number} assetId - The ID of the asset to update.
 * @returns {object} - The server's response with the updated status.
 */
export async function assetAvailable(assetId) {
    try {
        const { data } = await api.put(`${root}/1/${assetId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves assets purchased within a specific date range.
 * @param {string} start_date - Start purchase date in YYYY-MM-DD format.
 * @param {string} end_date - End purchase date in YYYY-MM-DD format.
 * @returns {object} - List of assets purchased between the given dates.
 */
export async function getAssetByPurchaseDate(start_date, end_date) {
    try {
        const { data } = await api.get(`${root}/by-purchase-date`, {
            params: { startDate: start_date, endDate: end_date }
        })
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

