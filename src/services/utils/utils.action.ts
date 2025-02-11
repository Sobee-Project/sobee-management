'use server';

import {revalidateTag} from 'next/cache';

export const reloadDataByTag = async (tag: string) => {
  revalidateTag(tag);
};
