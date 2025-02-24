import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/product-category-type'

export async function updateProductCategoryType(id, productCategoryType) {
    try {
        const { data } = await api.put(`${root}/${id}`, productCategoryType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteProductCategoryType(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getAllProductCategoryType() {
    try {
        const { data } = await api.get(root)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveProductCategoryType(productCategoryType) {
    try {
        const { data } = await api.post(root, productCategoryType)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}