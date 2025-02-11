import {CACHE_KEY} from '@/constants';
import {Spinner} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import {PageHeader} from '../_components';

const OrderListData = dynamic(() => import('./_components/OrderListData'), {
  ssr: false,
  loading: () => <Spinner />,
});

const page = async () => {
  return (
    <div>
      <PageHeader title="All Orders" keyCache={CACHE_KEY.ORDER.GET_ALL} />
      <OrderListData />
    </div>
  );
};

export default page;
