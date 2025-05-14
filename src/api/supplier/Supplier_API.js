import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for supplier-related requests
const root = '/api/supplier'

/**
 * Updates a supplier's information on the server.
 * @param {string} id - The ID of the supplier to update.
 * @param {object} supplier - The updated supplier data.
 * @returns {object} - The updated supplier returned from the server.
 */
export async function updateSupplier(id, supplier) {
    try {
        const { data } = await api.put(`${root}/${id}`, supplier)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a supplier from the server.
 * @param {string} id - The ID of the supplier to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteSupplier(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all suppliers from the server.
 * @returns {object} - The response object containing the list of suppliers.
 */
export async function getAllSupplier() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new supplier to the server.
 * @param {object} supplier - The supplier data to save.
 * @returns {object} - The saved supplier returned from the server.
 */
export async function saveSupplier(supplier) {
    try {
        const { data } = await api.post(root, supplier)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}