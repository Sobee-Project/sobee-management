export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        REFRESH_TOKEN: "/auth/refresh-token",
        LOGOUT: "/auth/logout",
        GET_ME: "/auth/me"
    },

    ROLE: {
        GET_ROLES: "/role",
        CREATE_ROLE: "/role",
        UPDATE_ROLE: "/role",
        DELETE_ROLE: "/role/:id"
    },

    PRODUCT: {
        GET_PRODUCTS: "/product"
    }
}
