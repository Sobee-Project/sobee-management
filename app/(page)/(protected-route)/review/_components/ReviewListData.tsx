"use client"
import { fetchAllReviews } from "@/_actions"
import { CustomTable } from "@/_components"
import { IPaginate, IReview } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { reviewColumn } from "../_mock"
import RenderCellReview from "./RenderCellReview"

const ReviewListData = () => {
  const [reviewList, setReviewList] = useState<IReview[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const fetchNext = useCallback(async (page: number, query: any = {}) => {
    setIsFetching(true)
    const res = await fetchAllReviews({ page, ...query })
    if (res.success) {
      setReviewList(res.data!)
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
        dataSource={reviewList || []}
        columns={reviewColumn}
        RenderCell={(review, columnKey) => <RenderCellReview review={review} columnKey={columnKey} />}
        searchKeys={["customer.name", "title", "content"]}
        searchPlaceholder='Search reviews...'
        bodyProps={{
          emptyContent: "No categories found",
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
        showCreate={false}
      />
    </div>
  )
}
export default ReviewListData
