
import handleAxiosError from "../handleAxiosError.js";
import api from "../../config/axios.js";

const root = '/api/brand'

export async function updateBrand(id, brand) {
    try {
        const { data } = await api.put(`${root}/${id}`, brand)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteBrand(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllBrands() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveBrand(brand) {
    try {
        const { data } = await api.post(root, brand)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}