import { fetchAllAttributes } from "@/_actions"
import { AttributeListData } from "./_components"

const page = async () => {
    const res = await fetchAllAttributes()
    return (
        <div>
            <AttributeListData data={res.data!} />
        </div>
    )
}

export default page
