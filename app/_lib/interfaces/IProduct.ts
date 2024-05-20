import { EProductStatus, EProductType } from "../enums"
import { IBrand } from "./IBrand"
import { ICategory } from "./ICategory"
import { IVariant } from "./IVariant"

export interface IProduct {
    _id?: string
    category: ICategory | string
    name: string
    slug?: string
    description: string
    displayPrice: number
    minPrice?: number
    maxPrice?: number
    brand?: string | IBrand
    discount?: number
    type?: EProductType | string
    thumbnail: string
    quantity: number
    sold?: number
    status?: EProductStatus
    favoritesCount?: number
    variants?: string[] | IVariant[]
    ratingCount?: number
    ratingValue?: number
    isFeatured?: boolean
    isDraft?: boolean
    isDiscount?: boolean
    deletedAt?: string
    createdAt?: string
    updatedAt?: string
}
