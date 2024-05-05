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
    }
}
