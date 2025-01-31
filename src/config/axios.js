import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// view the request created by axios
/*api.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})*/

export default api