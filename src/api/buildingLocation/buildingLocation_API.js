import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/building-location'

export async function updateBuildingLocation(id, buildingLocation) {
    try {
        const { data } = await api.put(`${root}/${id}`, buildingLocation)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteBuildingLocation(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllBuildingLocation() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveBuildingLocation(buildingLocation) {
    try {
        const { data } = await api.post(root, buildingLocation)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}