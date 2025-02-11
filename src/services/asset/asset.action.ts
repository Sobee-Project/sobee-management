'use server';

import {API_ROUTES} from '@/constants';
import {IAsset} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {cookies} from 'next/headers';

export const getAssetsByTypeAction = async (type: string, folder: string) => {
  const res = await FETCH.get<IAsset>(API_ROUTES.ASSET.GET_BY_TYPE, {
    params: {type, folder},
    cookies,
    cache: 'reload',
  });
  return res;
};
