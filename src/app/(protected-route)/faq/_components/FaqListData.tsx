'use client';

import {CustomTable} from '@/components';
import {APP_ROUTES} from '@/constants';
import {IFaq} from '@/lib/interfaces';
import {useRouter} from 'next/navigation';
import {faqColumns} from '../_mock';
import RenderCellFaq from './RenderCellFaq';

type Props = {
  data: IFaq[];
};

const FaqListData = ({data: faqList}: Props) => {
  const router = useRouter();

  const onClickCreate = () => {
    router.push(APP_ROUTES.FAQS.NEW);
  };
  return (
    <CustomTable
      dataSource={faqList || []}
      columns={faqColumns}
      RenderCell={(faq, columnKey) => (
        <RenderCellFaq faq={faq} columnKey={columnKey} />
      )}
      searchKeys={['name', 'issued_by.name', 'type']}
      searchPlaceholder="Search FAQs..."
      bodyProps={{
        emptyContent: 'No data found',
      }}
      csvData={faqList}
      onClickCreate={onClickCreate}
      createText="Create new FAQ"
      showPagination={false}
    />
  );
};
export default FaqListData;
