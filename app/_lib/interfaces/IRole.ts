import { EResourcePermissions, ERolePermissions } from "../enums"

export interface IGrantListItem {
    _id?: string
    role?: string
    resource: EResourcePermissions
    actions: ERolePermissions[]
    attributes?: string
}
export interface IRole {
    _id?: string
    role_name: string
    role_slug: string
    grant_lists: IGrantListItem[]
    __v?: number
}
