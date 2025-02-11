'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {CreateTermFormSchema, UpdateTermFormSchema} from '@/lib/form-schema';
import {ITerm} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllTermsAction = async () => {
  const res = await FETCH.get<ITerm[]>(API_ROUTES.TERM.GET_TERMS, {
    cookies,
    next: {
      tags: [CACHE_KEY.TERM.GET_ALL],
    },
  });

  return res;
};

export const fetchTermByIdAction = async (id: string) => {
  const res = await FETCH.get<ITerm>(
    API_ROUTES.TERM.GET_TERM.replace(':id', id),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.TERM.GET_BY_ID.concat(id)],
      },
    },
  );

  return res;
};

export const createTermAction = async (parsedInput: CreateTermFormSchema) => {
  const res = await FETCH.post<ITerm>(
    API_ROUTES.TERM.CREATE_TERM,
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.TERM.GET_ALL);
  }

  return res;
};

export const updateTermAction = async (
  id: string,
  parsedInput: UpdateTermFormSchema,
) => {
  const res = await FETCH.put<ITerm>(
    API_ROUTES.TERM.UPDATE_TERM.replace(':id', id),
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.TERM.GET_ALL);
  }

  return res;
};

export const deleteTermAction = async (id: string) => {
  const res = await FETCH.delete<ITerm>(
    API_ROUTES.TERM.DELETE_TERM.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.TERM.GET_ALL);
  }

  return res;
};
