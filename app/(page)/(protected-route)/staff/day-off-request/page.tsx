import { fetchAllDayOffs, fetchAllStaff } from "@/_actions"
import { DayOffForm, DayOffListData } from "./_components"

const page = async () => {
    const res = await fetchAllDayOffs()
    const data = res.data!
    const staffRes = await fetchAllStaff()
    const staffData = staffRes.data!

    return (
        <div className='space-y-6'>
            <DayOffForm dayOffs={data} staff={staffData} />
            <DayOffListData data={data} staffList={staffData} />
        </div>
    )
}

export default page
