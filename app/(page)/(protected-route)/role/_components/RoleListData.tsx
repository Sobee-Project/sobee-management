"use client"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IRole } from "@/_lib/interfaces"
import { useRouter } from "next/navigation"
import { roleColumns } from "../_mock"
import RenderCellRole from "./RenderCellRole"

type Props = {
  data: IRole[]
}

const RoleListData = ({ data: roleList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.ROLES.NEW)
  }

  return (
    <div>
      <CustomTable
        dataSource={roleList || []}
        columns={roleColumns}
        RenderCell={(role, columnKey) => <RenderCellRole role={role} columnKey={columnKey} />}
        searchKeys={["role_name"]}
        csvData={roleList?.map((role) => ({
          ...role,
          grant_lists: role.grant_lists.map((grant) => `${grant.resource} (${grant.actions.join(", ")})`)
        }))}
        searchPlaceholder='Search roles...'
        bodyProps={{
          emptyContent: "No roles found"
        }}
        onClickCreate={onClickCreate}
        createText='Create new role'
        showPagination={false}
      />
    </div>
  )
}

export default RoleListData
