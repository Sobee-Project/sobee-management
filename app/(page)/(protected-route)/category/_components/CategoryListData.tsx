"use client"
import { fetchAllCategories } from "@/_actions"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ICategory, IPaginate } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { categoryColumns } from "../_mock"
import RenderCellCategory from "./RenderCellCategory"

const CategoryListData = () => {
  const router = useRouter()

  const [categories, setCategories] = useState<ICategory[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const fetchNext = useCallback(async (page: number, query: any = {}) => {
    setIsFetching(true)
    const res = await fetchAllCategories({ page, ...query })
    if (res.success) {
      setCategories(res.data!)
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

  const onClickCreate = () => {
    router.push(APP_ROUTES.CATEGORIES.NEW)
  }

  return (
    <div>
      <CustomTable
        dataSource={categories || []}
        columns={categoryColumns}
        RenderCell={(category, columnKey) => <RenderCellCategory category={category} columnKey={columnKey} />}
        searchKeys={["name", "slug"] as (keyof ICategory)[]}
        searchPlaceholder='Search categories...'
        bodyProps={{
          emptyContent: "No categories found",
          isLoading: isFetching,
          loadingContent: <Spinner />
        }}
        onClickCreate={onClickCreate}
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

export default CategoryListData
