'use client';

import {APP_ROUTES} from '@/constants';
import {EShippingType} from '@/lib/enums';
import {
  CreateShippingFormSchema,
  UpdateShippingFormSchema,
  createShippingFormSchema,
  updateShippingFormSchema,
} from '@/lib/form-schema';
import {IShipping} from '@/lib/interfaces';
import {
  useCreateShippingMutation,
  useUpdateShippingMutation,
} from '@/services/shipping';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input, Radio, RadioGroup} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  type?: 'new' | 'edit';
  data?: IShipping;
};

const ShippingForm = ({type = 'new', data}: Props) => {
  const isEdit = type === 'edit';
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useForm<CreateShippingFormSchema | UpdateShippingFormSchema>({
    resolver: zodResolver(
      isEdit ? updateShippingFormSchema : createShippingFormSchema,
    ),
    defaultValues: isEdit ? data : undefined,
  });

  const router = useRouter();

  const createShippingMutation = useCreateShippingMutation();
  const updateShippingMutation = useUpdateShippingMutation(data?._id!);

  const isLoading =
    createShippingMutation.isPending || updateShippingMutation.isPending;

  const onSubmit = (
    data: CreateShippingFormSchema | UpdateShippingFormSchema,
  ) => {
    const handler = isEdit ? updateShippingMutation : createShippingMutation;
    handler.mutate(data, {
      onSuccess: data => {
        if (data.success) {
          toast.success(data.message);
          router.push(APP_ROUTES.SHIPPINGS.INDEX);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to save shipping',
        );
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-8">
      <div className="space-y-1">
        <h3 className="font-semibold">Information</h3>
        <p className="text-sm text-slate-500">
          {isEdit ? 'Update' : 'Add'} your shipping information from here
        </p>
      </div>
      <div className="flex-1 rounded-md border bg-background p-8 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            {...register('name')}
            label="Name"
            labelPlacement="outside"
            placeholder="Global"
            variant="bordered"
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            isDisabled={isLoading}
          />
          <RadioGroup
            {...(register('type'),
            {
              onValueChange: value => {
                setValue('type', value);
              },
              value: watch('type') ?? EShippingType.FIXED,
            })}>
            {Object.values(EShippingType).map(type => (
              <Radio value={type} key={type}>
                {type}
              </Radio>
            ))}
          </RadioGroup>

          <Input
            {...register('amount', {
              valueAsNumber: true,
            })}
            label="Amount"
            labelPlacement="outside"
            placeholder="0"
            type="number"
            min={0}
            variant="bordered"
            errorMessage={errors.amount?.message}
            isInvalid={!!errors.amount}
            isDisabled={isLoading}
          />

          <div className="flex flex-wrap gap-2">
            <Button
              type="submit"
              variant="solid"
              color="primary"
              isDisabled={isLoading}
              isLoading={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;
