import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/product-category'

export async function updateProductCategory(id, productCategory) {
    try {
        const { data } = await api.put(`${root}/${id}`, productCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteProductCategory(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllProductCategory() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveProductCategory(productCategory) {
    try {
        const { data } = await api.post(root, productCategory)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}