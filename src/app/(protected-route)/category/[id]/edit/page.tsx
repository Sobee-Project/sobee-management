import {APP_ROUTES} from '@/constants';
import {ICategory} from '@/lib/interfaces';
import {ParamsProps} from '@/lib/params';
import {
  fetchAllCategoriesAction,
  fetchCategoryByIdAction,
} from '@/services/category';
import {Divider} from '@nextui-org/react';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {CategoryForm} from '../../_components';

const page = async ({params}: ParamsProps) => {
  const id = params.id;
  const res = await fetchCategoryByIdAction(id);
  const data = res.data!;

  let categories = [] as ICategory[];
  const categoryFetch = fetchAllCategoriesAction();

  const [categoryRes] = await Promise.all([categoryFetch]);

  if (categoryRes.success) {
    categories = categoryRes.data!;
  }

  return (
    <div className="space-y-6">
      <div className="mt-4 flex items-center gap-8">
        <Link href={APP_ROUTES.CATEGORIES.INDEX} className="p-2">
          <ChevronLeft className="text-slate-500" />
        </Link>
        <h1 className="text-2xl font-semibold">
          Update Category <span className="text-primary">{data.name}</span>
        </h1>
      </div>
      <Divider />
      <CategoryForm data={res.data} categories={categories} type="edit" />
    </div>
  );
};

export default page;
