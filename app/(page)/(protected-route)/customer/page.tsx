import { fetchAllCustomer } from "@/_actions"
import React from "react"
import { CustomerListData } from "./_components"

const page = async () => {
    const res = await fetchAllCustomer()

    const data = res.data!
    return (
        <div>
            <CustomerListData data={data} />
        </div>
    )
}

export default page
