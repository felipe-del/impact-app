import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

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
        const { data } = await api.post(`${root}/renew`, subCategory)
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

export async function acceptAssetRenewalRequest(assetRequestId) {
    try {
        const { data } = await api.put(`${root}/accept-renewal/${assetRequestId}`)
        return data
    }
    catch (error) {
        handleAxiosError(error)
    }
}

export async function rejectAssetRenewalRequest(assetRequestId) {
    try {
        const { data } = await api.put(`${root}/reject-renewal/${assetRequestId}`)
        return data
    }
    catch (error) {
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
        const { data } = await api.get(`${root}/renewal-request`)
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

export async function getAssetRequestsWithEarring(){
    try {
        const { data } = await api.get(`${root}/filter/earring`)

        const translatedRequest = data.data.map(request => {
            const originalStatus = request.status?.name;
            const translatedStatus = StatusTranslator.translate(originalStatus);

            return {
                ...request,
                status: {
                    ...request.status,
                    name: translatedStatus
                }
            };
        });

        const response = {
            ...data,
            data: translatedRequest
        };

        return response;
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function acceptAssetRequest(assetRequestId) {
    try {
        const { data } = await api.put(`${root}/accept/${assetRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function rejectAssetRequest(assetRequestId) {
    try {
        const { data } = await api.post(`${root}/reject/${assetRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}