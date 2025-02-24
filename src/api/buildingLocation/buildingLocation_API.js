import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/building'

export async function updateBuilding(id, building) {
    try {
        const { data } = await api.put(`${root}/${id}`, building)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteBuilding(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllBuilding() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveBuilding(building) {
    try {
        const { data } = await api.post(root, building)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}