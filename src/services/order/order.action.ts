'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {EOrderStatus} from '@/lib/enums';
import {IOrder} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllOrdersAction = async (query?: any) => {
  const res = await FETCH.get<IOrder[]>(API_ROUTES.ORDER.GET_ALL, {
    cookies,
    params: query,
    next: {
      tags: [CACHE_KEY.ORDER.GET_ALL],
    },
  });

  return res;
};

export const fetchOrderByIdAction = async (id: string) => {
  const res = await FETCH.get<IOrder>(
    API_ROUTES.ORDER.GET_ORDER.replace(':id', id),
    {
      next: {
        tags: [CACHE_KEY.ORDER.GET_BY_ID.concat(id)],
      },
      cookies,
    },
  );

  return res;
};

export const updateOrderStatusAction = async (
  id: string,
  status: EOrderStatus,
) => {
  const res = await FETCH.put<{status: EOrderStatus}, IOrder>(
    API_ROUTES.ORDER.UPDATE_STATUS.replace(':id', id),
    {status},
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.ORDER.GET_BY_ID.concat(id));
    revalidateTag(CACHE_KEY.ORDER.GET_ALL);
  }

  return res;
};
