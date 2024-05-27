"use client"
import { StaffSelect } from "@/(page)/(protected-route)/_components"
import { createDayOff } from "@/_actions"
import { EDayOffStatus } from "@/_lib/enums"
import { CreateDayOffFormSchema, createDayOffFormSchema } from "@/_lib/form-schema"
import { IStaff, IUser } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea
} from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  staffList: IUser<IStaff>[]
  startDate?: Date
  endDate?: Date
  visible: boolean
  onClose: () => void
}

const DayOffFormModal = ({ staffList, endDate = new Date(), startDate = new Date(), visible, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<CreateDayOffFormSchema>({
    resolver: zodResolver(createDayOffFormSchema)
  })

  const [startHour, setStartHour] = useState({
    start: "",
    end: ""
  })
  const [endHour, setEndHour] = useState({
    start: "",
    end: ""
  })

  console.log(watch())

  useEffect(() => {
    const splittedStartTime = startDate.toISOString().split("T")
    const splittedEndTime = endDate.toISOString().split("T")
    setValue("startDate", splittedStartTime[0])
    setValue("endDate", splittedEndTime[0])

    setStartHour({
      start: splittedStartTime[1].slice(0, 5),
      end: splittedStartTime[1].slice(0, 5)
    })
    setEndHour({
      start: splittedEndTime[1].slice(0, 5),
      end: splittedEndTime[1].slice(0, 5)
    })
  }, [startDate, endDate, setValue])

  const _onClose = () => {
    onClose()
    reset()
  }

  const { execute, status } = useAction(createDayOff, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        _onClose()
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateDayOffFormSchema) => {
    if (!data.staff) {
      return toast.error("Please select staff")
    }
    data.startDate = `${data.startDate}T${startHour.start}`
    data.endDate = `${data.endDate}T${endHour.end}`

    execute(data)
  }

  return (
    <Modal isOpen={visible} onClose={_onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Add new day off</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex gap-4'>
                  <Input
                    {...register("startDate")}
                    label='Start date'
                    errorMessage={errors.startDate?.message}
                    isInvalid={!!errors.startDate}
                    type='date'
                    value={watch("startDate")}
                  />
                  <Input
                    label='Start hour'
                    type='time'
                    value={startHour.start}
                    onChange={(e) =>
                      setStartHour((prev) => ({
                        ...prev,
                        start: e.target.value
                      }))
                    }
                  />
                  <Input
                    label='End hour'
                    type='time'
                    value={startHour.end}
                    onChange={(e) =>
                      setStartHour((prev) => ({
                        ...prev,
                        end: e.target.value
                      }))
                    }
                  />
                </div>
                <div className='flex gap-4'>
                  <Input
                    {...register("endDate")}
                    label='End date'
                    errorMessage={errors.endDate?.message}
                    isInvalid={!!errors.endDate}
                    type='date'
                    value={watch("endDate")}
                  />
                  <Input
                    label='Start hour'
                    type='time'
                    value={endHour.start}
                    onChange={(e) => {
                      setEndHour((prev) => ({
                        ...prev,
                        start: e.target.value
                      }))
                    }}
                  />
                  <Input
                    label='End hour'
                    type='time'
                    value={endHour.end}
                    onChange={(e) => {
                      setEndHour((prev) => ({
                        ...prev,
                        end: e.target.value
                      }))
                    }}
                  />
                </div>
                <Textarea
                  {...register("reason")}
                  autoFocus
                  label='Reason'
                  errorMessage={errors.reason?.message}
                  isInvalid={!!errors.reason}
                  placeholder='Enter reason'
                />
                <StaffSelect
                  staffList={staffList}
                  {...register("staff")}
                  onSelectionChange={(e) => {
                    setValue("staff", Array.from(e)[0]?.toString())
                  }}
                />

                <Select
                  {...register("status")}
                  label='Status'
                  placeholder='Select status'
                  defaultSelectedKeys={[EDayOffStatus.PENDING]}
                >
                  {Object.values(EDayOffStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </Select>

                <div className='flex items-center gap-2'>
                  <Button type='submit' isLoading={isLoading} disabled={isLoading} color='primary'>
                    Submit
                  </Button>
                  <Button type='button' disabled={isLoading} variant='light' onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DayOffFormModal
