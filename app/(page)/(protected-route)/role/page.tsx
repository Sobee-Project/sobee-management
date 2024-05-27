import { fetchAllRoles } from "@/_actions"
import { RoleListData } from "./_components"

const Page = async () => {
  const res = await fetchAllRoles()

  return (
    <div>
      <RoleListData data={res.data!} />
    </div>
  )
}

export default Page
