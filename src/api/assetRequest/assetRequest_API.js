import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

// Defines the base API path for asset-request-related requests
const root = '/api/asset-request'

/**
 * Updates an existing asset request by its ID.
 * @param {string|number} id - The ID of the asset request to update.
 * @param {object} assetRequest - The updated asset request data.
 * @returns {object} - The updated asset request returned from the server.
 */
export async function updateAssetRequest(id, assetRequest) {
    try {
        const { data } = await api.put(`${root}/${id}`, assetRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Updates an existing asset request for renewal by its ID.
 * @param {string|number} id - The ID of the asset request to update.
 * @param {object} assetRequest - The updated asset request data.
 * @returns {object} - The updated asset request returned from the server.
 */
export async function updateAssetRequestRenewal(id, assetRequest) {
    try {
        const { data } = await api.put(`${root}/renew/${id}`, assetRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes an asset request by its ID.
 * @param {string|number} id - The ID of the asset request to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteAssetRequest(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all asset requests.
 * @returns {object} - The response object with the list of asset requests and translated status names.
*/ 
export async function getAllAssetRequest() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves an asset request by its ID.
 * @param {string|number} id - The ID of the asset request to retrieve.
 * @returns {object} - The asset request data returned from the server.
 */
export async function getAssetRequestById(id) {
    try {
        const { data } = await api.get(`${root}/${id}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new asset request for renewal.
 * @param {object} subCategory - The asset request data to save.
 * @returns {object} - The saved asset request returned from the server.
*/
export async function saveAssetRequestRenewal(subCategory){
    try {
        const { data } = await api.post(`${root}/renew`, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new asset request.
 * @param {object} subCategory - The asset request data to save.
 * @returns {object} - The saved asset request returned from the server.
*/
export async function saveAssetRequest(subCategory) {
    try {
        const { data } = await api.post(root, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves asset requests by user ID.
 * @param {string|number} user - The ID of the user whose asset requests to retrieve.
 * @returns {object} - The response object with the list of asset requests for the specified user.
*/
export async function getAssetRequestByUser(user) {
    try {
        const { data } = await api.get(`${root}/user/${user}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Accept an asset renewal request by its ID.
 * @param {string|number} id - The ID of the asset request to update.
 * @returns {object} - The updated asset request returned from the server.
*/
export async function acceptAssetRenewalRequest(assetRequestId) {
    try {
        const { data } = await api.put(`${root}/accept-renewal/${assetRequestId}`)
        return data
    }
    catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Reject an asset renewal request by its ID.
 * @param {string|number} assetRequestId - The ID of the asset request to reject.
 * @returns {object} - The server's response after rejection.
*/
export async function rejectAssetRenewalRequest(assetRequestId) {
    try {
        const { data } = await api.put(`${root}/reject-renewal/${assetRequestId}`)
        return data
    }
    catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Cancel an asset request by its ID.
 * @param {string|number} assetRequestId - The ID of the asset request to cancel.
 * @param {object} cancelReason - The reason for cancellation.
 * @returns {object} - The server's response after cancellation.
*/
export async function cancelledAssetRequest(assetRequestId, cancelReason) {
    try {
        const statusId = 4
        const { data } = await api.put(`${root}/${statusId}/${assetRequestId}`, cancelReason)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves asset requests for renewal.
 * @returns {object} - The response object with the list of asset requests for renewal.
*/
export async function getAssetRequestRenewal(){
    try {
        const { data } = await api.get(`${root}/renewal-request`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves asset requests excluding earring and renewal requests.
 * @returns {object} - The response object with the list of asset requests excluding earring and renewal requests.
*/
export async function getAssetRequestsExcludingEarringAndRenewal(){
    try {
        const { data } = await api.get(`${root}/filter/excluding-earring-renewal`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves asset requests for earring.
 * @returns {object} - The response object with the list of asset requests for earring.
*/
export async function getAssetRequestsWithEarring(){
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
 * Accepts an asset request by its ID.
 * @param {string|number} assetRequestId - The ID of the asset request to accept.
 * @returns {object} - The server's response after acceptance.
*/
export async function acceptAssetRequest(assetRequestId) {
    try {
        const { data } = await api.put(`${root}/accept/${assetRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Rejects an asset request by its ID.
 * @param {string|number} assetRequestId - The ID of the asset request to reject.
 * @returns {object} - The server's response after rejection.
*/
export async function rejectAssetRequest(assetRequestId) {
    try {
        const { data } = await api.post(`${root}/reject/${assetRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}