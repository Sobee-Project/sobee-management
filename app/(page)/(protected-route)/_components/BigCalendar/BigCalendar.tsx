"use client"
import { Calendar, CalendarProps } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { formats, localizer, messages, views } from "./BigCalendar.config"

const BigCalendar = (props: Partial<CalendarProps>) => {
    return (
        <Calendar
            localizer={localizer}
            formats={formats}
            defaultView='month'
            views={views}
            timeslots={2}
            selectable
            messages={messages}
            style={{
                height: props.style?.height ?? 500,
                ...props.style
            }}
            scrollToTime={new Date()}
            {...props}
        />
    )
}

export default BigCalendar
