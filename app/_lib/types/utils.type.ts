import { IPaginate } from "../interfaces"

export interface BaseResponse<Data> extends Partial<IPaginate> {
  success: boolean
  statusCode: number
  message: string
}

export interface SucccessResponse<Data> extends BaseResponse<Data> {
  data: Data
}

export interface ErrorResponse<Data = any> extends BaseResponse<Data> {
  data?: Data
}
