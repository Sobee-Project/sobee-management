'use client';

import {APP_ROUTES} from '@/constants';
import {ECouponStatus, ECouponType} from '@/lib/enums';
import {ICoupon} from '@/lib/interfaces';
import {commaFormatter} from '@/lib/utils/index';
import {useDeleteCouponMutation} from '@/services/coupon';
import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import {format, formatDistanceToNow} from 'date-fns';
import {SquarePen, Trash2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {Key, useState} from 'react';
import toast from 'react-hot-toast';
import {CouponColumnKey} from '../_mock';
import ActiveCouponModal from './ActiveCouponModal';
import ViewCouponModal from './ViewCouponModal';

type Props = {
  coupon: ICoupon;
  columnKey: Key;
};

const RenderCellCoupon = ({coupon, columnKey}: Props) => {
  const cellValue = coupon[columnKey as keyof ICoupon];
  const [showPopover, setShowPopover] = useState(false);

  const deleteCouponMutation = useDeleteCouponMutation();

  const isLoading = deleteCouponMutation.isPending;

  const onDelete = () => {
    deleteCouponMutation.mutate(coupon._id!, {
      onSuccess: data => {
        if (data.success) {
          toast.success(data.message);
          setShowPopover(false);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to delete coupon',
        );
      },
    });
  };

  switch (columnKey as CouponColumnKey) {
    case 'image':
      return (
        <div className="relative size-12">
          <Image
            src={coupon.image}
            alt={coupon.code}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
      );
    case 'code':
      return coupon.code;
    case 'type':
      return coupon.type;
    case 'discountValue':
      switch (coupon.type) {
        case ECouponType.PERCENTAGE:
          return `${coupon.discountValue * 100}%`;
        case ECouponType.FIXED:
          return `${commaFormatter(coupon.discountValue)}`;
        default:
          return '-';
      }
    case 'minOrderValue':
      return `${commaFormatter(coupon.minOrderValue)}`;
    case 'startDate':
      return (
        //two p element one is date and another is time from now, format is like "21/2/2024""2 days ago"
        <div>
          <p>{format(new Date(coupon.startDate as string), 'dd/MM/yyyy')}</p>
          <p className="font-semibold">
            {formatDistanceToNow(new Date(coupon.startDate as string), {
              addSuffix: true,
            })}
          </p>
        </div>
      );
    case 'endDate':
      return (
        <div>
          <p>{format(new Date(coupon.endDate as string), 'dd/MM/yyyy')}</p>
          <p className="font-semibold">
            {formatDistanceToNow(new Date(coupon.endDate as string), {
              addSuffix: true,
            })}
          </p>
        </div>
      );
    case 'status':
      switch (coupon.status) {
        case ECouponStatus.ACTIVE:
          return (
            <Chip color="success" classNames={{content: 'text-white'}}>
              Active
            </Chip>
          );
        case ECouponStatus.DISABLED:
          return (
            <Chip color="danger" classNames={{content: 'text-white'}}>
              Inactive
            </Chip>
          );
        case ECouponStatus.EXPIRED:
          return (
            <Chip color="warning" classNames={{content: 'text-white'}}>
              Expired
            </Chip>
          );
        default:
          return '-';
      }
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <ViewCouponModal coupon={coupon} />
          <ActiveCouponModal coupon={coupon} />
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            as={Link}
            href={APP_ROUTES.COUPONS.EDIT.replace(':id', coupon?._id!)}>
            <SquarePen size={20} />
          </Button>
          <Popover
            placement="right"
            isOpen={showPopover}
            onOpenChange={setShowPopover}
            showArrow>
            <PopoverTrigger>
              <Button isIconOnly variant="light" color="danger" size="sm">
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2 self-end px-1 py-2">
                <p className="font-bold">Delete confirmation</p>
                <p>
                  Are you sure you want to delete <b>this review</b> role?
                </p>
                <div className="flex justify-end space-x-2">
                  <Button
                    color="danger"
                    onClick={onDelete}
                    size="sm"
                    isLoading={isLoading}
                    isDisabled={isLoading}>
                    {isLoading ? 'Deleting review...' : 'Confirm'}
                  </Button>
                  <Button
                    color="default"
                    onClick={() => setShowPopover(false)}
                    size="sm">
                    No
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    default:
      return <>{cellValue as any}</>;
  }
};
export default RenderCellCoupon;
