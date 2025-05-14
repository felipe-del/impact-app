import api from "../../config/axios.js";
import handleAxiosError from "../handleAxiosError.js";

// Defines the base API path for auth-related requests
const root = '/api/auth'

/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {object} - The response object containing the login result.
 */
export async function login(email, password) {
    try {
        const { data } = await api.post(`${root}/login`, {email, password})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Retrieves the current user's session information.
 * @returns {object} - The response object containing the user session data.
 */
export async function getUserSession() {
    try {
        const { data } = await api.get(`${root}/user-session`)
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Logs out the user by invalidating the JWT token.
 * @param {string} jwtToken - The JWT token to invalidate.
 * @return {object} - The response object containing the logout result.
 */
export async function logout(jwtToken) {
    try {
        const response = await api.post(`${root}/logout`, {jwtToken})
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Registers a new user with the provided name, email, and password.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {object} - The response object containing the registration result.
 */
export async function register(name, email, password) {
    try {
        const { data } = await api.post(`${root}/register`, {name, email, password})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Sends a password reset token to the user's email address.
 * @param {string} email - The user's email address.
 * @returns {object} - The response object containing the result of the password reset request.
 */
export async function forgotPassword(email) {
    try {
        const { data } = await api.post(`${root}/forgot-password`, {email})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Resets the user's password using the provided token and new password.
 * @param {string} token - The password reset token sent to the user's email.
 * @param {string} password - The new password to set for the user.
 * @returns {object} - The response object containing the result of the password reset.
 */
export async function resetPassword(token, password) {
    try {
        const { data } = await api.post(`${root}/reset-password`, {token, password})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Changes the user's password using the provided old and new passwords.
 * @param {string} oldPassword - The user's current password.
 * @param {string} newPassword - The new password to set for the user.
 * @param {string} confirmNewPassword - Confirmation of the new password.
 * @returns {object} - The response object containing the result of the password change.
 */
export async function changePassword(oldPassword, newPassword, confirmNewPassword) {
    try {
        const { data } = await api.post(`${root}/change-password`, {oldPassword, newPassword, confirmNewPassword})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Updates the user's state using the provided user ID and state ID.
 * @param {string|number} userId - The ID of the user to update.
 * @param {string|number} stateId - The ID of the new state to set for the user.
 * @returns {object} - The response object containing the result of the state change.
 */
export async function changeUserState(userId, stateId) {
    try {
        const { data } = await api.post(`${root}/change-user-state/${userId}`, {stateId})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Changes the user's role using the provided user ID and role ID.
 * @param {string|number} userId - The ID of the user to update.
 * @param {string|number} roleId - The ID of the new role to set for the user.
 * @returns {object} - The response object containing the result of the role change.
 */
export async function changeUserRole(userId, roleId) {
    try {
        const { data } = await api.post(`${root}/change-user-role/${userId}`, {roleId})
        return data
    } catch (error) {
        handleAxiosError(error)
    }
}

/**
 * Save a user to the database using the provided user object.
 * @param {object} user - The user object containing user details.
 * @returns {object} - The response object containing the result of the save operation.
 */
export async function saveUser(user){
    try{
        const { data } = await api.post(`${root}/save-user`,user)
        return data
    }catch(error){
        handleAxiosError(error)
    }
}