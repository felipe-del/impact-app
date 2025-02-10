import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/supplier'

export async function updateSupplier(id, supplier) {
    try {
        const { data } = await api.get(`${root}/${id}`, supplier)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteSupplier(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllSupplier() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveSupplier(supplier) {
    try {
        const { data } = await api.post(root, supplier)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}