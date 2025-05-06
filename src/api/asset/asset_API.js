import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";
import {StatusTranslator} from "../../util/Translator.js";

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
        const { data } = await api.get(root);

        const translatedAssets = data.data.map(asset => {
            const originalStatus = asset.status?.name;
            const translatedStatus = StatusTranslator.translate(originalStatus);

            return {
                ...asset,
                status: {
                    ...asset.status,
                    name: translatedStatus
                }
            };
        });

        const response = {
            ...data,
            data: translatedAssets
        };

        return response;
    } catch (error) {
        handleAxiosError(error);
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

export async function assetInventoryValue(start_date, end_date) {
    try {
        const {data} = await api.get(`${root}/inventory-value?start_date=${start_date}&end_date=${end_date}`)
        return data
    }
    catch(error) {
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
export async function getAssetByPurchaseDate(start_date, end_date) {
    try {
        const { data } = await api.get(`${root}/by-purchase-date`, {
            params: { startDate: start_date, endDate: end_date }
        });
        return data;
    } catch (error) {
        handleAxiosError(error);
    }
}
