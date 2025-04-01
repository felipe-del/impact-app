import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/asset-loan-statistics'


export async function getAllAssetsLoansStats() {
    try {
        const { data } = await api.get(root)
        return data;
    }
    catch (error) {
        handleAxiosError(error)
    }
}