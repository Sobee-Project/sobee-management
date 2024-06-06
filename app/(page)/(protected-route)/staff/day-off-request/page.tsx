import { fetchAllDayOffs, fetchAllStaff } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { PageHeader } from "../../_components"
import { DayOffForm, DayOffListData } from "./_components"

const page = async () => {
  const res = await fetchAllDayOffs()
  const data = res.data!
  const staffRes = await fetchAllStaff()
  const staffData = staffRes.data!

  return (
    <div className='space-y-6'>
      <PageHeader title='Day off requests' keyCache={CACHE_KEY.DAY_OFF.GET_ALL} />
      <DayOffForm dayOffs={data} staff={staffData} />
      <DayOffListData data={data} staffList={staffData} />
    </div>
  )
}

export default page
