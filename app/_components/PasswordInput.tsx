"use client"
import { Input, InputProps } from "@nextui-org/react"
import { Eye, EyeOff, LucideProps } from "lucide-react"
import React, { forwardRef, useCallback, useState } from "react"

type Props = InputProps

// eslint-disable-next-line react/display-name
const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const RenderShowPasswordIcon = useCallback(
        (props?: LucideProps) => {
            return showPassword ? (
                <EyeOff onClick={() => setShowPassword(false)} {...props} />
            ) : (
                <Eye onClick={() => setShowPassword(true)} {...props} />
            )
        },
        [showPassword]
    )

    return (
        <Input
            type={showPassword ? "text" : "password"}
            endContent={<RenderShowPasswordIcon size={20} className='cursor-pointer' />}
            {...props}
            ref={ref}
        />
    )
})

export default PasswordInput
