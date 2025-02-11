'use client';
import {DEFAULT_IMAGE} from '@/constants';
import {ENotificationType} from '@/lib/enums';
import {
  pushNotificationFormSchema,
  PushNotificationFormSchema,
} from '@/lib/form-schema';
import {CloudinaryPlugin} from '@/plugins';
import {usePushNotificationMutation} from '@/services/notification';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input, Select, SelectItem, Textarea} from '@nextui-org/react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React from 'react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

const PushNotificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    reset,
  } = useForm<PushNotificationFormSchema>({
    resolver: zodResolver(pushNotificationFormSchema),
    defaultValues: {
      title: '',
      content: '',
      imageUrl: DEFAULT_IMAGE,
      redirectUrl: '',
      type: ENotificationType.INFO,
    },
  });
  const [showThumbnailPlugin, setShowThumbnailPlugin] = React.useState(false);
  const notificationTypes = Object.values(ENotificationType);
  const pushNotificationMutation = usePushNotificationMutation();
  const router = useRouter();

  const isLoading = pushNotificationMutation.isPending;

  const onSubmit = (data: PushNotificationFormSchema) => {
    pushNotificationMutation.mutate(data, {
      onSuccess: data => {
        if (data.success) {
          toast.success('Notification pushed successfully');
          reset();
        } else {
          toast.error('Failed to push notification');
        }
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div className="flex flex-wrap gap-8">
      <div className="space-y-1">
        <h3 className="font-semibold">Information</h3>
        <p className="text-sm text-slate-500">Push new notification to users</p>
      </div>
      <div className="flex-1 rounded-md border bg-background p-8 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            {...register('title')}
            label="Title"
            labelPlacement="outside"
            placeholder="New update"
            variant="bordered"
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            isDisabled={isLoading}
          />
          <Select
            {...register('type')}
            label="Type"
            labelPlacement="outside"
            description="Select type of the notification"
            placeholder="Select type"
            variant="bordered">
            {notificationTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            {...register('content')}
            label="Content"
            labelPlacement="outside"
            placeholder="Content of the notification"
            variant="bordered"
            errorMessage={errors.content?.message}
            isInvalid={!!errors.content}
            isDisabled={isLoading}
          />
          <Input
            {...register('redirectUrl')}
            label="Redirect URL"
            labelPlacement="outside"
            placeholder="https://example.com"
            variant="bordered"
            errorMessage={errors.redirectUrl?.message}
            isInvalid={!!errors.redirectUrl}
            isDisabled={isLoading}
          />
          <div className="flex">
            <div className="w-1/3">
              <p className="mb-2 text-sm">Image</p>
              <Button
                color="primary"
                variant="bordered"
                onClick={() => setShowThumbnailPlugin(true)}>
                Choose Image
              </Button>
            </div>
            <div className="ml-4 w-2/3">
              <div className="size-fit rounded border border-dashed p-4">
                <div className="relative">
                  <Image
                    src={watch('imageUrl') as string}
                    alt="coupon"
                    objectFit="contain"
                    width={400}
                    height={300}
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          {showThumbnailPlugin && (
            <CloudinaryPlugin
              visible={showThumbnailPlugin}
              onClose={() => setShowThumbnailPlugin(false)}
              onUploadSuccess={({urls}) => setValue('imageUrl', urls[0])}
              assetType="image"
              multiple={false}
              folder="image/notification"
            />
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              type="submit"
              variant="solid"
              color="primary"
              isDisabled={isLoading}
              isLoading={isLoading}>
              {isLoading ? 'Pushing...' : 'Push'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PushNotificationForm;
