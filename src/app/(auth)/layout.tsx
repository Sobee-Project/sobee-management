import {APP_ROUTES} from '@/constants';
import {getCurrentUserAction} from '@/services/auth';
import {redirect} from 'next/navigation';
import {PropsWithChildren} from 'react';

const layout = async ({children}: PropsWithChildren) => {
  const user = await getCurrentUserAction();
  if (user?.user) {
    redirect(APP_ROUTES.DASHBOARD);
  }
  return <div>{children}</div>;
};

export default layout;
