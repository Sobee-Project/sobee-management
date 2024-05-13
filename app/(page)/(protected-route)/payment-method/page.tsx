import { fetchAllPaymentMethods, fetchAllShippings } from "@/_actions"
import { redirect } from "next/navigation"
import React from "react"
import { PaymentMethodListData } from "./_components"

const page = async () => {
    const res = await fetchAllPaymentMethods()
    return (
        <div>
            <PaymentMethodListData data={res.data!} />
        </div>
    )
}

export default page
