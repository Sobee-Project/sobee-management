'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {
  CreateShippingFormSchema,
  UpdateShippingFormSchema,
} from '@/lib/form-schema';
import {IShipping} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllShippingsAction = async () => {
  const res = await FETCH.get<IShipping[]>(API_ROUTES.SHIPPING.GET_SHIPPINGS, {
    cookies,
    next: {
      tags: [CACHE_KEY.SHIPPING.GET_ALL],
    },
  });

  return res;
};

export const fetchShippingByIdAction = async (id: string) => {
  const res = await FETCH.get<IShipping>(
    API_ROUTES.SHIPPING.GET_SHIPPING.replace(':id', id),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.SHIPPING.GET_BY_ID.concat(id)],
      },
    },
  );

  return res;
};

export const createShippingAction = async (
  parsedInput: CreateShippingFormSchema,
) => {
  const res = await FETCH.post<IShipping>(
    API_ROUTES.SHIPPING.CREATE_SHIPPING,
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.SHIPPING.GET_ALL);
  }

  return res;
};

export const updateShippingAction = async (
  id: string,
  parsedInput: UpdateShippingFormSchema,
) => {
  const res = await FETCH.put<IShipping>(
    API_ROUTES.SHIPPING.UPDATE_SHIPPING.replace(':id', id),
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.SHIPPING.GET_ALL);
  }

  return res;
};

export const deleteShippingAction = async (id: string) => {
  const res = await FETCH.delete<IShipping>(
    API_ROUTES.SHIPPING.DELETE_SHIPPING.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.SHIPPING.GET_ALL);
  }

  return res;
};
