import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

// Defines the base API path for space-related requests
const root = '/api/space'

/**
 * Updates a space with the given ID on the server.
 * @param {string} id - The ID of the space to update.
 * @param {object} space - The updated space data.
 * @returns {object} - The updated space data returned from the server.
 */
export async function updateSpace(id, space) {
    try {
        const { data } = await api.put(`${root}/${id}`, space)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Deletes a space with the given ID from the server.
 * @param {string} id - The ID of the space to delete.
 * @returns {object} - The server's response after deletion.
 */
export async function deleteSpace(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves all spaces from the server and translates their status names.
 * @returns {object} - The response object containing the list of spaces with translated status names.
 */
export async function getAllSpace() {
    try {
        const { data } = await api.get(root)

        const translatedSpaces = data.data.map(space => {
            const originalStatus = space.spaceStatus?.name;
            const translatedStatus = StatusTranslator.translate(originalStatus);

            return {
                ...space,
                spaceStatus: {
                    ...space.spaceStatus,
                    name: translatedStatus
                }
            };
        });

        const response = {
            ...data,
            data: translatedSpaces
        };

        return response;
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Saves a new space to the server.
 * @param {object} space - The space data to save.
 * @returns {object} - The saved space data returned from the server.
 */
export async function saveSpace(space) {
    try {
        const { data } = await api.post(root, space)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}