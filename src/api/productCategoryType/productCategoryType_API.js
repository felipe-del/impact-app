import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for product-category-type-related requests
const root = '/api/product-category-type'

/**
 * Updates a product category type by its ID.
 * @param {string} id - The ID of the product category type to update.
 * @param {object} productCategoryType - The updated product category type data.
 * @returns {object} - The updated product category type returned from the server.
 */
export async function updateProductCategoryType(id, productCategoryType) {
    try {
        const { data } = await api.put(`${root}/${id}`, productCategoryType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a product category type by its ID.
 * @param {string} id - The ID of the product category type to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteProductCategoryType(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all product category types from the server.
 * @returns {object} - The response object containing the list of product category types.
 */
export async function getAllProductCategoryType() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new product category type to the server.
 * @param {object} productCategoryType - The product category type data to save.
 * @returns {object} - The saved product category type returned from the server.
 */
export async function saveProductCategoryType(productCategoryType) {
    try {
        const { data } = await api.post(root, productCategoryType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}