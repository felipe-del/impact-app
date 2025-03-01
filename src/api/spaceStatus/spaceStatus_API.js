import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/space-status'

export async function getAllSpaceStatus() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
