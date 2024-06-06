import { fetchAllTerms } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import { TermListData } from "./_components"

const page = async () => {
  const res = await fetchAllTerms()

  return (
    <div>
      <PageHeader title='Terms' keyCache={CACHE_KEY.TERM.GET_ALL} />
      <TermListData data={res.data!} />
    </div>
  )
}

export default page
