'use client';

import {APP_ROUTES} from '@/constants';
import {
  CreateFaqFormSchema,
  UpdateFaqFormSchema,
  createFaqFormSchema,
  updateFaqFormSchema,
} from '@/lib/form-schema';
import {IFaq} from '@/lib/interfaces';
import {useCreateFaqMutation, useUpdateFaqMutation} from '@/services/faq';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input, Textarea} from '@nextui-org/react';
import {useParams, useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  type?: 'new' | 'edit';
  data?: IFaq;
};

const FaqForm = ({type = 'new', data}: Props) => {
  const isEdit = type === 'edit';
  const router = useRouter();
  const params = useParams();

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateFaqFormSchema | UpdateFaqFormSchema>({
    resolver: zodResolver(isEdit ? updateFaqFormSchema : createFaqFormSchema),
    defaultValues: isEdit ? data : {title: '', description: '', type: ''},
  });

  const createFaqMutation = useCreateFaqMutation();
  const updateFaqMutation = useUpdateFaqMutation(data?._id!);

  const isLoading = createFaqMutation.isPending || updateFaqMutation.isPending;

  const onSubmit = (data: CreateFaqFormSchema | UpdateFaqFormSchema) => {
    const handler = isEdit ? updateFaqMutation : createFaqMutation;
    handler.mutate(data, {
      onSuccess: data => {
        if (data.success) {
          toast.success(data.message);
          router.push(APP_ROUTES.FAQS.INDEX);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to save FAQ');
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-8">
      <div className="space-y-1">
        <h3 className="font-semibold">Information</h3>
        <p className="text-sm text-slate-500">
          {isEdit ? 'Update' : 'Add'} your FaQ information from here
        </p>
      </div>
      <div className="flex-1 rounded-md border bg-background p-8 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            {...register('title')}
            label="Name"
            labelPlacement="outside"
            placeholder="FaQ title"
            variant="bordered"
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            isDisabled={isLoading}
          />
          <Textarea
            {...register('description')}
            label="Description"
            labelPlacement="outside"
            placeholder="FaQ description"
            variant="bordered"
            errorMessage={errors.description?.message}
            isInvalid={!!errors.description}
            isDisabled={isLoading}
          />
          <Input
            {...register('type')}
            label="Type"
            labelPlacement="outside"
            placeholder="FaQ type"
            variant="bordered"
            errorMessage={errors.type?.message}
            isInvalid={!!errors.type}
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
export default FaqForm;
