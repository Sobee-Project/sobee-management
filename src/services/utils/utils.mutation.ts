import {useMutation} from '@tanstack/react-query';
import {reloadDataByTag} from './utils.action';

export const useReloadDataByTagMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await reloadDataByTag(id),
  });
};
