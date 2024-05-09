import { Divider } from "@nextui-org/react"
import React from "react"
import { TaxForm } from "../_components"

const page = () => {
    return (
        <div className='space-y-6'>
            <h1 className='mt-4 text-2xl font-semibold'>Add Tax</h1>
            <Divider />
            <TaxForm />
        </div>
    )
}

export default page
