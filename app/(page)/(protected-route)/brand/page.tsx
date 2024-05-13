import { fetchAllBrands } from "@/_actions"
import React from "react"
import { BrandListData } from "./_components"

const page = async () => {
    const res = await fetchAllBrands()

    return (
        <div>
            <BrandListData data={res.data!} />
        </div>
    )
}

export default page
