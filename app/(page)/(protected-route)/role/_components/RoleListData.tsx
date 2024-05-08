"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { useGetRoleListQuery } from "@/_services"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useState } from "react"
import { roleColumns } from "../_mock"
import RenderCellRole from "./RenderCellRole"

const CreateNewRoleModal = dynamic(() => import("./RoleModal"), {
    ssr: false,
    loading: () => <ScreenLoader />
})

const RoleListData = () => {
    const { isLoading, data: roleList } = useGetRoleListQuery()

    const [showCreateModal, setShowCreateModal] = useState(false)

    const onClickCreate = () => {
        setShowCreateModal(true)
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
                    isLoading,
                    loadingContent: <Spinner />,
                    emptyContent: isLoading ? <p></p> : "No roles found"
                }}
                onClickCreate={onClickCreate}
            />
            {showCreateModal && (
                <CreateNewRoleModal
                    modalProps={{
                        isOpen: showCreateModal,
                        onClose: () => setShowCreateModal(false)
                    }}
                />
            )}
        </div>
    )
}

export default RoleListData
