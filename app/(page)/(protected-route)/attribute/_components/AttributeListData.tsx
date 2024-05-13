"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IAttribute } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { attributeColumns } from "../_mock"
import RenderCellAttribute from "./RenderCellAttribute"

type Props = {
    data: IAttribute[]
}

const AttributeListData = ({ data: attributeList }: Props) => {
    const router = useRouter()

    const onClickCreate = () => {
        router.push(APP_ROUTES.CATEGORIES.NEW)
    }

    return (
        <div>
            <CustomTable
                dataSource={attributeList || []}
                columns={attributeColumns}
                RenderCell={(attribute, columnKey) => (
                    <RenderCellAttribute attribute={attribute} columnKey={columnKey} />
                )}
                searchKeys={["name"] as (keyof IAttribute)[]}
                searchPlaceholder='Search attributees...'
                bodyProps={{
                    emptyContent: "No attributees found"
                }}
                onClickCreate={onClickCreate}
                createText='Create new attribute'
            />
        </div>
    )
}

export default AttributeListData
