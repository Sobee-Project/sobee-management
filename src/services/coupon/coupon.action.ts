'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {
  CreateCouponFormSchema,
  UpdateCouponFormSchema,
} from '@/lib/form-schema';
import {ICoupon} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllCouponsAction = async () => {
  const res = await FETCH.get<ICoupon[]>(API_ROUTES.COUPON.GET_COUPONS, {
    cookies,
    next: {
      tags: [CACHE_KEY.COUPON.GET_ALL],
    },
  });
  return res;
};

export const fetchCouponByIdAction = async (id: string) => {
  const res = await FETCH.get<ICoupon>(
    API_ROUTES.COUPON.GET_COUPON.replace(':id', id),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.COUPON.GET_BY_ID.concat(id)],
      },
    },
  );

  return res;
};

export const createCouponAction = async (payload: CreateCouponFormSchema) => {
  const res = await FETCH.post<CreateCouponFormSchema, ICoupon>(
    API_ROUTES.COUPON.CREATE_COUPON,
    payload,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.COUPON.GET_ALL);
  }

  return res;
};

export const updateCouponAction = async (
  id: string,
  payload: UpdateCouponFormSchema,
) => {
  const res = await FETCH.put<UpdateCouponFormSchema, ICoupon>(
    API_ROUTES.COUPON.UPDATE_COUPON.replace(':id', id),
    payload,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.COUPON.GET_ALL);
  }

  return res;
};

export const deleteCouponAction = async (id: string) => {
  const res = await FETCH.delete<ICoupon>(
    API_ROUTES.COUPON.DELETE_COUPON.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.COUPON.GET_ALL);
  }

  return res;
};

export const activeCouponAction = async (id: string) => {
  const res = await FETCH.put(
    API_ROUTES.COUPON.ACTIVE_COUPON.replace(':id', id),
    {},
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.COUPON.GET_ALL);
  }

  return res;
};

export const deactiveCouponAction = async (id: string) => {
  const res = await FETCH.put(
    API_ROUTES.COUPON.DEACTIVE_COUPON.replace(':id', id),
    {},
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.COUPON.GET_ALL);
  }

  return res;
};
