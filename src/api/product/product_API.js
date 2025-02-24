import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/product'

export async function updateProduct(id, product) {
    try {
        const { data } = await api.put(`${root}/${id}`, product)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteProduct(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllProduct() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveProduct(product) {
    try {
        const { data } = await api.post(root, product)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}