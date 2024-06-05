"use client"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IRole, IStaff, IUser } from "@/_lib/interfaces"
import { useRouter } from "next/navigation"
import { StaffColumnKey, staffColumns } from "../_mock"
import RenderCellStaff from "./RenderCellStaff"

type Props = {
  data: IUser<IStaff>[]
}

const RoleListData = ({ data: staffList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.STAFF.NEW)
  }

  return (
    <div>
      <CustomTable
        dataSource={staffList || []}
        columns={staffColumns}
        RenderCell={(role, columnKey) => <RenderCellStaff staff={role} columnKey={columnKey} />}
        searchKeys={["name", "phoneNumber", "email", "dateOfBirth", "role"] as StaffColumnKey[]}
        searchPlaceholder='Search roles...'
        bodyProps={{
          emptyContent: "No roles found"
        }}
        onClickCreate={onClickCreate}
        createText='Create new staff'
        showPagination={false}
      />
    </div>
  )
}

export default RoleListData
