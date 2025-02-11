import {CACHE_KEY} from '@/constants';
import {Spinner} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import {PageHeader} from '../_components';

const QuestionListData = dynamic(
  () => import('./_components/QuestionListData'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const page = async () => {
  return (
    <div>
      <PageHeader title="Questions" keyCache={CACHE_KEY.QUESTION.GET_ALL} />
      <QuestionListData />
    </div>
  );
};

export default page;
