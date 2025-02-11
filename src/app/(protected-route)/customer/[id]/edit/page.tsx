import {APP_ROUTES} from '@/constants';
import {ParamsProps} from '@/lib/params';
import {fetchCustomerById} from '@/services/customer';
import {Divider} from '@nextui-org/react';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {CustomerForm} from '../../_components';

const page = async ({params}: ParamsProps) => {
  const id = params.id;
  const res = await fetchCustomerById(id);

  const data = res.data!;

  return (
    <div className="space-y-6">
      <div className="mt-4 flex items-center justify-between gap-8">
        <Link href={APP_ROUTES.CUSTOMERS.INDEX} className="p-2">
          <ChevronLeft className="text-slate-500" />
        </Link>
        <h1 className="line-clamp-1 flex-1 text-lg font-semibold md:text-2xl">
          Update Customer <span className="text-primary">{data.name}</span>
        </h1>
      </div>
      <Divider />
      <CustomerForm customer={data} type="edit" />
    </div>
  );
};

export default page;
