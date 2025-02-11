import {CACHE_KEY} from '@/constants';
import {fetchAllTaxesAction} from '@/services/tax';
import {PageHeader} from '../_components';
import {TaxListData} from './_components';

const page = async () => {
  const res = await fetchAllTaxesAction();
  return (
    <div>
      <PageHeader title="Taxes" keyCache={CACHE_KEY.TAX.GET_ALL} />
      <TaxListData data={res.data!} />
    </div>
  );
};

export default page;
