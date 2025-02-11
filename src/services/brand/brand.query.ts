import {CACHE_KEY} from '@/constants';
import {useQuery} from '@tanstack/react-query';
import {fetchAllBrandsAction} from './brand.action';

export const useGetAllBrandsQuery = (query?: any) => {
  return useQuery({
    queryKey: [CACHE_KEY.BRAND.GET_ALL, query],
    queryFn: async () => await fetchAllBrandsAction(query),
  });
};
