"use client"

import { NextUIProvider } from "@nextui-org/react"
import { PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster />
    </>
  )
}

export default Provider
