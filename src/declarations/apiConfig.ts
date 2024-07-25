// apiConfig.ts

const API_BASE_URL = 'http://localhost:8080';

const build_url = (endpoint: string) => {
    return `${API_BASE_URL}${endpoint}`;
};

export const API_URLS = {
    AUTH: {
        LOGIN: build_url('/api/auth/login'),
        REGISTER: build_url('/auth/sign-up'),
        CURRENT_USER: build_url('/api/auth/current-user'),
    },
    PRODUCTS: {
        LIST: build_url('/api/products'),
        DETAILS: (productId: string) => build_url(`/api/products/${productId}`),
    },

};

export type ApiUrls = typeof API_URLS;
