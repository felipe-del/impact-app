import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

// Defines the base API path for product-request-related requests
const root = '/api/product-request'

/**
 * Retrieves all product requests from the server.
 * @returns {object} - The response object containing the list of product requests.
 */
export async function getAllProductRequests() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all product requests by user from the server.
 * @param {string} user - The user ID to filter product requests.
 * @return {object} - The response object containing the list of product requests for the specified user.
 */
export async function getProductRequestByUser(user) {
  try {
      const { data } = await api.get(`${root}/user/${user}`)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}

/**
 * Updates a product request by ID.
 * @param {string} id - The ID of the product request to update.
 * @param {object} productRequest - The updated product request data.
 * @returns {object} - The updated product request returned from the server.
*/
export async function updateProductRequest(id, productRequest) {
    try {
        const { data } = await api.put(`${root}/${id}`, productRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a product request by ID.
 * @param {string} id - The ID of the product request to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteProductRequest(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new product request to the server.
 * @param {object} productRequest - The product request data to save.
 * @returns {object} - The saved product request returned from the server.
 */
export async function saveProductRequest(productRequest) {
    try {
        const { data } = await api.post(root, productRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Cancels a product request by ID.
 * @param {string} productRId - The ID of the product request to cancel.
 * @param {object} cancelReason - The reason for cancellation.
 * @returns {object} - The server's response after cancellation.
 */
export async function cancelledProductRequest(productRId, cancelReason) {
    try {
        const { data } = await api.put(`${root}/cancel/${productRId}`, cancelReason)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all product requests without earring and renewal status from the server.
 * @returns {object} - The response object containing the list of product requests excluding earring and renewal.
 */
export async function getProductRequestsExcludingEarringAndRenewal(){
    try {
        const { data } = await api.get(`${root}/filter/excluding-earring-renewal`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all product requests with earring status from the server.
 * @returns {object} - The response object containing the list of product requests with earring status.
 */
export async function getProductRequestsWithEarring(){
    try {
        const { data } = await api.get(`${root}/filter/earring`)
        const translatedRequest = data.data.map(request => {
            const originalStatus = request.status?.name;
            const translatedStatus = StatusTranslator.translate(originalStatus);

            return {
                ...request,
                status: {
                    ...request.status,
                    name: translatedStatus
                }
            };
        });

        const response = {
            ...data,
            data: translatedRequest
        };

        return response;
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Accepts a product request by ID.
 * @param {string} productRequestId - The ID of the product request to accept.
 * @returns {object} - The server's response after accepting the product request.
 */
export async function acceptProductRequest(productRequestId){
    try {
        const { data } = await api.put(`${root}/accept/${productRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Rejects a product request by ID.
 * @param {string} productRequestId - The ID of the product request to reject.
 * @returns {object} - The server's response after rejecting the product request.
 */
export async function rejectProductRequest(productRequestId){
    try {
        const { data } = await api.post(`${root}/reject/${productRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}