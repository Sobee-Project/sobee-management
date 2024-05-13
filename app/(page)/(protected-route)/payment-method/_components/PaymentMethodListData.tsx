"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IPaymentMethod } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { paymentMethodColumns } from "../_mock"
import RenderCellPaymentMethod from "./RenderCellPaymentMethod"

type Props = {
    data: IPaymentMethod[]
}

const PaymentMethodListData = ({ data: paymentMethodList }: Props) => {
    const router = useRouter()

    const onClickCreate = () => {
        router.push(APP_ROUTES.PAYMENT_METHODS.NEW)
    }

    return (
        <div>
            <CustomTable
                dataSource={paymentMethodList || []}
                columns={paymentMethodColumns}
                RenderCell={(paymentMethod, columnKey) => (
                    <RenderCellPaymentMethod paymentMethod={paymentMethod} columnKey={columnKey} />
                )}
                searchKeys={["name", "country", "city", "state", "zip"]}
                searchPlaceholder='Search payment methods...'
                bodyProps={{
                    emptyContent: "No payment methods found"
                }}
                onClickCreate={onClickCreate}
                createText='Create new payment method'
            />
        </div>
    )
}

export default PaymentMethodListData
