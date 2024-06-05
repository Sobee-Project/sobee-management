import { ENV_CONFIG } from "./env-config"

export const APP_ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PRODUCTS: {
    INDEX: "/product",
    NEW: "/product/new",
    ID: "/product/:id",
    EDIT: "/product/:id/edit",
    DRAFT: "/product/draft",
    LOW_STOCK: "/product/low-stock"
  },
  INVENTORY: {
    INDEX: "/inventory",
    IMPORT: "/inventory/import",
    HISTORY: "/inventory/history"
  },
  CATEGORIES: {
    INDEX: "/category",
    NEW: "/category/new",
    ID: "/category/:id",
    EDIT: "/category/:id/edit"
  },
  BRANDS: {
    INDEX: "/brand",
    NEW: "/brand/new",
    ID: "/brand/:id",
    EDIT: "/brand/:id/edit"
  },
  TAXES: {
    INDEX: "/tax",
    NEW: "/tax/new",
    ID: "/tax/:id",
    EDIT: "/tax/:id/edit"
  },
  SHIPPINGS: {
    INDEX: "/shipping",
    NEW: "/shipping/new",
    ID: "/shipping/:id",
    EDIT: "/shipping/:id/edit"
  },
  PAYMENT_METHODS: {
    INDEX: "/payment-method",
    NEW: "/payment-method/new",
    ID: "/payment-method/:id",
    EDIT: "/payment-method/:id/edit"
  },
  ORDERS: {
    INDEX: "/order",
    ID: "/order/:id"
  },
  TRANSACTIONS: "/transaction",
  CONTACT: {
    INDEX: "/contact",
    ID: "/contact/:id"
  },
  REFUNDS: {
    INDEX: "/refund",
    REQUESTED: "/refund/requested",
    REQUESTED_ID: "/refund/requested/:id",
    POLICY: "/refund/policy",
    NEW_POLICY: "/refund/policy/new",
    POLICY_ID: "/refund/policy/:id",
    EDIT_POLICY: "/refund/policy/:id/edit",
    REASONS: "/refund/reason",
    NEW_REASON: "/refund/reason/new",
    REASON_ID: "/refund/reason/:id",
    EDIT_REASON: "/refund/reason/:id/edit"
  },
  ROLES: {
    INDEX: "/role",
    NEW: "/role/new",
    ID: "/role/:id",
    EDIT: "/role/:id/edit"
  },
  ADMIN: "/admin",
  STAFF: {
    INDEX: "/staff",
    NEW: "/staff/new",
    ID: "/staff/:id",
    EDIT: "/staff/:id/edit",
    DAY_OFF_REQUESTS: "/staff/day-off-request",
    DAY_OFF_REQUESTS_ID: "/staff/day-off-request/:id"
  },
  CUSTOMERS: {
    INDEX: "/customer",
    NEW: "/customer/new",
    ID: "/customer/:id",
    EDIT: "/customer/:id/edit"
  },
  VENDORS: {
    INDEX: "/vendor",
    NEW: "/vendor/new",
    ID: "/vendor/:id",
    EDIT: "/vendor/:id/edit"
  },
  REVIEWS: {
    INDEX: "/review",
    ID: "/review/:id"
  },
  QUESTIONS: {
    INDEX: "/question",
    ID: "/question/:id"
  },
  COUPONS: {
    INDEX: "/coupon",
    NEW: "/coupon/new",
    ID: "/coupon/:id",
    EDIT: "/coupon/:id/edit"
  },
  FLASH_SALES: {
    INDEX: "/flash-sale",
    NEW: "/flash-sale/new",
    ID: "/flash-sale/:id",
    EDIT: "/flash-sale/:id/edit"
  },
  PROMO_POPUP: "/promo-popup",
  NOTIFICATIONS: {
    INDEX: "/notification",
    NEW: "/notification/new",
    ID: "/notification/:id"
  },
  FAQS: {
    INDEX: "/faq",
    NEW: "/faq/new",
    ID: "/faq/:id",
    EDIT: "/faq/:id/edit"
  },
  TERMS_AND_CONDITIONS: {
    INDEX: "/terms-and-conditions",
    NEW: "/terms-and-conditions/new",
    ID: "/terms-and-conditions/:id",
    EDIT: "/terms-and-conditions/:id/edit"
  },
  SETTINGS: {
    INDEX: "/setting",
    GENERAL: "/setting/general",
    APPEARANCE: "/setting/appearance",
    PAYMENT: "/setting/payment",
    MAINTAINANCE: "/setting/maintainance"
  },
  PROFILE: "/profile"
}

export const CUSTOMER_ROUTES = {
  PRODUCTS: {
    ID: ENV_CONFIG.NEXT_PUBLIC_CUSTOMER_URL + "/product/:id"
  }
}
