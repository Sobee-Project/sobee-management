import { fetchAllRoles } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { PageHeader } from "../_components"
import { RoleListData } from "./_components"

const Page = async () => {
  const res = await fetchAllRoles()

  return (
    <div>
      <PageHeader title='Roles' keyCache={CACHE_KEY.ROLE.GET_ALL} />
      <RoleListData data={res.data!} />
    </div>
  )
}

export default Page
