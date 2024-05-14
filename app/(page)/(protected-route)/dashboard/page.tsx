"use client"
import { CloudinaryPlugin } from "@/_plugins"
import { Button } from "@nextui-org/react"
import React, { useState } from "react"

const Page = () => {
    const [visible, setVisible] = useState(false)
    return (
        <div className='min-h-screen rounded p-4 shadow'>
            <Button onPress={() => setVisible(true)}>Open Modal</Button>
            <CloudinaryPlugin
                visible={visible}
                onClose={() => setVisible(false)}
                assetTypes={["image", "video", "raw"]}
            />
        </div>
    )
}

export default Page
