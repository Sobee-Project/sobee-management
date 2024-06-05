"use client"
import { fetchAllOrders } from "@/_actions"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IOrder, IPaginate } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { orderColumns } from "../_mock"
import RenderCellOrder from "./RenderCellOrder"

type Props = {
  data: IOrder[]
  paginationRes: IPaginate
}

const OrderListData = ({ data, paginationRes: pagination }: Props) => {
  const router = useRouter()

  const [orders, setOrders] = useState(data)
  const [paginationRes, setPaginationRes] = useState<IPaginate>(pagination)

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  useEffect(() => {
    setOrders(data)
    setPaginationRes(pagination)
  }, [data, pagination])

  const fetchNext = useCallback(async (page: number, query: any = {}) => {
    setIsFetching(true)
    const res = await fetchAllOrders({ page, ...query })
    if (res.success) {
      setOrders(res.data!)
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
    <CustomTable
      dataSource={orders || []}
      columns={orderColumns}
      RenderCell={(order, columnKey) => <RenderCellOrder order={order} columnKey={columnKey} />}
      searchKeys={["name"]}
      searchPlaceholder='Search orders...'
      csvData={orders}
      showCreate={false}
      bodyProps={{
        emptyContent: "No orders found",
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
export default OrderListData
