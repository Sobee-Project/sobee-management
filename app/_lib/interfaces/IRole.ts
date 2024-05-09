import { EResourcePermissions, ERolePermissions } from "../enums"

export interface IGrantListItem {
    _id?: string
    role?: string
    resource: EResourcePermissions | string
    actions: ERolePermissions[] | string[]
    attributes?: string
}
export interface IRole {
    _id?: string
    role_name: string
    grant_lists: IGrantListItem[]
    __v?: number
}
