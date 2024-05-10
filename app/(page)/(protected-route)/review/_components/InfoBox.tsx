"use client"

import { LucideIcon } from "lucide-react"
import SpringsNumber from "../../_components/animation/SpringsNumber"

interface Props {
    value: number
    label?: string
    Icon: LucideIcon
    suffix?: "%" | "$" | "K" | "M" | "B" | ""
}

const InfoBox = ({ Icon, label = "All", value, suffix = "" }: Props) => {
    return (
        <div className='flex flex-col justify-center bg-white p-6 shadow-medium md:items-center'>
            <div className={`badge-icon badge-icon--sm bg-white`}>
                <Icon size={24} />
            </div>
            <div className='mb-4 mt-3'>
                <SpringsNumber to={value} />
                <span className='text-xs'>{suffix}</span>
            </div>
            <h6>
                {label}
                <span className='4xl:inline xl:hidden'> Customers</span>
            </h6>
        </div>
    )
}
export default InfoBox
