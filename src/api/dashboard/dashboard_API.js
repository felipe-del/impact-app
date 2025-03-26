import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root_asset = '/api/asset'


export async function getAllAssets() {
    try {
        const { data } = await api.get(root_asset)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}