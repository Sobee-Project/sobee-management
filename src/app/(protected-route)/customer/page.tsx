import {CACHE_KEY} from '@/constants';
import {fetchAllCustomerAction} from '@/services/customer';
import {PageHeader} from '../_components';
import {CustomerListData} from './_components';

const page = async () => {
  const res = await fetchAllCustomerAction();

  const data = res.data!;
  return (
    <div>
      <PageHeader title="All Customers" keyCache={CACHE_KEY.CUSTOMER.GET_ALL} />
      <CustomerListData data={data} />
    </div>
  );
};

export default page;
