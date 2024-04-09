import { CustomTable } from "@/_components"
import { useRoleStore } from "@/_store"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useState } from "react"
import { ScreenLoader } from "../../_components"
import { roleColumns } from "../_mock"
import RenderCellRole from "./RenderCellRole"

const CreateNewRoleModal = dynamic(() => import("./RoleModal"), {
    ssr: false,
    loading: () => <ScreenLoader />
})

type Props = {
    isLoading: boolean
}

const RoleListData = ({ isLoading }: Props) => {
    const { roleList } = useRoleStore()

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showPopover, setShowPopover] = useState(false)

    const onClickCreate = () => {
        setShowCreateModal(true)
    }

    const onDelete = () => {
        setShowPopover(true)
    }
    return (
        <div>
            <CustomTable
                dataSource={roleList}
                columns={roleColumns}
                RenderCell={(role, columnKey) => <RenderCellRole role={role} columnKey={columnKey} />}
                searchKeys={["role_name"]}
                csvData={roleList.map((role) => ({
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
