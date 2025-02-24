import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/location-number'

export async function updateLocationNumber(id, locationNumber) {
    try {
        const { data } = await api.put(`${root}/${id}`, locationNumber)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteLocationNumber(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllLocationNumber() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveLocationNumber(locationNumber) {
    try {
        const { data } = await api.post(root, locationNumber)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}