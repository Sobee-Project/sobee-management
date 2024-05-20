import { fetchAllBrands, fetchAllCategories } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IBrand, ICategory } from "@/_lib/interfaces"
import { Divider } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ProductForm } from "../_components"

const page = async () => {
    let brands = [] as IBrand[]
    let categories = [] as ICategory[]
    const brandFetch = fetchAllBrands()
    const categoryFetch = fetchAllCategories()
    const [brandRes, categoryRes] = await Promise.all([brandFetch, categoryFetch])

    if (brandRes.success) {
        brands = brandRes.data!
    }
    if (categoryRes.success) {
        categories = categoryRes.data!
    }

    return (
        <div className='space-y-6'>
            <div className='mt-4 flex items-center gap-8'>
                <Link href={APP_ROUTES.PRODUCTS.INDEX} className='p-2'>
                    <ChevronLeft className='text-slate-500' />
                </Link>
                <h1 className='text-2xl font-semibold'>Add Product</h1>
            </div>
            <Divider />
            <ProductForm brands={brands} categories={categories} />
        </div>
    )
}

export default page
