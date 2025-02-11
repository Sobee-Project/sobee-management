'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {CreateTaxFormSchema, UpdateTaxFormSchema} from '@/lib/form-schema';
import {ITax} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllTaxesAction = async () => {
  const res = await FETCH.get<ITax[]>(API_ROUTES.TAX.GET_TAXES, {
    cookies,
    next: {
      tags: [CACHE_KEY.TAX.GET_ALL],
    },
  });

  return res;
};

export const fetchTaxByIdAction = async (id: string) => {
  const res = await FETCH.get<ITax>(API_ROUTES.TAX.GET_TAX.replace(':id', id), {
    cookies,
    next: {
      tags: [CACHE_KEY.TAX.GET_BY_ID.concat(id)],
    },
  });

  return res;
};

export const createTaxAction = async (parsedInput: CreateTaxFormSchema) => {
  const res = await FETCH.post<ITax>(API_ROUTES.TAX.CREATE_TAX, parsedInput, {
    cookies,
  });

  if (res.success) {
    revalidateTag(CACHE_KEY.TAX.GET_ALL);
  }

  return res;
};

export const updateTaxAction = async (
  id: string,
  parsedInput: UpdateTaxFormSchema,
) => {
  const res = await FETCH.put<ITax>(
    API_ROUTES.TAX.UPDATE_TAX.replace(':id', id),
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.TAX.GET_ALL);
  }

  return res;
};

export const deleteTaxAction = async (id: string) => {
  const res = await FETCH.delete<ITax>(
    API_ROUTES.TAX.DELETE_TAX.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.TAX.GET_ALL);
  }

  return res;
};
