import {useGetAssetByTypeQuery} from '@/services/asset';
import {Button, Spinner} from '@nextui-org/react';
import {Plus, Trash2Icon} from 'lucide-react';
import Image from 'next/image';
import {useMemo} from 'react';
import {AssetType} from './CloudinaryPlugin.type';

type Props = {
  files: string[];
  setFiles: (urls: string[]) => void;
  multiple: boolean;
  type?: AssetType;
  folder: string;
};

const ViaCloud = ({
  files,
  setFiles,
  multiple,
  type = 'auto',
  folder,
}: Props) => {
  const {data, isLoading} = useGetAssetByTypeQuery(type, folder);
  const assets = useMemo(() => data?.data?.assets || [], [data]);

  const onAddAsset = (asset: string) => {
    if (multiple) {
      setFiles([...files, asset]);
    } else {
      setFiles([asset]);
    }
  };

  const onRemoveAsset = (asset: string) => {
    setFiles(files.filter(f => f !== asset));
  };

  return (
    <div className="grid min-h-20 grid-cols-2 gap-2 md:grid-cols-4">
      {isLoading ? (
        <Spinner />
      ) : assets.length > 0 ? (
        assets.map(asset => (
          <div key={asset} className="relative rounded border p-2">
            <div className="absolute right-2 top-2 flex gap-2">
              {!files.includes(asset) ? (
                <Button isIconOnly size="sm" onPress={() => onAddAsset(asset)}>
                  <Plus size={16} />
                </Button>
              ) : (
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  onPress={() => onRemoveAsset(asset)}>
                  <Trash2Icon size={16} />
                </Button>
              )}
            </div>
            <Image
              src={asset}
              alt="Asset"
              width={200}
              height={200}
              className="h-40 object-contain"
            />
          </div>
        ))
      ) : (
        <p>No assets found</p>
      )}
    </div>
  );
};

export default ViaCloud;
