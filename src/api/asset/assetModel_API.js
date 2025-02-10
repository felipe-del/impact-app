
import handleAxiosError from "../handleAxiosError.js";
import api from "../../config/axios.js";

const root = '/api/asset-model'

export async function updateAssetModel(id, assetModel) {
    try {
        const { data } = await api.get(`${root}/${id}`, assetModel)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteAssetModel(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllAssetModels() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveAssetModel(assetModel) {
    try {
        const { data } = await api.post(root, assetModel)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}