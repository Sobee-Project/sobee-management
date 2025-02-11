'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {
  CreateProductFormSchema,
  UpdateProductFormSchema,
} from '@/lib/form-schema';
import {IProduct} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchPublishedProductsAction = async (query?: any) => {
  const res = await FETCH.get<IProduct[]>(
    API_ROUTES.PRODUCT.GET_PUBLISHED_PRODUCTS,
    {
      cookies,
      params: query,
      next: {
        tags: [CACHE_KEY.PRODUCT.GET_PUBLISHED],
      },
    },
  );

  return res;
};

export const fetchDraftProductsAction = async (query?: any) => {
  const res = await FETCH.get<IProduct[]>(
    API_ROUTES.PRODUCT.GET_DRAFT_PRODUCTS,
    {
      cookies,
      params: query,
      next: {
        tags: [CACHE_KEY.PRODUCT.GET_DRAFT],
      },
    },
  );

  return res;
};

export const fetchFeaturedProductsAction = async () => {
  const res = await FETCH.get<IProduct[]>(
    API_ROUTES.PRODUCT.GET_FEATURED_PRODUCTS,
    {
      cookies,
      next: {
        tags: [CACHE_KEY.PRODUCT.GET_FEATURED],
      },
    },
  );

  return res;
};

export const fetchBestSellerProductsAction = async () => {
  const res = await FETCH.get<IProduct[]>(
    API_ROUTES.PRODUCT.GET_BEST_SELLER_PRODUCTS,
    {
      cookies,
      next: {
        tags: [CACHE_KEY.PRODUCT.GET_BEST_SELLER],
      },
    },
  );

  return res;
};

export const fetchDiscountProductsAction = async () => {
  const res = await FETCH.get<IProduct[]>(
    API_ROUTES.PRODUCT.GET_DISCOUNT_PRODUCTS,
    {
      cookies,
      next: {
        tags: [CACHE_KEY.PRODUCT.GET_DISCOUNT],
      },
    },
  );

  return res;
};

export const fetchPopularProductsAction = async () => {
  const res = await FETCH.get<IProduct[]>(
    API_ROUTES.PRODUCT.GET_POPULAR_PRODUCTS,
    {
      cookies,
      next: {
        tags: [CACHE_KEY.PRODUCT.GET_POPULAR],
      },
    },
  );

  return res;
};

export const fetchProductByIdAction = async (productId: string) => {
  const res = await FETCH.get<IProduct>(
    API_ROUTES.PRODUCT.GET_PRODUCT.replace(':id', productId),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.PRODUCT.GET_BY_ID.concat(productId)],
      },
    },
  );

  return res;
};

export const createProductAction = async (
  parsedInput: CreateProductFormSchema,
) => {
  const res = await FETCH.post(API_ROUTES.PRODUCT.CREATE_PRODUCT, parsedInput, {
    cookies,
  });

  if (res.success) {
    revalidateTag(CACHE_KEY.PRODUCT.GET_PUBLISHED);
    revalidateTag(CACHE_KEY.PRODUCT.GET_DRAFT);
  }

  return res;
};

export const updateProductAction = async (
  id: string,
  parsedInput: UpdateProductFormSchema,
) => {
  const res = await FETCH.put(
    API_ROUTES.PRODUCT.UPDATE_PRODUCT.replace(':id', id),
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.PRODUCT.GET_PUBLISHED);
    revalidateTag(CACHE_KEY.PRODUCT.GET_DRAFT);
  }

  return res;
};

export const deleteProductAction = async (id: string) => {
  const res = await FETCH.delete(
    API_ROUTES.PRODUCT.DELETE_PRODUCT.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.PRODUCT.GET_PUBLISHED);
    revalidateTag(CACHE_KEY.PRODUCT.GET_DRAFT);
  }

  return res;
};
