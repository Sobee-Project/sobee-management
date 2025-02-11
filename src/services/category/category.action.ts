'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {
  CreateCategoryFormSchema,
  UpdateCategoryFormSchema,
} from '@/lib/form-schema';
import {ICategory} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllCategoriesAction = async (query?: any) => {
  const res = await FETCH.get<ICategory[]>(API_ROUTES.CATEGORY.GET_CATEGORIES, {
    cookies,
    params: query,
    next: {
      tags: [CACHE_KEY.CATEGORY.GET_ALL],
    },
  });

  return res;
};

export const fetchCategoryByIdAction = async (id: string) => {
  const res = await FETCH.get<ICategory>(
    API_ROUTES.CATEGORY.GET_CATEGORY.replace(':id', id),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.CATEGORY.GET_BY_ID.concat(id)],
      },
    },
  );

  return res;
};

export const createCategoryAction = async (
  payload: CreateCategoryFormSchema,
) => {
  const res = await FETCH.post<ICategory>(
    API_ROUTES.CATEGORY.CREATE_CATEGORY,
    payload,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CATEGORY.GET_ALL);
  }

  return res;
};

export const updateCategoryAction = async (
  id: string,
  payload: UpdateCategoryFormSchema,
) => {
  const res = await FETCH.put<ICategory>(
    API_ROUTES.CATEGORY.UPDATE_CATEGORY.replace(':id', id),
    payload,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CATEGORY.GET_ALL);
  }

  return res;
};

export const deleteCategoryAction = async (id: string) => {
  const res = await FETCH.delete<ICategory>(
    API_ROUTES.CATEGORY.DELETE_CATEGORY.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CATEGORY.GET_ALL);
  }

  return res;
};
