"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { deleteReviewFormSchema } from "@/_lib/form-schema/review-form"
import { IReview } from "@/_lib/interfaces"
import { ReviewAnalytics } from "@/_lib/types"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllReviews = async (query?: any) => {
  const res = await FETCH.get<IReview[]>(API_ROUTES.REVIEW.GET_REVIEWS, {
    next: {
      tags: [CACHE_KEY.REVIEW.GET_ALL]
    },
    cookies,
    params: query
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchReviewById = async (id: string) => {
  const res = await FETCH.get<IReview>(API_ROUTES.REVIEW.GET_REVIEW.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.REVIEW.GET_BY_ID, id].join(", ")]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)

  return res
}

export const deleteReview = safeAction
  .metadata({
    actionName: "Delete Review"
  })
  .schema(deleteReviewFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete(API_ROUTES.REVIEW.DELETE_REVIEW.replace(":id", parsedInput), {
      cookies
    })

    if (res.success) {
      revalidateTag(CACHE_KEY.REVIEW.GET_ALL)
    }

    return res
  })

export const getReviewAnalytics = async () => {
  const res = await FETCH.get<ReviewAnalytics>(API_ROUTES.REVIEW.GET_ANALYTICS, {
    cookies
  })

  return res
}
