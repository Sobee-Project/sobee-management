"use client"
import { Button } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"

type Todo = {
    id: Date
    title: string
}

const Page = () => {
    const mutation = useMutation({
        mutationKey: ["todos", "create"],
        mutationFn: (newTodo: Todo) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("An error occurred"))
                }, 2000)
                setTimeout(() => {
                    resolve(newTodo)
                }, 3000)
            })
        }
    })
    return (
        <div className='flex min-h-screen items-center justify-center'>
            {mutation.isPending ? (
                "Adding todo..."
            ) : (
                <>
                    {mutation.isError ? <div>An error occurred: {mutation.error.message}</div> : null}

                    {mutation.isSuccess ? <div>Todo added!</div> : null}

                    <Button
                        onClick={() => {
                            mutation.mutate({ id: new Date(), title: "Do Laundry" })
                        }}
                    >
                        Create Todo
                    </Button>
                </>
            )}
        </div>
    )
}

export default Page
