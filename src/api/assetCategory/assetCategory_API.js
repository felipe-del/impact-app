
import handleAxiosError from "../handleAxiosError.js";
import api from "../../config/axios.js";

const root = '/api/asset-category'

export async function updateAssetCategory(id, assetCategory) {
    try {
        const { data } = await api.put(`${root}/${id}`, assetCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteAssetCategory(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllAssetCategories() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveAssetCategory(assetCategory) {
    try {
        const { data } = await api.post(root, assetCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}