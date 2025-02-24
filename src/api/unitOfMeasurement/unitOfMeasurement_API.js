import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/unit-of-measurement'

export async function getAllUnitOfMeasurement() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}
