import { fetchAllAttributes, fetchAllBrands, fetchAllCategories, fetchFaqById, fetchProductById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IAttribute, IBrand, ICategory } from "@/_lib/interfaces"
import { ParamsProps } from "@/_lib/params"
import { Divider } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ProductForm } from "../../_components"

const page = async ({ params }: ParamsProps) => {
    const id = params.id
    const res = await fetchProductById(id)
    const data = res.data!

    let attributes = [] as IAttribute[]
    let brands = [] as IBrand[]
    let categories = [] as ICategory[]
    const attributeRes = await fetchAllAttributes()
    const brandRes = await fetchAllBrands()
    const categoryRes = await fetchAllCategories()
    if (attributeRes.success) {
        attributes = attributeRes.data!
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
                    Update Product <span className='text-primary'>{data.name}</span>
                </h1>
            </div>
            <Divider />
            <ProductForm data={res.data} type='edit' attributes={attributes} brands={brands} categories={categories} />
        </div>
    )
}

export default page
