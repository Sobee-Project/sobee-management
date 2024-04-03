export interface SucccessResponse<Data> {
    success: boolean
    statusCode: number
    message: string
    data: Data
}

export interface ErrorResponse<Data = any> {
    success: boolean
    statusCode: number
    message: string
    data?: Data
}
