"use client"
import { fetchAllBrands } from "@/_actions"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IBrand, IPaginate } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { brandColumns } from "../_mock"
import RenderCellBrand from "./RenderCellBrand"

const BrandListData = () => {
  const router = useRouter()

  const [brands, setBrands] = useState<IBrand[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const fetchNext = useCallback(async (page: number, query: any = {}) => {
    setIsFetching(true)
    const res = await fetchAllBrands({ page, ...query })
    if (res.success) {
      setBrands(res.data!)
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
    router.push(APP_ROUTES.BRANDS.NEW)
  }
  return (
    <CustomTable
      dataSource={brands || []}
      columns={brandColumns}
      RenderCell={(brand, columnKey) => <RenderCellBrand brand={brand} columnKey={columnKey} />}
      searchKeys={["name"]}
      searchPlaceholder='Search brands...'
      csvData={brands}
      onClickCreate={onClickCreate}
      createText='Create new brand'
      bodyProps={{
        emptyContent: "No brands found",
        isLoading: isFetching,
        loadingContent: <Spinner />
      }}
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
  )
}
export default BrandListData
