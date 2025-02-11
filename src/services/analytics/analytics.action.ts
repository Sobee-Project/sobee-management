'use server';

import {API_ROUTES} from '@/constants';
import {
  IOrderAnalyticData,
  ISummaryAnalytics,
  ITotalOrderByStatus,
} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {cookies} from 'next/headers';

export const fetchSummaryAnalyticsAction = async () => {
  const res = await FETCH.get<ISummaryAnalytics>(
    API_ROUTES.ANALYTICS.GET_SUMMARY,
    {
      next: {
        revalidate: 360,
      },
      cookies,
    },
  );
  return res;
};

export const fetchTotalOrderByStatusAction = async (
  startDate: string,
  endDate: string,
) => {
  const res = await FETCH.get<ITotalOrderByStatus>(
    API_ROUTES.ANALYTICS.GET_TOTAL_ORDER_BY_STATUS,
    {
      params: {startDate, endDate},
      next: {
        revalidate: 360,
      },
      cookies,
    },
  );
  return res;
};

export const fetchOrderAnalyticsAction = async (
  startDate: string,
  endDate: string,
) => {
  const res = await FETCH.get<IOrderAnalyticData[]>(
    API_ROUTES.ANALYTICS.GET_ORDER_ANALYTICS,
    {
      params: {startDate, endDate},
      next: {
        revalidate: 360,
      },
      cookies,
    },
  );
  return res;
};
