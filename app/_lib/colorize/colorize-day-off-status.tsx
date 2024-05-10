import { EDayOffStatus } from "../enums"

const colorizeDayOffStatus = (status: EDayOffStatus | string, type: "text" | "bg" = "text") => {
    switch (status) {
        case EDayOffStatus.PENDING:
            return type === "text" ? `text-yellow-500` : `bg-yellow-500`
        case EDayOffStatus.ACCEPTED:
            return type === "text" ? `text-green-500` : `bg-green-500`
        case EDayOffStatus.REJECTED:
            return type === "text" ? `text-red-500` : `bg-red-500`
        default:
            return type === "text" ? `text-slate-500` : `bg-slate-500`
    }
}

export { colorizeDayOffStatus }
