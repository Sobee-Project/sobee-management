import { fetchOrderById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ParamsProps } from "@/_lib/params"
import { redirect } from "next/navigation"
import StatusTracking from "./_components/StatusTracking"

const page = async ({ params }: ParamsProps) => {
  const orderRes = await fetchOrderById(params.id)
  const order = orderRes.data!
  return (
    <div>
      <StatusTracking status={order.status} />
    </div>
  )
}

export default page
