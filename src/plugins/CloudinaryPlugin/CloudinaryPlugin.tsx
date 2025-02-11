'use client';

import {UploadFileFormSchema, UploadUrlFormSchema} from '@/lib/form-schema';
import {cn} from '@/lib/utils';
import {
  useUploadFileMutation,
  useUploadUrlMutation,
} from '@/services/cloudinary';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react';
import {Link, MonitorSmartphone, Server} from 'lucide-react';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {CloudinaryPluginProps, ViaDevice, ViaURL} from '.';
import ViaCloud from './ViaCloud';

const CloudinaryPlugin = ({
  className,
  onUploadError,
  onUploadSuccess,
  onClose,
  visible,
  assetType = 'auto',
  folder = 'default',
  multiple = true,
}: CloudinaryPluginProps) => {
  const {
    isOpen,
    onClose: _onClose,
    onOpenChange,
  } = useDisclosure({
    isOpen: visible,
    onClose,
  });

  const [tab, setTab] = useState<'Local' | 'URL' | 'Via Cloud'>('Local');
  const [files, setFiles] = useState<File[] | FileList | null>(null);
  const [url, setUrl] = useState<string>('');
  const [filesUrl, setFilesUrl] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      setFiles(null);
      setUrl('');
    };
  }, []);

  const isUrlDisabled = files !== null ? files.length > 0 : false;
  const isFilesDisabled = url !== '';

  const uploadFileMutation = useUploadFileMutation();
  const uploadUrlMutation = useUploadUrlMutation();

  const isLoading = uploadFileMutation.isPending || uploadUrlMutation.isPending;

  const onUpload = async () => {
    if (tab === 'Via Cloud') {
      onUploadSuccess?.({urls: filesUrl});
      _onClose();
      return;
    }
    const data = {} as UploadUrlFormSchema & UploadFileFormSchema;
    switch (true) {
      case files !== null && files.length > 0:
        const _files = [...files];
        data.files = _files[0];
        break;
      case url !== '':
        data.url = url;
        break;
      default:
        return;
    }
    data.resourceType = assetType;
    data.folder = folder;

    const handler = isFilesDisabled ? uploadUrlMutation : uploadFileMutation;

    handler.mutate(data, {
      onSuccess: data => {
        console.log(data);
        if (!data.success) {
          toast.error('An error occurred while uploading the file.');
          onUploadError?.();
          return;
        }
        if (!data.data?.urls) {
          toast.error('An error occurred while uploading the file.');
          onUploadError?.();
          return;
        }
        onUploadSuccess?.({
          urls: data.data.urls,
        });
        _onClose();
      },
      onError: err => {
        console.log(err);
        toast.error('An error occurred while uploading the file.');
        onUploadError?.();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      size="3xl"
      onOpenChange={onOpenChange}
      scrollBehavior="inside">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>Upload</ModalHeader>
            <ModalBody>
              <div className={cn('flex flex-col gap-4', className)}>
                <Tabs
                  selectedKey={tab}
                  onSelectionChange={v => setTab(v as any)}>
                  <Tab
                    className="py-0"
                    isDisabled={isFilesDisabled || isLoading}
                    key={'Local'}
                    title={
                      <div className="flex items-center gap-2">
                        <MonitorSmartphone size={20} />
                        <span className="hidden sm:block">Via Device</span>
                      </div>
                    }>
                    <ViaDevice
                      files={files}
                      setFiles={setFiles}
                      type={assetType}
                      isLoading={isLoading}
                      multiple={multiple}
                    />
                  </Tab>
                  <Tab
                    className="py-0"
                    isDisabled={isUrlDisabled || isLoading}
                    key={'URL'}
                    title={
                      <div className="flex items-center gap-2">
                        <Link size={20} />
                        <span className="hidden sm:block">Via URL</span>
                      </div>
                    }>
                    <ViaURL url={url} setUrl={setUrl} isLoading={isLoading} />
                  </Tab>
                  <Tab
                    className="py-0"
                    isDisabled={isUrlDisabled || isLoading}
                    key={'Via Cloud'}
                    title={
                      <div className="flex items-center gap-2">
                        <Server size={20} />
                        <span className="hidden sm:block">Via Cloud</span>
                      </div>
                    }>
                    <ViaCloud
                      multiple={multiple}
                      type={assetType}
                      folder={folder}
                      files={filesUrl}
                      setFiles={setFilesUrl}
                    />
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              {tab === 'Via Cloud' ? (
                <Button
                  color="primary"
                  isDisabled={isLoading || filesUrl.length === 0}
                  onPress={onUpload}
                  isLoading={isLoading}>
                  Choose
                </Button>
              ) : (
                <Button
                  color="primary"
                  isDisabled={
                    isLoading ||
                    ((files === null || files.length === 0) && url === '')
                  }
                  onPress={onUpload}
                  isLoading={isLoading}>
                  {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
              )}
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CloudinaryPlugin;
