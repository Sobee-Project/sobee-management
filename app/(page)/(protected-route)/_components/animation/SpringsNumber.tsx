"use client"
import { cn } from "@/_lib/utils"
import { ClassValue } from "clsx"
import { motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

type Props = {
    from?: number
    to: number
    speed?: number
    duration?: number
    className?: ClassValue
    suffix?: string
}

const SpringsNumber = ({ from = 0, to, speed = 0.02, duration = 1, className, suffix }: Props) => {
    const [displayedValue, setDisplayedValue] = useState<number>(from)
    const nodeRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const node = nodeRef.current
        if (!node) return

        const controls = {
            start: from,
            end: to,
            duration: 1,
            onUpdate(value: number) {
                setDisplayedValue(Number(value.toFixed(0)))
            }
        }

        controls.start = from
        controls.end = to

        const countUp = () => {
            controls.start += (controls.end - controls.start) * speed
            controls.onUpdate(controls.start)
            if (controls.start < controls.end) {
                requestAnimationFrame(countUp)
            }
        }

        requestAnimationFrame(countUp)
    }, [from, to, speed])

    return (
        <motion.p
            ref={nodeRef}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration }}
            className={cn("text-2xl font-semibold", className)}
        >
            {displayedValue + (suffix ? suffix : "")}
        </motion.p>
    )
}

export default SpringsNumber
