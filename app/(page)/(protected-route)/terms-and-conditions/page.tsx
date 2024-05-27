import { fetchAllTerms } from "@/_actions"
import React from "react"
import { TermListData } from "./_components"

const page = async () => {
  const res = await fetchAllTerms()

  return (
    <div>
      <TermListData data={res.data!} />
    </div>
  )
}

export default page
