"use client"
import { ENV_CONFIG } from "@/_constants"
import { useTest } from "@/_services"
import { Button } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import React from "react"

const ListData = () => {
    const { data, isError, isLoading, error, isPaused, isStale } = useTest()
    const queryClient = useQueryClient()

    console.log({ data, error })

    if (isLoading)
        return (
            <div>
                <p>loading...</p>
                <Button
                    onClick={() =>
                        queryClient.cancelQueries({
                            queryKey: ["test"]
                        })
                    }
                >
                    Cancel request
                </Button>
            </div>
        )
    if (isError) return <div>{JSON.stringify(error)}</div>
    if (isPaused || isStale) return <div>Paused</div>

    return <div className=''></div>
}

export default ListData
