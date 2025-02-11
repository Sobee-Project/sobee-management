'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {IReview} from '@/lib/interfaces';
import {ReviewAnalytics} from '@/lib/types';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllReviewsACtion = async (query?: any) => {
  const res = await FETCH.get<IReview[]>(API_ROUTES.REVIEW.GET_REVIEWS, {
    cookies,
    params: query,
    next: {
      tags: [CACHE_KEY.REVIEW.GET_ALL],
    },
  });

  return res;
};

export const fetchReviewByIdAction = async (id: string) => {
  const res = await FETCH.get<IReview>(
    API_ROUTES.REVIEW.GET_REVIEW.replace(':id', id),
    {
      cookies,
      next: {
        tags: [CACHE_KEY.REVIEW.GET_BY_ID.concat(id)],
      },
    },
  );

  return res;
};

export const deleteReviewAction = async (id: string) => {
  const res = await FETCH.delete(
    API_ROUTES.REVIEW.DELETE_REVIEW.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.REVIEW.GET_ALL);
  }

  return res;
};

export const getReviewAnalyticsAction = async () => {
  const res = await FETCH.get<ReviewAnalytics>(
    API_ROUTES.REVIEW.GET_ANALYTICS,
    {
      cookies,
    },
  );

  return res;
};
