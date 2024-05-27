import { fetchAllQuestions, fetchAllTaxes } from "@/_actions"
import { redirect } from "next/navigation"
import React from "react"
import { QuestionListData } from "./_components"

const page = async () => {
  const res = await fetchAllQuestions()
  return (
    <div>
      <QuestionListData data={res.data!} />
    </div>
  )
}

export default page
