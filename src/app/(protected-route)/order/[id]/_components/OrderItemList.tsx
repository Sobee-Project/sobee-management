'use client';

import {EOrderStatus} from '@/lib/enums';
import {IOrder} from '@/lib/interfaces';
import {useUpdateOrderStatusMutation} from '@/services/order';
import {Button, Select, SelectItem} from '@nextui-org/react';
import {Download} from 'lucide-react';
import toast from 'react-hot-toast';
import {usePDF} from 'react-to-pdf';
import Invoice from './Invoice';

type Props = {
  order: IOrder;
};

const OrderItemList = ({order}: Props) => {
  const {toPDF, targetRef} = usePDF({
    page: {
      margin: 10,
    },
    filename: `order-${order.orderGeneratedId}.pdf`,
  });
  const statuses = Object.values(EOrderStatus);

  const updateOrderStatusMutation = useUpdateOrderStatusMutation(order._id!);

  const isExecuting = updateOrderStatusMutation.isPending;

  const onChangeStatus = (status: string) => {
    updateOrderStatusMutation.mutate(status as EOrderStatus, {
      onSuccess: data => {
        if (data.success) {
          toast.success('Order status updated successfully');
        } else {
          toast.error(data.message);
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to update order status',
        );
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-4">
        <Select
          selectedKeys={[order.status]}
          className="max-w-60 self-end"
          radius="full"
          color="primary"
          isLoading={isExecuting}
          isDisabled={isExecuting || order.status === EOrderStatus.COMPLETED}
          onChange={v => onChangeStatus(v.target.value)}>
          {statuses.map((status, index) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>
        <Button
          onPress={() => toPDF()}
          startContent={<Download size={20} />}
          radius="full"
          variant="light">
          Download Invoice
        </Button>
      </div>
      <Invoice order={order} ref={targetRef} />
    </div>
  );
};

export default OrderItemList;
