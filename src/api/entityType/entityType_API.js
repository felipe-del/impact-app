import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/entity-type'

export async function getAllEntityType() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
