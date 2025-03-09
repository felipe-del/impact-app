import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/product-request'

export async function getProductRequestByUser(user) {
  try {
      const { data } = await api.get(`${root}/user/${user}`)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}

export async function updateProductRequest(id, productRequest) {
    try {
        const { data } = await api.put(`${root}/${id}`, productRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function deleteProductRequest(id) {
    try {
        const response = await api.delete(`${root}/${id}`)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function saveProductRequest(productRequest) {
    try {
        const { data } = await api.post(root, productRequest)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function cancelledProductRequest(productRId, cancelReason) {
    try {
        const { data } = await api.put(`${root}/cancel/${productRId}`, cancelReason)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}