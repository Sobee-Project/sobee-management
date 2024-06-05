"use client"

import { Button } from "@nextui-org/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = theme === "light"

  const switchTheme = useCallback(() => {
    setTheme(isLight ? "dark" : "light")
  }, [isLight, setTheme])

  if (!mounted) return null

  return (
    <Button isIconOnly onPress={switchTheme} variant='light'>
      {isLight ? <Moon size={24} /> : <Sun size={24} />}
    </Button>
  )
}

export default ThemeSwitcher
