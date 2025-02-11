'use client';

import {APP_ROUTES} from '@/constants';
import {ERole} from '@/lib/enums';
import {
  CreateCustomerFormSchema,
  UpdateCustomerFormSchema,
  createCustomerFormSchema,
  updateCustomerFormSchema,
} from '@/lib/form-schema';
import {ICustomer, IUser} from '@/lib/interfaces';
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} from '@/services/customer';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Divider, Input} from '@nextui-org/react';
import {format} from 'date-fns';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  customer?: IUser<ICustomer>;
  type?: 'create' | 'edit';
};

const CustomerForm = ({customer, type = 'create'}: Props) => {
  const isEdit = type === 'edit';
  const customerUser = customer?._user as ICustomer;

  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useForm<CreateCustomerFormSchema | UpdateCustomerFormSchema>({
    resolver: zodResolver(
      isEdit ? updateCustomerFormSchema : createCustomerFormSchema,
    ),
    defaultValues: isEdit
      ? {
          ...customer,
          role: ERole.CUSTOMER,
          avatar: customer?.avatar,
          dateOfBirth:
            format(customer?.dateOfBirth || new Date(), 'yyyy-MM-dd') ?? '',
          _user: {
            ...customerUser,
          },
        }
      : {
          role: ERole.CUSTOMER,
          avatar: 'https://avatar.iran.liara.run/username',
          name: '',
          email: '',
          phoneNumber: '',
          dateOfBirth:
            format(customer?.dateOfBirth || new Date(), 'yyyy-MM-dd') ?? '',
          _user: {
            gender: 'male',
            isActive: true,
          },
        },
  });

  const router = useRouter();

  const createCustomerMutation = useCreateCustomerMutation();
  const updateCustomerMutation = useUpdateCustomerMutation(customer?._id!);

  const isLoading =
    createCustomerMutation.isPending || updateCustomerMutation.isPending;

  const onSubmit = (
    data: CreateCustomerFormSchema | UpdateCustomerFormSchema,
  ) => {
    if (!data.dateOfBirth) {
      return toast.error('Date of birth is required');
    }

    const body = {
      ...data,
      avatar: `https://avatar.iran.liara.run/username?username=${encodeURIComponent(data.name)}`,
    };

    const handler = isEdit ? updateCustomerMutation : createCustomerMutation;

    handler.mutate(body, {
      onSuccess: data => {
        if (data.success) {
          toast.success(data.message);
          router.push(APP_ROUTES.CUSTOMERS.INDEX);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            'An error occurred while saving the customer',
        );
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-8">
      <div className="space-y-1">
        <h3 className="font-semibold">Information</h3>
        <p className="text-sm text-slate-500">
          {isEdit ? 'Update' : 'Add'} customer from here
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-6 rounded-md border bg-background p-8 shadow-lg">
        <Input
          {...register('name')}
          label="Customer name"
          labelPlacement="outside"
          placeholder="Le Van Duy"
          variant="bordered"
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
        />
        <Input
          {...register('email')}
          label="Email"
          labelPlacement="outside"
          placeholder="example@host.com"
          variant="bordered"
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
        />
        <Input
          {...register('phoneNumber')}
          label="Phone number"
          labelPlacement="outside"
          placeholder="0123456789"
          variant="bordered"
          errorMessage={errors.phoneNumber?.message}
          isInvalid={!!errors.phoneNumber}
        />

        <Input
          {...register('dateOfBirth')}
          label="Date of birth"
          labelPlacement="outside"
          variant="bordered"
          errorMessage={errors.dateOfBirth?.message}
          isInvalid={!!errors.dateOfBirth}
          type="date"
        />

        <Divider />
        <div className="flex justify-end gap-2">
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            color="primary"
            type="submit">
            {isLoading ? 'Saving' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
