import {APP_ROUTES} from '@/constants';
import {ParamsProps} from '@/lib/params';
import {redirect} from 'next/navigation';

const page = async ({params}: ParamsProps) => {
  redirect(APP_ROUTES.CUSTOMERS.EDIT.replace(':id', params.id));
};

export default page;
