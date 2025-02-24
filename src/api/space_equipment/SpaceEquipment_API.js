import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/space-equipment'

export async function updateSpaceEquipment(id, spaceEquipment) {
    try {
        const { data } = await api.put(`${root}/${id}`, spaceEquipment)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteSpaceEquipment(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllSpaceEquipment() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveSpaceEquipment(spaceEquipment) {
    try {
        const { data } = await api.post(root, spaceEquipment)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}