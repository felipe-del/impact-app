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
        GET_ALL: concat('/user'),
        GET_INACTIVE: concat('/user/inactive')
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
        GET_ALL: concat('/asset/all'),
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
    COMMON_SPACE: {
        ALL_SPACES: concat('/common-space/all'),
        GET_SPACE_STATUS: concat('/common-space/status'),
        GET_SPACE_EQUIPMENT: concat('/common-space/equipment'),
        EQUIPMENT_BY_SPACE: concat('/common-space/equipment-by-space'),
        GET_BUILDINGS: concat('/common-space/building'),
        GET_BUILDING_LOCATIONS: concat('/common-space/building-locations'),
        BUILDING_LOCATIONS_BY_BUILDING: concat('/common-space/locations-by-building'),
        SPACE_REQUESTS: concat('/common-space/requests'),
        SPACE_RESERVATIONS: concat('/common-space/reservations'),
        // CREATE OPERATIONS
        CREATE_SPACE: concat('/common-space/create'),
        CREATE_BUILDING: concat('/common-space/create/building'),
        CREATE_BUILDING_LOCATION: concat('/common-space/create/building-location'),
        CREATE_EQUIPMENT: concat('/common-space/create/equipment'),
        // FIND AND EDIT
        SPACE_BY_ID: (spaceId) => concat(`/common-space/find/space/${spaceId}`),
        EDIT_SPACE: (spaceId) => concat(`/common-space/edit/space/${spaceId}`),
        // REQUEST AND RESERVATION
        REQUEST_AND_RESERVATION: concat('/common-space/request/space-request&reservation')
    },
    SUPPLIER: {
        GET_ALL: concat('/supplier')
    }
};
