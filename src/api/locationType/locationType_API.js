import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/location-type'

export async function updateLocationType(id, locationType) {
    try {
        const { data } = await api.put(`${root}/${id}`, locationType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteLocationType(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllLocationType() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveLocationType(locationType) {
    try {
        const { data } = await api.post(root, locationType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}