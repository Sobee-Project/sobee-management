import {APP_ROUTES} from '@/constants';
import {ParamsProps} from '@/lib/params';
import {fetchTermByIdAction} from '@/services/term';
import {Divider} from '@nextui-org/react';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {TermForm} from '../../_components';

const page = async ({params}: ParamsProps) => {
  const id = params.id;
  const res = await fetchTermByIdAction(id);
  const data = res.data!;

  return (
    <div className="space-y-6">
      <div className="mt-4 flex items-center gap-8">
        <Link href={APP_ROUTES.TERMS_AND_CONDITIONS.INDEX} className="p-2">
          <ChevronLeft className="text-slate-500" />
        </Link>
        <h1 className="text-2xl font-semibold">
          Update TERM <span className="text-primary">{data.title}</span>
        </h1>
      </div>
      <Divider />
      <TermForm data={res.data} type="edit" />
    </div>
  );
};

export default page;
