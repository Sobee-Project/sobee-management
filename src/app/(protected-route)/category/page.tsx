import {CACHE_KEY} from '@/constants';
import {Spinner} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import {PageHeader} from '../_components';

const CategoryListData = dynamic(
  () => import('./_components/CategoryListData'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const page = async () => {
  return (
    <div>
      <PageHeader
        title="All Categories"
        keyCache={CACHE_KEY.CATEGORY.GET_ALL}
      />
      <CategoryListData />
    </div>
  );
};

export default page;
