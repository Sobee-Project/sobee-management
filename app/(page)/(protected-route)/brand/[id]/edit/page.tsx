import { fetchBrandById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ParamsProps } from "@/_lib/params"
import { Divider } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { BrandForm } from "../../_components"

const page = async ({ params }: ParamsProps) => {
  const id = params.id
  const res = await fetchBrandById(id)
  const data = res.data!

  return (
    <div className='space-y-6'>
      <div className='mt-4 flex items-center gap-8'>
        <Link href={APP_ROUTES.BRANDS.INDEX} className='p-2'>
          <ChevronLeft className='text-slate-500' />
        </Link>
        <h1 className='text-2xl font-semibold'>
          Update Brand <span className='text-primary'>{data.name}</span>
        </h1>
      </div>
      <Divider />
      <BrandForm data={res.data} type='edit' />
    </div>
  )
}

export default page
