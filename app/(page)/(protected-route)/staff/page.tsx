import { fetchAllStaff } from "@/_actions"
import React from "react"
import { StaffListData } from "./_components"

const page = async () => {
    const res = await fetchAllStaff()

    const data = res.data!
    return (
        <div>
            <StaffListData data={data} />
        </div>
    )
}

export default page
