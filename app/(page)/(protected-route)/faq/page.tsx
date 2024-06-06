import { fetchAllFaqs } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import { FaqListData } from "./_components"

const page = async () => {
  const res = await fetchAllFaqs()

  return (
    <div>
      <PageHeader title='FAQs' keyCache={CACHE_KEY.FAQ.GET_ALL} />
      <FaqListData data={res.data!} />
    </div>
  )
}

export default page
