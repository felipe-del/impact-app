import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/asset-sub-category'

export async function updateSubCategory(id, subCategory) {
    try {
        const { data } = await api.get(`${root}/${id}`, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteSubCategory(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllSubCategory() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveSubCategory(subCategory) {
    try {
        const { data } = await api.post(root, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}