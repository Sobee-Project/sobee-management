'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {CreateFaqFormSchema, UpdateFaqFormSchema} from '@/lib/form-schema';
import {IFaq} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllFaqsAction = async () => {
  const res = await FETCH.get<IFaq[]>(API_ROUTES.FAQ.GET_FAQS, {
    cookies,
    next: {
      tags: [CACHE_KEY.FAQ.GET_ALL],
    },
  });

  return res;
};

export const fetchFaqByIdAction = async (id: string) => {
  const res = await FETCH.get<IFaq>(API_ROUTES.FAQ.GET_FAQ.replace(':id', id), {
    cookies,
    next: {
      tags: [CACHE_KEY.FAQ.GET_BY_ID.concat(id)],
    },
  });

  return res;
};

export const createFaqAction = async (parsedInput: CreateFaqFormSchema) => {
  const res = await FETCH.post<IFaq>(API_ROUTES.FAQ.CREATE_FAQ, parsedInput, {
    cookies,
  });

  if (res.success) {
    revalidateTag(CACHE_KEY.FAQ.GET_ALL);
  }

  return res;
};

export const updateFaqAction = async (
  id: string,
  parsedInput: UpdateFaqFormSchema,
) => {
  const res = await FETCH.put<IFaq>(
    API_ROUTES.FAQ.UPDATE_FAQ.replace(':id', id),
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.FAQ.GET_ALL);
  }

  return res;
};

export const deleteFaqAction = async (id: string) => {
  const res = await FETCH.delete<IFaq>(
    API_ROUTES.FAQ.DELETE_FAQ.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.FAQ.GET_ALL);
  }

  return res;
};
