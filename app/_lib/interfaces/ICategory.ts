export interface ICategory {
  _id?: string
  name: string
  slug: string
  description?: string
  image?: string
  parent?: string | null | ICategory
  children?: ICategory[] | string[]
  productCount?: number
}
