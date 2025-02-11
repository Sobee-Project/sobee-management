'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {
  CreateCustomerFormSchema,
  UpdateCustomerFormSchema,
} from '@/lib/form-schema';
import {ICustomer, IUser} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllCustomerAction = async () => {
  const res = await FETCH.get<IUser<ICustomer>[]>(
    API_ROUTES.CUSTOMER.GET_CUSTOMERS,
    {
      cookies,
      next: {
        tags: [CACHE_KEY.CUSTOMER.GET_ALL],
      },
    },
  );

  return res;
};

export const fetchCustomerById = async (id: string) => {
  const res = await FETCH.get<IUser<ICustomer>>(
    API_ROUTES.CUSTOMER.GET_CUSTOMER.replace(':id', id),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.CUSTOMER.GET_BY_ID.concat(id)],
      },
    },
  );

  return res;
};

export const createCustomerAction = async (
  parsedInput: CreateCustomerFormSchema,
) => {
  const res = await FETCH.post<IUser>(
    API_ROUTES.CUSTOMER.CREATE_CUSTOMER,
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL);
  }

  return res;
};

export const updateCustomerAction = async (
  id: string,
  parsedInput: UpdateCustomerFormSchema,
) => {
  const res = await FETCH.put<IUser>(
    API_ROUTES.CUSTOMER.UPDATE_CUSTOMER.replace(':id', id),
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL);
  }

  return res;
};

export const banCustomerAction = async (id: string) => {
  const res = await FETCH.put(
    API_ROUTES.CUSTOMER.BAN.replace(':id', id),
    {},
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL);
  }

  return res;
};

export const unbanCustomerAction = async (id: string) => {
  const res = await FETCH.put(
    API_ROUTES.CUSTOMER.UNBAN.replace(':id', id),
    {},
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL);
  }

  return res;
};

export const deleteCustomerAction = async (id: string) => {
  const res = await FETCH.delete(
    API_ROUTES.CUSTOMER.DELETE_CUSTOMER.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL);
  }

  return res;
};
