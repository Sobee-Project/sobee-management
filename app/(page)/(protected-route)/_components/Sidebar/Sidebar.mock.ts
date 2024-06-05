import { APP_ROUTES } from "@/_constants"
import {
  ArrowLeftRight,
  Bell,
  CircleHelp,
  Framer,
  HandCoins,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  MessageCircleQuestion,
  MessagesSquare,
  Network,
  Package,
  Percent,
  Scan,
  ScrollText,
  Settings,
  ShoppingCart,
  StarHalf,
  TicketPercent,
  Truck,
  UserRoundCog,
  Users2,
  Zap
} from "lucide-react"
import { TSidebarGroup } from "./Sidebar.type"

export const sidebarMock: TSidebarGroup[] = [
  {
    title: "Main",
    items: [
      {
        icon: LayoutDashboard,
        href: APP_ROUTES.DASHBOARD,
        title: "Dashboard"
      }
    ]
  },
  {
    title: "Product management",
    items: [
      {
        title: "Products",
        icon: Package,
        href: APP_ROUTES.PRODUCTS.INDEX,
        items: [
          {
            title: "Published products",
            href: APP_ROUTES.PRODUCTS.INDEX
          },
          {
            title: "Add new product",
            href: APP_ROUTES.PRODUCTS.NEW
          },
          {
            title: "Draft products",
            href: APP_ROUTES.PRODUCTS.DRAFT
          }
        ]
      },
      {
        title: "Categories",
        icon: Layers3,
        href: APP_ROUTES.CATEGORIES.INDEX,
        items: [
          {
            title: "All categories",
            href: APP_ROUTES.CATEGORIES.INDEX
          },
          {
            title: "Add new category",
            href: APP_ROUTES.CATEGORIES.NEW
          }
        ]
      },
      {
        title: "Brands",
        icon: Framer,
        href: APP_ROUTES.BRANDS.INDEX,
        items: [
          {
            title: "All brands",
            href: APP_ROUTES.BRANDS.INDEX
          },
          {
            title: "Add new brand",
            href: APP_ROUTES.BRANDS.NEW
          }
        ]
      }
    ]
  },
  {
    title: "E-commerce management",
    items: [
      {
        title: "Taxes",
        icon: Percent,
        href: APP_ROUTES.TAXES.INDEX,
        items: [
          {
            title: "All taxes",
            href: APP_ROUTES.TAXES.INDEX
          },
          {
            title: "Add new tax",
            href: APP_ROUTES.TAXES.NEW
          }
        ]
      },
      {
        title: "Shippings",
        icon: Truck,
        href: APP_ROUTES.SHIPPINGS.INDEX,
        items: [
          {
            title: "All shippings",
            href: APP_ROUTES.SHIPPINGS.INDEX
          },
          {
            title: "Add new shipping",
            href: APP_ROUTES.SHIPPINGS.NEW
          }
        ]
      }
    ]
  },
  {
    title: "Order management",
    items: [
      {
        title: "Orders",
        icon: ShoppingCart,
        href: APP_ROUTES.ORDERS.INDEX
      },
      {
        title: "Order Contact",
        icon: MessagesSquare,
        href: APP_ROUTES.CONTACT.INDEX
      }
    ]
  },
  {
    title: "User control",
    items: [
      {
        title: "Roles",
        icon: LockKeyhole,
        href: APP_ROUTES.ROLES.INDEX,
        items: [
          {
            title: "All roles",
            href: APP_ROUTES.ROLES.INDEX
          },
          {
            title: "Add new role",
            href: APP_ROUTES.ROLES.NEW
          }
        ]
      },
      {
        title: "Staff",
        icon: Network,
        href: APP_ROUTES.STAFF.INDEX,
        items: [
          {
            title: "All staff",
            href: APP_ROUTES.STAFF.INDEX
          },
          {
            title: "Add new staff",
            href: APP_ROUTES.STAFF.NEW
          },
          {
            title: "Day off requests",
            href: APP_ROUTES.STAFF.DAY_OFF_REQUESTS
          }
        ]
      },
      {
        title: "Customers",
        icon: Users2,
        href: APP_ROUTES.CUSTOMERS.INDEX,
        items: [
          {
            title: "All customers",
            href: APP_ROUTES.CUSTOMERS.INDEX
          },
          {
            title: "Add new customer",
            href: APP_ROUTES.CUSTOMERS.NEW
          }
        ]
      }
    ]
  },
  {
    title: "Feedback control",
    items: [
      {
        title: "Reviews",
        icon: StarHalf,
        href: APP_ROUTES.REVIEWS.INDEX
      },
      {
        title: "Questions",
        icon: CircleHelp,
        href: APP_ROUTES.QUESTIONS.INDEX
      }
    ]
  },
  {
    title: "Promotional management",
    items: [
      {
        title: "Coupons",
        icon: TicketPercent,
        href: APP_ROUTES.COUPONS.INDEX,
        items: [
          {
            title: "All coupons",
            href: APP_ROUTES.COUPONS.INDEX
          },
          {
            title: "Add new coupon",
            href: APP_ROUTES.COUPONS.NEW
          }
        ]
      }
    ]
  },
  {
    title: "Other",
    items: [
      {
        title: "Notifications",
        icon: Bell,
        href: APP_ROUTES.NOTIFICATIONS.INDEX,
        items: [
          {
            title: "All notifications",
            href: APP_ROUTES.NOTIFICATIONS.INDEX
          },
          {
            title: "Push new notification",
            href: APP_ROUTES.NOTIFICATIONS.NEW
          }
        ]
      },
      {
        title: "FAQ",
        icon: MessageCircleQuestion,
        items: [
          {
            title: "All FAQs",
            href: APP_ROUTES.FAQS.INDEX
          },
          {
            title: "Add new FAQ",
            href: APP_ROUTES.FAQS.NEW
          }
        ]
      },
      {
        title: "Terms & Conditions",
        icon: ScrollText,
        items: [
          {
            title: "All Terms",
            href: APP_ROUTES.TERMS_AND_CONDITIONS.INDEX
          },
          {
            title: "Add new Terms",
            href: APP_ROUTES.TERMS_AND_CONDITIONS.NEW
          }
        ]
      }
    ]
  }
]
