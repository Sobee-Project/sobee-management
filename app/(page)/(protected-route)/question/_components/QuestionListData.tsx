"use client"
import { fetchAllQuestions } from "@/_actions"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IPaginate, IQuestion } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { questionColumns } from "../_mock"
import RenderCellQuestion from "./RenderCellQuestion"

const QuestionListData = () => {
  const [questionList, setQuestionList] = useState<IQuestion[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const fetchNext = useCallback(async (page: number, query: any = {}) => {
    setIsFetching(true)
    const res = await fetchAllQuestions({ page, ...query })
    if (res.success) {
      setQuestionList(res.data!)
      setPaginationRes(res)
    }
    setIsFetching(false)
  }, [])

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  useEffect(() => {
    fetchNext(1, { keyword: debouncedKeyword })
  }, [debouncedKeyword, fetchNext])

  return (
    <div>
      <CustomTable
        dataSource={questionList || []}
        columns={questionColumns}
        RenderCell={(question, columnKey) => <RenderCellQuestion question={question} columnKey={columnKey} />}
        searchKeys={["customer"]}
        searchPlaceholder='Search questions...'
        showCreate={false}
        bodyProps={{
          emptyContent: "No questions found",
          isLoading: isFetching,
          loadingContent: <Spinner />
        }}
        createText='Create new category'
        pagination={{
          page: paginationRes.page,
          total: paginationRes.total,
          onChangePage: fetchNext
        }}
        search={{
          keyword,
          onChangeKeyword
        }}
      />
    </div>
  )
}

export default QuestionListData
