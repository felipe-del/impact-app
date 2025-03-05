import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

const root = '/api/space-request&reservation'

export async function getSpaceRandRByUser(user) {
  try {
      const { data } = await api.get(`${root}/user/${user}`)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}

export async function cancelResAndReq(reqId) {
  try {
      const { data } = await api.delete(`${root}/${reqId}`)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}