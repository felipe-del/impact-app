import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

// Defines the base API path for product-related requests
const root = '/api/product'

/**
 * Updates a product with the given ID on the server.
 * @param {string} id - The ID of the product to update.
 * @param {object} product - The updated product data.
 * @returns {object} - The updated product data returned from the server.
 */
export async function updateProduct(id, product) {
    try {
        const { data } = await api.put(`${root}/${id}`, product)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a product with the given ID from the server.
 * @param {string} id - The ID of the product to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteProduct(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all products from the server and translates their status names.
 * @returns {object} - The response object containing the list of products with translated status names.
 */
export async function getAllProduct() {
    try {
        const { data } = await api.get(root)

        const translatedProducts = data.data.map(product => {
            const originalStatus = product.status?.name;
            const translatedStatus = StatusTranslator.translate(originalStatus);

            return {
                ...product,
                status: {
                    ...product.status,
                    name: translatedStatus
                }
            };
        });

        const response = {
            ...data,
            data: translatedProducts
        };

        return response;
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new product to the server.
 * @param {object} product - The product data to save.
 * @returns {object} - The saved product data returned from the server.
 */
export async function saveProduct(product) {
    try {
        const { data } = await api.post(root, product)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Updates the availability status of a product with the given ID on the server.
 * @param {string} productId - The ID of the product to update.
 * @returns {object} - The updated product data returned from the server.
 */
export async function productAvailable(productId) {
    try {
        const { data } = await api.put(`${root}/1/${productId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}