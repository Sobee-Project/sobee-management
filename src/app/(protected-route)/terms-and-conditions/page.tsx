import {CACHE_KEY} from '@/constants';
import {fetchAllTermsAction} from '@/services/term';
import {PageHeader} from '../_components';
import {TermListData} from './_components';

const page = async () => {
  const res = await fetchAllTermsAction();

  return (
    <div>
      <PageHeader title="Terms" keyCache={CACHE_KEY.TERM.GET_ALL} />
      <TermListData data={res.data!} />
    </div>
  );
};

export default page;
