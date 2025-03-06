import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/asset'

export async function updateAsset(id, asset) {
    try {
        const { data } = await api.put(`${root}/${id}`, asset)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteAsset(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllAssets() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAssetById(id) {
    try {
        const { data } = await api.get(`${root}/${id}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveAsset(asset) {
    try {
        const { data } = await api.post(root, asset)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
export async function assetAvailable(assetId) {
    try {
        const { data } = await api.put(`${root}/1/${assetId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}