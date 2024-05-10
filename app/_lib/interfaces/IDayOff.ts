import { EDayOffStatus } from "../enums"
import { IStaff } from "./IStaff"
import { IUser } from "./IUser"

export interface IDayOff {
    _id?: string
    staff?: string | IUser<IStaff>
    startDate: string
    endDate: string
    reason: string
    status?: EDayOffStatus | string
    createdAt?: string
}
