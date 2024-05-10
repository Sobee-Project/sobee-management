"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { IDayOff, IStaff, IUser } from "@/_lib/interfaces"
import dynamic from "next/dynamic"
import { useState } from "react"
import { DayOffColumnKey, dayOffColumns } from "../_mock"
import RenderCellDayOff from "./RenderCellDayOff"

const DayOffFormModal = dynamic(() => import("./DayOffFormModal"), {
    ssr: false,
    loading: () => <ScreenLoader />
})

type Props = {
    data: IDayOff[]
    staffList: IUser<IStaff>[]
}

const DayOffListData = ({ data: dayOffList, staffList }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const onClickCreate = () => {
        setShowModal(true)
    }

    return (
        <div>
            <CustomTable
                dataSource={dayOffList || []}
                columns={dayOffColumns}
                RenderCell={(dayOff, columnKey) => <RenderCellDayOff dayOff={dayOff} columnKey={columnKey} />}
                searchKeys={["staff.name"] as DayOffColumnKey[]}
                searchPlaceholder='Search...'
                bodyProps={{
                    emptyContent: "No day off found"
                }}
                onClickCreate={onClickCreate}
                createText='Create new day off'
            />
            {showModal && (
                <DayOffFormModal visible={showModal} onClose={() => setShowModal(false)} staffList={staffList} />
            )}
        </div>
    )
}

export default DayOffListData
