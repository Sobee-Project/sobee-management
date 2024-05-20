import { fetchAllBrands, fetchAllCategories, fetchFaqById, fetchProductById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IBrand, ICategory, IProduct } from "@/_lib/interfaces"
import { ParamsProps } from "@/_lib/params"
import { Divider } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ProductForm } from "../../_components"

const page = async ({ params }: ParamsProps) => {
    const id = params.id

    let product = {} as IProduct
    const productFetch = fetchProductById(id)
    let brands = [] as IBrand[]
    let categories = [] as ICategory[]
    const brandFetch = fetchAllBrands()
    const categoryFetch = fetchAllCategories()
    const [productRes, brandRes, categoryRes] = await Promise.all([productFetch, brandFetch, categoryFetch])

    if (productRes.success) {
        product = productRes.data!
    }

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
                <h1 className='text-2xl font-semibold'>
                    Update Product <span className='text-primary'>{product.name}</span>
                </h1>
            </div>
            <Divider />
            <ProductForm data={product} type='edit' brands={brands} categories={categories} />
        </div>
    )
}

export default page
