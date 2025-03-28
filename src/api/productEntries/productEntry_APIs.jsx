import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/product-entries'

export async function getAllProductEntries() {
    try {
        const { data } = await api.get(root)
        return data
    }
    catch (error) {
        handleAxiosError(error)
    }
}