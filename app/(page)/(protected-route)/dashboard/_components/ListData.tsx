import { getUserInfoFromCookie } from "@/_utils/storage"
import { cookies } from "next/headers"

const ListData = () => {
    const userInfo = getUserInfoFromCookie(cookies)
    if (!userInfo) return <div>Not found</div>
    return <div className=''>{userInfo.name}</div>
}

export default ListData
