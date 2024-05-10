"use client"
import { BigCalendar } from "@/(page)/(protected-route)/_components"
import { ScreenLoader } from "@/_components"
import { IDayOff, IStaff, IUser } from "@/_lib/interfaces"
import dynamic from "next/dynamic"
import { useState } from "react"
import { Event, SlotInfo } from "react-big-calendar"
import toast from "react-hot-toast"
import DayOffItem from "./DayOffItem"

const DayOffFormModal = dynamic(() => import("./DayOffFormModal"), {
    ssr: false,
    loading: () => <ScreenLoader />
})

type Props = {
    dayOffs: IDayOff[]
    staff: IUser<IStaff>[]
}

const DayOffForm = ({ dayOffs, staff }: Props) => {
    const events: Event[] = dayOffs.map((dayOff) => ({
        title: (dayOff.staff as IUser).name,
        resource: dayOff,
        start: new Date(dayOff.startDate),
        end: new Date(dayOff.endDate)
    }))

    const [event, setEvent] = useState<Event | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [start, setStart] = useState<Date>(new Date())
    const [end, setEnd] = useState<Date>(new Date())

    const onSelectSlot = (slotInfo: SlotInfo) => {
        const { start, end } = slotInfo
        if (start < new Date()) return toast.error("Can not select past date")
        setStart(start)
        setEnd(end)
        setShowModal(true)
    }

    return (
        <div className='flex flex-col flex-wrap gap-8'>
            <div className='flex-1 rounded-2xl border bg-white p-4 shadow-sm'>
                <BigCalendar
                    views={["month", "week", "agenda"]}
                    defaultView='month'
                    events={event ? [...events, event] : events}
                    onSelectSlot={onSelectSlot}
                    components={{
                        month: {
                            event: ({ event }) => <DayOffItem event={event} />
                        },
                        week: {
                            event: ({ event }) => {
                                return <DayOffItem event={event} />
                            }
                        },
                        agenda: {
                            event: ({ event }) => <DayOffItem event={event} />
                        }
                    }}
                    step={30}
                    eventPropGetter={(event) => {
                        return {
                            style: {
                                padding: "0"
                            }
                        }
                    }}
                    style={{
                        height: "50vh"
                    }}
                    showAllEvents
                />
            </div>
            {showModal && (
                <DayOffFormModal
                    staffList={staff}
                    startDate={start}
                    endDate={end}
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

export default DayOffForm
