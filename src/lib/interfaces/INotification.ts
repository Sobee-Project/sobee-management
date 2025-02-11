import {ENotificationType} from '@/lib/enums';

export interface INotification {
  _id?: string;
  title: string;
  content: string;
  type: ENotificationType | string;
  redirectUrl?: string;
  imageUrl?: string;
}
