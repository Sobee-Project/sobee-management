"use client"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ICustomer, IUser } from "@/_lib/interfaces"
import { useRouter } from "next/navigation"
import { CustomerColumnKey, customerColumns } from "../_mock"
import RenderCellCustomer from "./RenderCellCustomer"

type Props = {
  data: IUser<ICustomer>[]
}

const RoleListData = ({ data: customerList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.CUSTOMERS.NEW)
  }

  return (
    <div>
      <CustomTable
        dataSource={customerList || []}
        columns={customerColumns}
        RenderCell={(role, columnKey) => <RenderCellCustomer customer={role} columnKey={columnKey} />}
        searchKeys={["name", "phoneNumber", "email", "dateOfBirth", "role"] as CustomerColumnKey[]}
        searchPlaceholder='Search roles...'
        bodyProps={{
          emptyContent: "No roles found"
        }}
        onClickCreate={onClickCreate}
        createText='Create new customer'
      />
    </div>
  )
}

export default RoleListData
