import {APP_ROUTES} from '@/constants';
import {Divider} from '@nextui-org/react';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import PushNotificationForm from '../components/PushNotificationForm';

const page = () => {
  return (
    <div className="space-y-6">
      <div className="mt-4 flex items-center gap-8">
        <Link href={APP_ROUTES.NOTIFICATIONS.INDEX} className="p-2">
          <ChevronLeft className="text-slate-500" />
        </Link>
        <h1 className="text-2xl font-semibold">Push Notification</h1>
      </div>
      <Divider />
      <PushNotificationForm />
    </div>
  );
};

export default page;
