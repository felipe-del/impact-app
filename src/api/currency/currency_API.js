import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/currency'

export async function getAllCurrencies() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
