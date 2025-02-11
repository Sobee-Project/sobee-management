import {fetchSummaryAnalyticsAction} from '@/services/analytics/analytics.action';
import {
  fetchBestSellerProductsAction,
  fetchPopularProductsAction,
} from '@/services/product/product.action';
import {Spinner} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import {
  BestSellerProducts,
  PopularProducts,
  SummaryWidget,
} from './_components';
import OrderAnalytics from './_components/OrderAnalytics';

const SectionOrderStatus = dynamic(
  () => import('./_components/SectionOrderStatus'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const page = async () => {
  const summaryData = await fetchSummaryAnalyticsAction();
  const popularProductsData = await fetchPopularProductsAction();
  const bestSellerProductsData = await fetchBestSellerProductsAction();

  return (
    <div className="mb-10 grid gap-7 md:gap-8 lg:grid-cols-2 2xl:grid-cols-12">
      <SummaryWidget data={summaryData.data!} />
      <SectionOrderStatus />
      <div className="lg:col-span-full 2xl:col-span-8">
        <OrderAnalytics />
      </div>

      <BestSellerProducts products={bestSellerProductsData.data!} />
      <PopularProducts products={popularProductsData.data!} />
    </div>
  );
};

export default page;
