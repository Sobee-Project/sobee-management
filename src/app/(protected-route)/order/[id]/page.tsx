import {CACHE_KEY} from '@/constants';
import {ParamsProps} from '@/lib/params';
import {fetchOrderByIdAction} from '@/services/order';
import {Divider, Spinner} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import OrderItemList from './_components/OrderItemList';
import StatusTracking from './_components/StatusTracking';

const PageHeader = dynamic(
  () => import('../../_components/PageHeader/PageHeader'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const page = async ({params}: ParamsProps) => {
  const orderRes = await fetchOrderByIdAction(params.id);
  const order = orderRes.data!;
  return (
    <div>
      <PageHeader
        title={order.orderGeneratedId}
        keyCache={[CACHE_KEY.ORDER.GET_BY_ID, params.id].join(',')}
      />
      <StatusTracking status={order.status} />
      <div className="mt-20">
        <Divider className="mb-10" />
        <OrderItemList order={order} />
      </div>
    </div>
  );
};

export default page;
