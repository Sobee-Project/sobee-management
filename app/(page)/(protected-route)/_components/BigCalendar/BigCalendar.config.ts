import format from "date-fns/format"
import getDay from "date-fns/getDay"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import { Event, Formats, Messages, ViewsProps, dateFnsLocalizer } from "react-big-calendar"

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {}
})

export const messages: Messages = {}
export const views: ViewsProps<Event, object> = ["day", "week", "month", "agenda"]

export const formats: Formats = {}
