import api from "../config/axios.js";
import handleAxiosError from "./handleAxiosError.js";

const root = '/api/auth'

export async function login(email, password) {
    try {
        const { data } = await api.post(`${root}/login`, {email, password})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function getUser() {
    try {
        const { data } = await api.get(`${root}/user-session`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function logout(jwtToken) {
    try {
        const response = await api.post(`${root}/logout`, {jwtToken})
        console.log(response)
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}