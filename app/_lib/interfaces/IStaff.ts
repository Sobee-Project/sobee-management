import { IRole } from "./IRole"

export interface IStaff {
    identityCard: string
    staffRole?: string | IRole
}
