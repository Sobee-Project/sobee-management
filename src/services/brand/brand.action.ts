'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {CreateBrandFormSchema, UpdateBrandFormSchema} from '@/lib/form-schema';
import {IBrand} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllBrandsAction = async (query?: any) => {
  const res = await FETCH.get<IBrand[]>(API_ROUTES.BRAND.GET_BRANDS, {
    cookies,
    params: query,
    next: {
      tags: [CACHE_KEY.BRAND.GET_ALL],
    },
  });

  return res;
};

export const fetchBrandByIdAction = async (id: string) => {
  const res = await FETCH.get<IBrand>(
    API_ROUTES.BRAND.GET_BRAND.replace(':id', id),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.BRAND.GET_BY_ID.concat(id)],
      },
    },
  );

  return res;
};

export const createBrandAction = async (payload: CreateBrandFormSchema) => {
  const res = await FETCH.post<IBrand>(API_ROUTES.BRAND.CREATE_BRAND, payload, {
    cookies,
  });

  if (res.success) {
    revalidateTag(CACHE_KEY.BRAND.GET_ALL);
  }

  return res;
};

export const updateBrandAction = async (
  id: string,
  payload: UpdateBrandFormSchema,
) => {
  const res = await FETCH.put<IBrand>(
    API_ROUTES.BRAND.UPDATE_BRAND.replace(':id', id),
    payload,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.BRAND.GET_ALL);
  }

  return res;
};

export const deleteBrandAction = async (id: string) => {
  const res = await FETCH.delete<IBrand>(
    API_ROUTES.BRAND.DELETE_BRAND.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.BRAND.GET_ALL);
  }

  return res;
};
