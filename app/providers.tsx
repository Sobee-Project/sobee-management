"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"
import { SocketProvider } from "./_context"

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <SocketProvider>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          {children}
          <Toaster />
        </NextThemesProvider>
      </NextUIProvider>
    </SocketProvider>
  )
}

export default Provider
