import {CACHE_KEY} from '@/constants';
import {PageHeader} from '../_components';
import NotificationList from './components/NotificationList';

const page = async () => {
  return (
    <div>
      <PageHeader
        title="Notifications"
        keyCache={CACHE_KEY.NOTIFICATION.GET_ALL}
      />
      <NotificationList />
    </div>
  );
};

export default page;
