import {APP_ROUTES} from '@/constants';
import {getCurrentUserAction} from '@/services/auth';
import {redirect} from 'next/navigation';
import {PropsWithChildren} from 'react';
import {Sidebar, Topbar} from './_components';

const Layout = async ({children}: PropsWithChildren) => {
  const user = await getCurrentUserAction();
  if (!user?.user) {
    redirect(APP_ROUTES.LOGIN);
  }
  return (
    <div className="flex max-h-screen min-h-screen">
      <Sidebar />
      <div className="flex h-screen max-h-screen min-h-screen flex-1 flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-auto bg-background p-2 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
