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
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function register(name, email, password) {
    try {
        const { data } = await api.post(`${root}/register`, {name, email, password})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function forgotPassword(email) {
    try {
        const { data } = await api.post(`${root}/forgot-password`, {email})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function resetPassword(token, password) {
    try {
        const { data } = await api.post(`${root}/reset-password`, {token, password})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function changeUserState(userId, stateId) {
    try {
        const { data } = await api.post(`${root}/change-user-state/${userId}`, {stateId})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

export async function changeUserRole(userId, roleId) {
    try {
        const { data } = await api.post(`${root}/change-user-role/${userId}`, {roleId})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}