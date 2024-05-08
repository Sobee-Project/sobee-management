import { EProductStatus } from "@/_lib/enums"
import { ICategory } from "./ICategory"
import { IProductAssetAttribute } from "./IProductAssetAttribute"

export interface IProduct {
    _id?: string
    category?: ICategory | string
    name: string
    slug: string
    description: string
    price: number
    discount: number
    quantity: number
    sold: number
    status: EProductStatus
    favoritesCount: number
    productAssetAttributes?: string[] | IProductAssetAttribute[]
    isFeatured?: boolean
    deletedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
}
