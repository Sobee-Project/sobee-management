export interface ISummaryAnalytics {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
}
export interface ITotalOrderByStatus {
  pending: number
  pickingUp: number
  delivering: number
  canceled: number
  delivered: number
  completed: number
  total: number
}

export interface IOrderAnalyticData {
  key: string
  week?: number
  month?: number
  year?: number
  totalOrders: number
  totalRevenue: number
}
