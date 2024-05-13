export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        REFRESH_TOKEN: "/auth/refresh-token",
        LOGOUT: "/auth/logout",
        GET_ME: "/auth/me",
        CHANGE_PASSWORD: "/auth/change-password"
    },

    ROLE: {
        GET_ROLES: "/role",
        GET_ROLE: "/role/:id",
        CREATE_ROLE: "/role",
        UPDATE_ROLE: "/role",
        DELETE_ROLE: "/role/:id"
    },

    USER: {
        CHANGE_AVATAR: "/user/avatar",
        UPDATE: "/user"
    },

    PRODUCT: {
        GET_PRODUCTS: "/product"
    },

    ASSET: {
        UPLOAD: "/asset",
        GET_ASSETS: "/asset",
        DELETE_ASSET: "/asset/:id",
        GET_ASSET_RESOUREC: "/asset/resource" //?resourcePath={asset.urlPath}
    },

    TAX: {
        GET_TAXES: "/tax",
        CREATE_TAX: "/tax",
        GET_TAX: "/tax/:id",
        UPDATE_TAX: "/tax/:id",
        DELETE_TAX: "/tax/:id"
    },

    STAFF: {
        GET_STAFF: "/staff",
        GET_ONE_STAFF: "/staff/:id",
        CREATE_STAFF: "/staff",
        UPDATE_STAFF: "/staff/:id",
        DELETE_STAFF: "/staff/:id"
    },

    DAY_OFF: {
        GET_DAY_OFFS: "/day-off",
        CREATE_DAY_OFF: "/day-off",
        GET_DAY_OFF: "/day-off/:id",
        UPDATE_DAY_OFF: "/day-off/:id",
        DELETE_DAY_OFF: "/day-off/:id"
    },

    REVIEW: {
        GET_REVIEWS: "/review",
        CREATE_REVIEW: "/review",
        GET_REVIEW: "/review/:id",
        UPDATE_REVIEW: "/review/:id",
        DELETE_REVIEW: "/review/:id"
    },
    CATEGORY: {
        GET_CATEGORIES: "/category",
        GET_CATEGORY: "/category/:id",
        CREATE_CATEGORY: "/category",
        UPDATE_CATEGORY: "/category/:id",
        DELETE_CATEGORY: "/category/:id"
    },

    ATTRIBUTE: {
        GET_ATTRIBUTES: "/attribute",
        GET_ATTRIBUTE: "/attribute/:id",
        CREATE_ATTRIBUTE: "/attribute",
        UPDATE_ATTRIBUTE: "/attribute/:id",
        DELETE_ATTRIBUTE: "/attribute/:id"
    },

    SHIPPING: {
        GET_SHIPPINGS: "/shipping",
        GET_SHIPPING: "/shipping/:id",
        CREATE_SHIPPING: "/shipping",
        UPDATE_SHIPPING: "/shipping/:id",
        DELETE_SHIPPING: "/shipping/:id"
    },

    PAYMENT_METHOD: {
        GET_PAYMENT_METHODS: "/payment-method",
        GET_PAYMENT_METHOD: "/payment-method/:id",
        CREATE_PAYMENT_METHOD: "/payment-method",
        UPDATE_PAYMENT_METHOD: "/payment-method/:id",
        DELETE_PAYMENT_METHOD: "/payment-method/:id"
    },
    BRAND: {
        GET_BRANDS: "/brand",
        CREATE_BRAND: "/brand",
        GET_BRAND: "/brand/:id",
        UPDATE_BRAND: "/brand/:id",
        DELETE_BRAND: "/brand/:id"
    }
}
