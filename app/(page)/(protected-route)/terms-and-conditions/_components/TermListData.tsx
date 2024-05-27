"use client"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ITerm } from "@/_lib/interfaces"
import { useRouter } from "next/navigation"
import { termColumns } from "../_mock"
import RenderCellTerm from "./RenderCellTerm"

type Props = {
  data: ITerm[]
}

const TermListData = ({ data: termList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.TERMS_AND_CONDITIONS.NEW)
  }
  return (
    <CustomTable
      dataSource={termList || []}
      columns={termColumns}
      RenderCell={(term, columnKey) => <RenderCellTerm term={term} columnKey={columnKey} />}
      searchKeys={["name", "issued_by.name", "type"]}
      searchPlaceholder='Search TERMs...'
      bodyProps={{
        emptyContent: "No data found"
      }}
      csvData={termList}
      onClickCreate={onClickCreate}
      createText='Create new TERM'
    />
  )
}
export default TermListData
