import { EAssetType } from "@/_lib/enums"
import { IUser } from "./IUser"

export interface IChatMessage {
  _id?: string
  content: string
  sender?: string | IUser
  receiver?: string | IUser
  read: boolean
  contentType: EAssetType
  createdAt?: Date | string
  updatedAt?: Date | string
}
