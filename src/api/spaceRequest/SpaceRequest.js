import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/space-request&reservation'

export async function saveSpaceRequest(spaceRequest) {
    try {
        const { data } = await api.post(root, spaceRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}