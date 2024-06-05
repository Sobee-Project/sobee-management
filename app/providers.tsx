"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        {children}
        <Toaster />
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default Provider
