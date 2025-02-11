'use client';
import {CustomTable} from '@/components';
import {APP_ROUTES} from '@/constants';
import {ITax} from '@/lib/interfaces';
import {useRouter} from 'next/navigation';
import {taxColumns} from '../_mock';
import RenderCellTax from './RenderCellTax';

type Props = {
  data: ITax[];
};

const TaxListData = ({data: taxList}: Props) => {
  const router = useRouter();

  const onClickCreate = () => {
    router.push(APP_ROUTES.TAXES.NEW);
  };

  return (
    <div>
      <CustomTable
        dataSource={taxList || []}
        columns={taxColumns}
        RenderCell={(tax, columnKey) => (
          <RenderCellTax tax={tax} columnKey={columnKey} />
        )}
        searchKeys={['name', 'country', 'city', 'state', 'zip']}
        searchPlaceholder="Search taxes..."
        bodyProps={{
          emptyContent: 'No taxes found',
        }}
        onClickCreate={onClickCreate}
        createText="Create new tax"
        showPagination={false}
      />
    </div>
  );
};

export default TaxListData;
