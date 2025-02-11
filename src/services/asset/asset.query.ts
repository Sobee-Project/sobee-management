import {useQuery} from '@tanstack/react-query';
import {getAssetsByTypeAction} from './asset.action';

export const useGetAssetByTypeQuery = (type: string, folder: string) => {
  return useQuery({
    queryKey: ['asset', type, folder],
    queryFn: async () => await getAssetsByTypeAction(type, folder),
  });
};
