import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/product-request-statistics'

export async function getAllProductRequestStats() {
    try {
        const { data } = await api.get(root)
        return data;
    }
    catch (error) {
        handleAxiosError(error)
    }
}