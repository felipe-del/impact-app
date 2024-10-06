// apiConfig.js

const API_BASE_URL = 'http://localhost:8080';

const concat = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
};

export const API_URLS = {
    AUTH: {
        LOGIN: concat('/auth/login'),
        REGISTER: concat('/auth/sign-up'),
        CURRENT_USER: concat('/auth/current-user'),
    },
    USER: {
        GET_ALL: concat('/user')
    },
    PRODUCTS: {
        LIST: concat('/api/products'),
        DETAILS: (productId) => concat(`/api/products/${productId}`),
    },
    BRAND: {
        GET_ALL: concat('/brand')
    },
    ASSET: {
        SAVE_ASSET_REQUEST: concat('/asset/request'),
        GET_ALL: concat('/asset'),
        GET_ALL_CATEGORY: concat('/asset/category'),
        GET_ALL_SUBCATEGORY: concat('/asset/subcategory'),
        GET_ALL_STATUS: concat('/asset/status'),
        GET_ALL_CURRENCY: concat('/asset/currency'),
        GET_ALL_MODEL: concat('/asset/model'),
        GET_ALL_LOCATION_TYPE: concat('/asset/locationType'),
        GET_ALL_LOCATION_NUMBER: concat('/asset/locationNumber'),
        ADD_NEW_MODEL: concat('/asset/model'),
        ADD_NEW_CATEGORY: concat('/asset/category'),
        ADD_NEW_SUBCATEGORY: concat('/asset/subcategory'),
        ADD_NEW_LOCATION_TYPE: concat('/asset/locationType'),
        ADD_NEW_LOCATION_NUMBER: concat('/asset/locationNumber')
    },
    SUPPLIER: {
        GET_ALL: concat('/supplier')
    }
};
