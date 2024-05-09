import { fetchAllTaxes } from "@/_actions"
import { redirect } from "next/navigation"
import React from "react"
import { TaxListData } from "./_components"

const page = async () => {
    const res = await fetchAllTaxes()
    return (
        <div>
            <TaxListData data={res.data!} />
        </div>
    )
}

export default page
