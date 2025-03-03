import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/product-request'

export async function getProductRequestByUser(user) {
  try {
      const { data } = await api.get(root,user)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}