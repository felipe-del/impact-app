import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/user-state'

export async function getAllUserStates() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}