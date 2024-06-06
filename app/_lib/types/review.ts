export type ReviewAnalytics = {
  averageRating: number
  totalRating: number
  byRating: { rating: number; count: number }[]
  lastWeekReview: Omit<ReviewAnalytics, "lastWeekReview">
}
