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

export async function cancelResAndReq(reqId, cancelReason) {
  try {
      const { data } = await api.put(`${root}/${reqId}`, cancelReason)
      return data
  } catch (error) {
      handleAxiosError(error)
  }
}

export async function getSpaceRequestsExcludingEarringAndRenewal(){
    try {
        const { data } = await api.get(`${root}/filter/excluding-earring-renewal`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getSpaceRequestsWithEarring(){
    try {
        const { data } = await api.get(`${root}/filter/earring`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function acceptSpaceRequest(spaceRequestId){
    try {
        const { data } = await api.put(`${root}/accept/${spaceRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function rejectSpaceRequest(spaceRequestId){
    try {
        const { data } = await api.post(`${root}/reject/${spaceRequestId}`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}