'use client';

import {useReloadDataByTagMutation} from '@/services/utils/utils.mutation';
import {format} from 'date-fns';
import {RotateCw} from 'lucide-react';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

type Props = {
  keyCache?: string;
};

const Timer = ({keyCache}: Props) => {
  const reloadDataByTagMutation = useReloadDataByTagMutation();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  const onRefresh = () => {
    if (!keyCache) return;
    toast.loading('Refreshing data...', {
      duration: Infinity,
    });
    reloadDataByTagMutation.mutate(keyCache, {
      onSuccess: () => {
        toast.dismiss();
        toast.success('Data refreshed successfully');
      },
    });
  };

  return (
    <>
      <button
        className="group hidden w-fit items-center gap-2 text-sm font-semibold xl:flex"
        onClick={onRefresh}>
        Data Refresh
        <RotateCw size={16} className="group-hover:animate-spin" />
      </button>
      <div
        className="flex h-11 items-center justify-center rounded-md border border-foreground-200 px-9 text-sm font-bold lg:w-[310px]"
        suppressHydrationWarning>
        {format(currentTime, 'MMMM d, yyyy HH')}
        <span className="animate-pulse">:</span>
        {format(currentTime, 'mm:ss a')}
      </div>
    </>
  );
};

export default Timer;
