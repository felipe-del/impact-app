import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/user'

export async function getAllUsers() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

