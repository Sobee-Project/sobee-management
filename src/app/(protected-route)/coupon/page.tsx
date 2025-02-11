import {CACHE_KEY} from '@/constants';
import {fetchAllCouponsAction} from '@/services/coupon';
import {PageHeader} from '../_components';
import {CouponListData} from './_components';

const page = async () => {
  const res = await fetchAllCouponsAction();

  return (
    <div>
      <PageHeader title="All Coupons" keyCache={CACHE_KEY.COUPON.GET_ALL} />
      <CouponListData data={res.data!} />
    </div>
  );
};

export default page;
