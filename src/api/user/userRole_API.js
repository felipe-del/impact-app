import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/user-role'

export async function getAllUserRoles() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}