"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IQuestion } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { questionColumns } from "../_mock"
import RenderCellQuestion from "./RenderCellQuestion"

type Props = {
  data: IQuestion[]
}

const QuestionListData = ({ data: questionList }: Props) => {
  const router = useRouter()

  return (
    <div>
      <CustomTable
        dataSource={questionList || []}
        columns={questionColumns}
        RenderCell={(question, columnKey) => <RenderCellQuestion question={question} columnKey={columnKey} />}
        searchKeys={["name", "country", "city", "state", "zip"]}
        searchPlaceholder='Search questions...'
        bodyProps={{
          emptyContent: "No questions found"
        }}
        showCreate={false}
        showPagination={false}
      />
    </div>
  )
}

export default QuestionListData
