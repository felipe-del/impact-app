import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

// Defines the base API path for space-request-and-reservation-related requests
const root = '/api/space-request&reservation'

/**
 * Retrieves all space requests by user from the server.
 * @param {string} user - The user ID for which to retrieve space requests.
 * @return {object} - The response object containing the list of space requests for the specified user.
 */
export async function getSpaceRandRByUser(user) {
  try {
      const { data } = await api.get(`${root}/user/${user}`)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}

/**
 * Cancels a space request and reservation by ID.
 * @param {string} reqId - The ID of the space request to cancel.
 * @param {object} cancelReason - The reason for cancellation.
 * @returns {object} - The response object containing the updated space request and reservation.
 */
export async function cancelResAndReq(reqId, cancelReason) {
  try {
      const { data } = await api.put(`${root}/${reqId}`, cancelReason)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}

/**
 * Retrieves all spaces requests excluding earring and renewal status from the server.
 * @return {object} - The response object containing the list of space requests excluding earring and renewal statuses.
 */
export async function getSpaceRequestsExcludingEarringAndRenewal(){
    try {
        const { data } = await api.get(`${root}/filter/excluding-earring-renewal`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all space requests with earring status from the server.
 * @return {object} - The response object containing the list of space requests with earring status.
 */
export async function getSpaceRequestsWithEarring(){
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
 * Accepts a space request by ID.
 * @param {string} spaceRequestId - The ID of the space request to accept.
 * @returns {object} - The response object containing the updated space request.
 */
export async function acceptSpaceRequest(spaceRequestId){
    try {
        const { data } = await api.put(`${root}/accept/${spaceRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Rejects a space request by ID.
 * @param {string} spaceRequestId - The ID of the space request to reject.
 * @returns {object} - The response object containing the updated space request.
 */
export async function rejectSpaceRequest(spaceRequestId){
    try {
        const { data } = await api.post(`${root}/reject/${spaceRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}