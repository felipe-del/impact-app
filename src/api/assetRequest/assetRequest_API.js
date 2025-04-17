import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/asset-request'

export async function updateAssetRequest(id, assetRequest) {
    try {
        const { data } = await api.put(`${root}/${id}`, assetRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function updateAssetRequestRenewal(id, assetRequest) {
    try {
        const { data } = await api.put(`${root}/renew/${id}`, assetRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteAssetRequest(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllAssetRequest() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAssetRequestById(id) {
    try {
        const { data } = await api.get(`${root}/${id}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveAssetRequestRenewal(subCategory){
    try {
        const { data } = await api.post(root, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveAssetRequest(subCategory) {
    try {
        const { data } = await api.post(root, subCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
export async function getAssetRequestByUser(user) {
    try {
        const { data } = await api.get(`${root}/user/${user}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function cancelledAssetRequest(assetRequestId, cancelReason) {
    try {
        const statusId = 4
        const { data } = await api.put(`${root}/${statusId}/${assetRequestId}`, cancelReason)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAssetRequestRenewal(){
    try {
        const { data } = await api.get(`${root}/request-renewal`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAssetRequestsExcludingEarringAndRenewal(){
    try {
        const { data } = await api.get(`${root}/filter/excluding-earring-renewal`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}