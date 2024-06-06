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
    GET_PUBLISHED_PRODUCTS: "/product/published",
    GET_DRAFT_PRODUCTS: "/product/draft",
    GET_POPULAR_PRODUCTS: "/product/popular",
    GET_BEST_SELLER_PRODUCTS: "/product/best-seller",
    GET_RELATED_PRODUCTS: "/product/related/:categoryId",
    GET_DISCOUNT_PRODUCTS: "/product/discount",
    GET_FEATURED_PRODUCTS: "/product/featured",
    GET_PRODUCT: "/product/:id",
    CREATE_PRODUCT: "/product",
    UPDATE_PRODUCT: "/product/:id",
    DELETE_PRODUCT: "/product/:id"
  },

  ASSET: {
    GET_BY_TYPE: "/asset/type"
  },

  COUPON: {
    GET_COUPONS: "/coupon",
    GET_COUPON: "/coupon/:id",
    CREATE_COUPON: "/coupon",
    UPDATE_COUPON: "/coupon/:id",
    DELETE_COUPON: "/coupon/:id",
    ACTIVE_COUPON: "/coupon/:id/active",
    DEACTIVE_COUPON: "/coupon/:id/deactive"
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

  CUSTOMER: {
    GET_CUSTOMERS: "/customer",
    GET_CUSTOMER: "/customer/:id",
    CREATE_CUSTOMER: "/customer",
    UPDATE_CUSTOMER: "/customer/:id",
    DELETE_CUSTOMER: "/customer/:id",
    BAN: "/customer/ban/:id",
    UNBAN: "/customer/unban/:id"
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
  },

  UPLOAD: {
    UPLOAD_FILE: "/upload",
    UPLOAD_URL: "/upload/url"
  },

  FAQ: {
    GET_FAQS: "/faq",
    CREATE_FAQ: "/faq",
    GET_FAQ: "/faq/:id",
    UPDATE_FAQ: "/faq/:id",
    DELETE_FAQ: "/faq/:id"
  },
  TERM: {
    GET_TERMS: "/term",
    GET_TERM: "/term/:id",
    CREATE_TERM: "/term",
    UPDATE_TERM: "/term/:id",
    DELETE_TERM: "/term/:id"
  },

  QUESTION: {
    GET_QUESTIONS: "/question",
    REPLY_QUESTION: "/question/:id/reply",
    DELETE_QUESTION: "/question/:id"
  },
  ORDER: {
    GET_ALL: "/order",
    GET_ORDER: "/order/:id",
    UPDATE: "/order/:id",
    UPDATE_STATUS: "/order/:id/status"
  }
}
