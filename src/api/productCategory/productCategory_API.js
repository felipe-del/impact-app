import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for product-category-related requests
const root = '/api/product-category'

/**
 * Updates a product category by its ID.
 * @param {string} id - The ID of the product category to update.
 * @param {object} productCategory - The updated product category data.
 * @returns {object} - The updated product category returned from the server.
 */
export async function updateProductCategory(id, productCategory) {
    try {
        const { data } = await api.put(`${root}/${id}`, productCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a product category by its ID.
 * @param {string} id - The ID of the product category to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteProductCategory(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all product categories from the server.
 * @returns {object} - The response object containing the list of product categories.
 */
export async function getAllProductCategory() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new product category to the server.
 * @param {object} productCategory - The product category data to save.
 * @returns {object} - The saved product category returned from the server.
 */
export async function saveProductCategory(productCategory) {
    try {
        const { data } = await api.post(root, productCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}