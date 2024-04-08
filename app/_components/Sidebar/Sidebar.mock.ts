import { APP_ROUTES } from "@/_constants"
import {
    Bell,
    Earth,
    Layers3,
    LayoutDashboard,
    Library,
    LockKeyhole,
    MessageSquare,
    MessagesSquare,
    Network,
    Package,
    Package2,
    Paperclip,
    Settings,
    ShoppingCart,
    StarHalf,
    TicketPercent,
    Users2
} from "lucide-react"
import { TSidebar } from "./Sidebar.type"

export const sidebarMock: TSidebar[] = [
    {
        icon: LayoutDashboard,
        href: APP_ROUTES.DASHBOARD,
        title: "Dashboard"
    },
    {
        title: "Products",
        icon: Package,
        href: APP_ROUTES.PRODUCTS.INDEX,
        items: [
            {
                title: "All products",
                href: APP_ROUTES.PRODUCTS.ALL,
                icon: Library
            },
            {
                title: "Brand",
                href: APP_ROUTES.PRODUCTS.BRAND,
                icon: Earth
            },
            {
                title: "Category",
                href: APP_ROUTES.PRODUCTS.CATEGORY,
                icon: Layers3
            }
        ]
    },

    {
        title: "Coupons",
        icon: TicketPercent,
        href: APP_ROUTES.COUPONS
    },
    {
        title: "Orders",
        icon: ShoppingCart,
        href: APP_ROUTES.ORDERS
    },
    {
        title: "Reviews",
        icon: StarHalf,
        href: APP_ROUTES.REVIEWS
    },
    {
        title: "Inventory",
        icon: Package2,
        href: APP_ROUTES.INVENTORY
    },
    {
        title: "Assets",
        icon: Paperclip,
        href: APP_ROUTES.ASSETS
    },
    {
        title: "Roles",
        icon: LockKeyhole,
        href: APP_ROUTES.ROLES,
        hasSeparator: true
    },
    {
        title: "Staff",
        icon: Network,
        href: APP_ROUTES.STAFF
    },
    {
        title: "Customers",
        icon: Users2,
        href: APP_ROUTES.CUSTOMERS
    },
    {
        title: "Chat",
        icon: MessagesSquare,
        href: APP_ROUTES.CHAT,
        hasSeparator: true
    },
    {
        title: "Notifications",
        icon: Bell,
        href: APP_ROUTES.NOTIFICATIONS
    },
    {
        title: "Settings",
        icon: Settings,
        href: APP_ROUTES.SETTINGS
    }
]
