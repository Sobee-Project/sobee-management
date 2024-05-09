import { fetchTaxById } from "@/_actions"
import { ParamsProps } from "@/_lib/params"
import { Divider } from "@nextui-org/react"
import { redirect } from "next/navigation"
import React from "react"
import { TaxForm } from "../../_components"

const page = async ({ params }: ParamsProps) => {
    const id = params.id
    const res = await fetchTaxById(id)
    if (!res.success || !res.data) {
        redirect("/" + res.statusCode.toString())
    }
    return (
        <div className='space-y-6'>
            <h1 className='mt-4 text-2xl font-semibold'>
                Update Tax <span className='text-primary'>{res.data.name}</span>
            </h1>
            <Divider />
            <TaxForm data={res.data} type='edit' />
        </div>
    )
}

export default page
