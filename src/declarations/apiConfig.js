// apiConfig.js

const API_BASE_URL = 'http://localhost:8080';

const buildUrl = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
};

export const API_URLS = {
    AUTH: {
        LOGIN: buildUrl('/auth/login'),
        REGISTER: buildUrl('/auth/sign-up'),
        CURRENT_USER: buildUrl('/auth/current-user'),
    },
    PRODUCTS: {
        LIST: buildUrl('/api/products'),
        DETAILS: (productId) => buildUrl(`/api/products/${productId}`),
    },
};
