"use client"
import {
    Button,
    Input,
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
        createText = "Create"
    } = props
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
    const [dataSourceState, setDataSourceState] = useState<T[]>(dataSource)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [showPopover, setShowPopover] = useState(false)
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "",
        direction: "ascending"
    })

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

    const onSearch = useCallback(
        (value: string) => {
            setSearchKeyword(value)
            if (value === "") {
                onReset()
                return
            }
            const res = dataSource.filter((item: any) => {
                return searchKeys?.some((key) => {
                    return item[key]?.toLowerCase()?.includes(value.toLowerCase())
                })
            })
            setDataSourceState(res)
        },
        [dataSource, onReset, searchKeys]
    )

    const onSortChange = useCallback(
        (_sortDescriptor: SortDescriptor) => {
            setSortDescriptor(_sortDescriptor)
            const sortedData = [...dataSource].sort((a: any, b: any) => {
                if (_sortDescriptor.direction === "ascending") {
                    // @ts-ignore
                    return a[_sortDescriptor.column] > b[_sortDescriptor.column] ? 1 : -1
                } else {
                    // @ts-ignore
                    return a[_sortDescriptor.column] < b[_sortDescriptor.column] ? 1 : -1
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
                    value={searchKeyword}
                />
                {selectedRowKeys.length === 0 ? (
                    showCreate && (
                        <Button color='primary' startContent={<Plus size={18} />} onClick={onCreate}>
                            {createText}
                        </Button>
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

                {dataSource.length > 0 && (
                    <CSVLink
                        filename={csvFileName?.includes(".csv") ? csvFileName : csvFileName + ".csv"}
                        data={(csvData ?? dataSource) as any}
                    >
                        <Button startContent={<Download size={14} />} onClick={onClickExport}>
                            Export
                        </Button>
                    </CSVLink>
                )}
            </div>
        )
    }, [
        csvData,
        csvFileName,
        dataSource,
        onCreate,
        onDelete,
        onSearch,
        searchKeyword,
        searchPlaceholder,
        selectedRowKeys.length,
        showCreate,
        showPopover
    ])

    return (
        <Table
            {...props}
            selectionMode={showCheckbox ? "multiple" : "none"}
            topContent={renderTopContent()}
            onSelectionChange={onSelectChange}
            //@ts-ignore
            selectedKeys={selectedRowKeys}
            sortDescriptor={sortDescriptor}
            onSortChange={onSortChange}
            // bottomContent={
            //     <div className='flex w-full justify-center'>
            //         <Pagination
            //             loop
            //             showControls
            //             showShadow
            //             color='secondary'
            //             page={1}
            //             total={10}
            //             // onChange={(page) => setPage(page)}
            //         />
            //     </div>
            // }
        >
            <TableHeader>
                {columns.map((column, index) => (
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
