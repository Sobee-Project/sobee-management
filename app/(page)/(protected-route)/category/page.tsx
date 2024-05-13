import { fetchAllCategories, fetchAllTaxes } from "@/_actions"
import { redirect } from "next/navigation"
import React from "react"
import { CategoryListData } from "./_components"

const page = async () => {
    const res = await fetchAllCategories()
    return (
        <div>
            <CategoryListData data={res.data!} />
        </div>
    )
}

export default page
