import { PropsWithChildren } from "react"

type ParamsProps = {
    params: { [key: string]: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

type LayoutParamsProps = {
    params?: any
} & PropsWithChildren

export type { LayoutParamsProps, ParamsProps }
