'use client';

import {DEFAULT_IMAGE} from '@/constants';
import {ICategory, IProduct} from '@/lib/interfaces';
import {commaFormatter} from '@/lib/utils/index';
import Image from 'next/image';
import {Key} from 'react';
import {ProductColumnKey} from '../_mock';

type Props = {
  product: IProduct;
  columnKey: Key;
};

const RenderCellProduct = ({product, columnKey}: Props) => {
  const cellValue = product[columnKey as keyof IProduct];

  const category = product.category as ICategory;

  switch (columnKey as ProductColumnKey) {
    case 'name':
      return (
        <div className="flex gap-2">
          <Image
            src={product.thumbnail || DEFAULT_IMAGE}
            alt={product.name}
            width={50}
            height={50}
            className="hidden overflow-hidden bg-white object-contain md:block"
          />
          <div>
            <p className="line-clamp-1">{product.name}</p>
            <p className="line-clamp-1 text-sm text-slate-500">
              {category.name}
            </p>
          </div>
        </div>
      );
    case 'price':
      return commaFormatter(product.displayPrice);
    case 'type':
      return product.type;
    case 'quantity':
      return product.quantity;
    default:
      return <>{cellValue as any}</>;
  }
};

export default RenderCellProduct;
