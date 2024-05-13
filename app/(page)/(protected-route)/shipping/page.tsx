import { fetchAllShippings } from "@/_actions"
import { redirect } from "next/navigation"
import React from "react"
import { ShippingListData } from "./_components"

const page = async () => {
    const res = await fetchAllShippings()
    return (
        <div>
            <ShippingListData data={res.data!} />
        </div>
    )
}

export default page
