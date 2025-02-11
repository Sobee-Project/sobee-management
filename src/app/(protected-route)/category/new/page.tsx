import {APP_ROUTES} from '@/constants';
import {ICategory} from '@/lib/interfaces';
import {fetchAllCategoriesAction} from '@/services/category';
import {Divider} from '@nextui-org/react';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {CategoryForm} from '../_components';

const page = async () => {
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
        <h1 className="text-2xl font-semibold">Add Category</h1>
      </div>
      <Divider />
      <CategoryForm categories={categories} />
    </div>
  );
};

export default page;
