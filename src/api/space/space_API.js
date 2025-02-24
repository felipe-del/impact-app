import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/space'

export async function updateSpace(id, space) {
    try {
        const { data } = await api.put(`${root}/${id}`, space)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteSpace(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllSpace() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveSpace(space) {
    try {
        const { data } = await api.post(root, space)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}