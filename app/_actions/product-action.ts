"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createProductFormSchema, deleteProductFormSchema, updateProductFormSchema } from "@/_lib/form-schema"
import { IProduct } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchPublishedProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_PUBLISHED_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_PUBLISHED]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchDraftProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_DRAFT_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_DRAFT]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchFeaturedProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_FEATURED_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_FEATURED]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchBestSellerProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_BEST_SELLER_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_BEST_SELLER]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchDiscountProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_DISCOUNT_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_DISCOUNT]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchPopularProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_POPULAR_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_POPULAR]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchProductById = async (productId: string) => {
  const res = await FETCH.get<IProduct>(API_ROUTES.PRODUCT.GET_PRODUCT.replace(":id", productId), {
    next: {
      tags: [[CACHE_KEY.PRODUCT.GET_BY_ID, productId].join(", ")]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const createProduct = safeAction
  .metadata({
    actionName: "Create Product"
  })
  .schema(createProductFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post(API_ROUTES.PRODUCT.CREATE_PRODUCT, parsedInput, {
      cookies
    })

    if (res.success) {
      revalidateTag(CACHE_KEY.PRODUCT.GET_ALL)
    }

    return res
  })

export const updateProduct = safeAction
  .metadata({
    actionName: "Update Product"
  })
  .schema(updateProductFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put(API_ROUTES.PRODUCT.UPDATE_PRODUCT.replace(":id", parsedInput._id), parsedInput, {
      cookies
    })

    if (res.success) {
      if (parsedInput.isDraft) {
        revalidateTag(CACHE_KEY.PRODUCT.GET_DRAFT)
      } else {
        revalidateTag(CACHE_KEY.PRODUCT.GET_PUBLISHED)
      }
    }

    return res
  })

export const deleteProduct = safeAction
  .metadata({
    actionName: "Delete Product"
  })
  .schema(deleteProductFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete(API_ROUTES.PRODUCT.DELETE_PRODUCT.replace(":id", parsedInput), {
      cookies
    })

    if (res.success) {
      revalidateTag(CACHE_KEY.PRODUCT.GET_ALL)
    }

    return res
  })
