import {CACHE_KEY} from '@/constants';
import {fetchAllFaqsAction} from '@/services/faq';
import {PageHeader} from '../_components';
import {FaqListData} from './_components';

const page = async () => {
  const res = await fetchAllFaqsAction();

  return (
    <div>
      <PageHeader title="FAQs" keyCache={CACHE_KEY.FAQ.GET_ALL} />
      <FaqListData data={res.data!} />
    </div>
  );
};

export default page;
