'use client';

import {DEFAULT_IMAGE} from '@/constants';
import {ICategory} from '@/lib/interfaces';
import {Avatar, Select, SelectItem, SelectProps} from '@nextui-org/react';
import {forwardRef} from 'react';

type CategorySelectProps = {
  categoryList: ICategory[];
} & Omit<SelectProps, 'items' | 'renderValue' | 'children'>;

// eslint-disable-next-line react/display-name
const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(
  ({categoryList, ...props}, ref) => {
    const RenderCategory = (category: ICategory) => (
      <div key={category._id} className="flex items-center gap-2">
        <Avatar
          src={category.image}
          size="sm"
          showFallback
          fallback={DEFAULT_IMAGE}
        />
        <div className="flex-1 space-y-1">
          <p className="text-foreground">{category.name}</p>
        </div>
      </div>
    );

    return (
      <Select
        ref={ref}
        items={categoryList}
        selectionMode="single"
        disallowEmptySelection
        label="Category"
        placeholder="Select category"
        renderValue={items =>
          items.map(item => (
            <RenderCategory {...item.data!} key={item.data?._id} />
          ))
        }
        {...props}>
        {category => (
          <SelectItem key={category._id!} value={category._id}>
            <RenderCategory {...category} />
          </SelectItem>
        )}
      </Select>
    );
  },
);

export default CategorySelect;
