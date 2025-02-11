import {APP_ROUTES} from '@/constants';
import {ParamsProps} from '@/lib/params';
import {redirect} from 'next/navigation';

const page = ({params}: ParamsProps) => {
  redirect(APP_ROUTES.TERMS_AND_CONDITIONS.EDIT.replace(':id', params.id));
};

export default page;
