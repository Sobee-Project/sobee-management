import {CACHE_KEY} from '@/constants';
import {fetchAllShippingsAction} from '@/services/shipping';
import {PageHeader} from '../_components';
import {ShippingListData} from './_components';

const page = async () => {
  const res = await fetchAllShippingsAction();
  return (
    <div>
      <PageHeader title="Shippings" keyCache={CACHE_KEY.SHIPPING.GET_ALL} />
      <ShippingListData data={res.data!} />
    </div>
  );
};

export default page;
