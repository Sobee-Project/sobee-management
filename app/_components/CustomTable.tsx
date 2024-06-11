"use client"
import { IPaginate } from "@/_lib/interfaces"
import {
  Button,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow
} from "@nextui-org/react"
import { Download, Plus, Search, Trash2 } from "lucide-react"
import { Key, useCallback, useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { Headers } from "react-csv/lib/core"
import toast from "react-hot-toast"

type ActionMeta = {
  onClickCreate?: () => void
  onClickDelete?: (selectedKeys: Key[]) => void
  searchKeys?: string[]
  csvFileName?: string
  csvData?: any
}

type Settings = {
  showCreate?: boolean
  createText?: string
  showCheckbox?: boolean
  rowKeyPattern?: string
  searchPlaceholder?: string
  showPagination?: boolean
  showExport?: boolean
}

type Pagination = {
  onChangePage?: (page: number) => void
} & IPaginate

type Search = {
  keyword: string
  onChangeKeyword: (keyword: string) => void
}

type TableNode<T> = {
  RenderCell: (data: T, columnKey: ColumnType["key"]) => any
}

export type ColumnType<T = Key> = {
  label: string
  key: T
  allowSorting?: boolean
}

type CustomTableProps<T = any> = {
  dataSource: T[]
  columns: ColumnType[]
  bodyProps?: Omit<TableBodyProps<T>, "children">
  pagination?: Pagination
  search?: Search
} & ActionMeta &
  Settings &
  TableNode<T> &
  TableProps

const CustomTable = <T = any,>(props: CustomTableProps<T>) => {
  const {
    dataSource = [],
    columns = [],
    onClickCreate = () => {},
    onClickDelete = () => {},
    searchKeys = ["name"],
    csvFileName = "data.csv",
    showCreate = true,
    showCheckbox = true,
    rowKeyPattern = "_id",
    RenderCell,
    csvData,
    searchPlaceholder = "Search...",
    createText = "Create",
    pagination = { page: 1, total: 10, onChangePage: () => {} } as Pagination,
    showPagination = true,
    search,
    showExport = true
  } = props
  const { page, total, onChangePage } = pagination
  const { keyword, onChangeKeyword } = search ?? ({} as Search)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [dataSourceState, setDataSourceState] = useState<T[]>(dataSource)
  const [showPopover, setShowPopover] = useState(false)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending"
  })
  const [searchLocal, setSearchLocal] = useState("")

  useEffect(() => {
    setDataSourceState(dataSource)
  }, [dataSource])

  const onSelectChange = useCallback(
    (selectedRowKeys: Selection) => {
      if (selectedRowKeys === "all") {
        setSelectedRowKeys(dataSource.map((item: any) => item[rowKeyPattern]))
        return
      }
      setSelectedRowKeys(Array.from(selectedRowKeys))
    },
    [dataSource, rowKeyPattern]
  )

  const onCreate = useCallback(() => {
    onClickCreate?.()
  }, [onClickCreate])

  const onDelete = useCallback(() => {
    onClickDelete?.(selectedRowKeys)
    setSelectedRowKeys([])
    setShowPopover(false)
    setDataSourceState(dataSource.filter((item: any) => !selectedRowKeys.includes(item[rowKeyPattern])))
  }, [dataSource, onClickDelete, rowKeyPattern, selectedRowKeys])

  function onClickExport() {
    toast.success("Exported successfully")
  }

  const onReset = useCallback(() => {
    setDataSourceState(dataSource)
  }, [dataSource])

  function fromDotKeyToObjectValue(obj: any, key: string) {
    return key.split(".").reduce((o, i) => o[i], obj)
  }

  const onSearch = useCallback(
    (_keyword: string) => {
      if (search) {
        onChangeKeyword(_keyword)
      } else {
        setSearchLocal(_keyword)
        const filteredData = dataSource.filter((item: any) => {
          return searchKeys.some((key) => {
            const value = fromDotKeyToObjectValue(item, key)
            return value?.toString().toLowerCase().includes(_keyword.toLowerCase())
          })
        })
        setDataSourceState(filteredData)
      }
    },
    [dataSource, onChangeKeyword, search, searchKeys]
  )

  const onSortChange = useCallback(
    (_sortDescriptor: SortDescriptor) => {
      setSortDescriptor(_sortDescriptor)

      const sortedData = [...dataSource].sort((a: any, b: any) => {
        const sortKeyA = fromDotKeyToObjectValue(a, _sortDescriptor.column as string)
        const sortKeyB = fromDotKeyToObjectValue(b, _sortDescriptor.column as string)
        if (_sortDescriptor.direction === "ascending") {
          // @ts-ignore
          return sortKeyA > sortKeyB ? 1 : -1
        } else {
          // @ts-ignore
          return sortKeyA < sortKeyB ? 1 : -1
        }
      })
      setDataSourceState(sortedData)
    },
    [dataSource]
  )

  const renderTopContent = useCallback(() => {
    return (
      <div className='flex space-x-2'>
        <Input
          className='flex-1'
          placeholder={searchPlaceholder}
          variant='bordered'
          endContent={<Search size={20} />}
          onValueChange={onSearch}
          value={search ? keyword : searchLocal}
        />
        {selectedRowKeys.length === 0 ? (
          showCreate && (
            <>
              <Button
                color='primary'
                startContent={<Plus size={18} />}
                onClick={onCreate}
                className='hidden md:inline-flex'
              >
                {createText}
              </Button>
              <Button color='primary' isIconOnly onClick={onCreate} className='inline-flex md:hidden'>
                <Plus size={18} />
              </Button>
            </>
          )
        ) : (
          <Popover placement='right' isOpen={showPopover} onOpenChange={setShowPopover} showArrow>
            <PopoverTrigger>
              <Button color='danger' startContent={<Trash2 size={14} />}>
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2 self-end px-1 py-2'>
                <p className='font-bold'>Delete confirmation</p>
                <p>
                  Are you sure you want to delete <b>{selectedRowKeys.length}</b> items?
                </p>
                <div className='flex justify-end space-x-2'>
                  <Button color='danger' onClick={onDelete} size='sm'>
                    Yes
                  </Button>
                  <Button color='default' onClick={() => setShowPopover(false)} size='sm'>
                    No
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {dataSource.length > 0 && showExport && (
          <CSVLink
            filename={csvFileName?.includes(".csv") ? csvFileName : csvFileName + ".csv"}
            data={(csvData ?? dataSource) as any}
            headers={
              columns
                .filter((v) => v.key !== "actions")
                .map((column) => ({
                  label: column.label,
                  key: column.key
                })) as Headers
            }
          >
            <Button startContent={<Download size={14} />} onClick={onClickExport} className='hidden md:inline-flex'>
              Export
            </Button>
            <Button isIconOnly onClick={onClickExport} className='inline-flex md:hidden'>
              <Download size={14} />
            </Button>
          </CSVLink>
        )}
      </div>
    )
  }, [
    searchPlaceholder,
    onSearch,
    search,
    keyword,
    searchLocal,
    selectedRowKeys.length,
    showCreate,
    onCreate,
    createText,
    showPopover,
    onDelete,
    dataSource,
    showExport,
    csvFileName,
    csvData,
    columns
  ])

  return (
    <Table
      isStriped
      {...props}
      selectionMode={showCheckbox ? "multiple" : "none"}
      topContent={props.topContent ? props.topContent : renderTopContent()}
      topContentPlacement='outside'
      onSelectionChange={props.onSelectionChange ? props.onSelectionChange : onSelectChange}
      //@ts-ignore
      selectedKeys={props.selectedKeys ? props.selectedKeys : selectedRowKeys}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      bottomContent={
        showPagination && !!total && total > 1 ? (
          <div className='flex w-full justify-center'>
            <Pagination
              showControls
              size='sm'
              color='primary'
              page={page}
              total={total ?? 1}
              onChange={onChangePage}
              isDisabled={props.bodyProps?.isLoading}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key} allowsSorting={!!column.allowSorting}>
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} {...props.bodyProps} items={dataSourceState}>
        {(item: any) => (
          <TableRow key={item[rowKeyPattern]}>
            {(columnKey) => <TableCell>{RenderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default CustomTable
