import { fetchAllFaqs } from "@/_actions"
import React from "react"
import { FaqListData } from "./_components"

const page = async () => {
  const res = await fetchAllFaqs()

  return (
    <div>
      <FaqListData data={res.data!} />
    </div>
  )
}

export default page
