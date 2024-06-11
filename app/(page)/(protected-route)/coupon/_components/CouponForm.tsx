"use client"
import { createCoupon, fetchPublishedProducts, updateCoupon } from "@/_actions"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES, DEFAULT_COUPON_IMAGE, DEFAULT_IMAGE } from "@/_constants"
import { ECouponApplyType, ECouponType } from "@/_lib/enums"
import {
  CreateCouponFormSchema,
  UpdateCouponFormSchema,
  createCouponFormSchema,
  updateCouponFormSchema
} from "@/_lib/form-schema"
import { ICategory, ICoupon, IPaginate, IProduct } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Input, Radio, RadioGroup, Selection, Spinner } from "@nextui-org/react"
import { format } from "date-fns"
import { Search } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Key, useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDebounce } from "use-debounce"
import { ProductColumnKey, productColumns } from "../_mock"
import RenderCellProduct from "./RenderCellProduct"
const CloudinaryPlugin = dynamic(() => import("@/_plugins").then((r) => r.CloudinaryPlugin), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  type?: "new" | "edit"
  data?: ICoupon
}

const CouponForm = ({ type = "new", data }: Props) => {
  const isEdit = type === "edit"
  const [showPlugin, setShowPlugin] = useState(false)
  const router = useRouter()
  const params = useParams()

  const [products, setProducts] = useState<IProduct[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })
  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])

  const fetchNext = useCallback(async (page: number, query: any = {}) => {
    setIsFetching(true)
    const res = await fetchPublishedProducts({ page, ...query })
    if (res.success) {
      setProducts(res.data!)
      setPaginationRes(res)
    }
    setIsFetching(false)
  }, [])

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCouponFormSchema | UpdateCouponFormSchema>({
    resolver: zodResolver(isEdit ? updateCouponFormSchema : createCouponFormSchema),
    defaultValues: isEdit
      ? {
          ...data,
          applyTo: data?.applyTo as ECouponApplyType,
          type: data?.type as ECouponType,
          productApply: data?.productApply as string[],
          startDate: format(new Date(data?.startDate as string), "yyyy-MM-dd"),
          endDate: format(new Date(data?.endDate as string), "yyyy-MM-dd")
        }
      : {
          image: DEFAULT_COUPON_IMAGE,
          type: ECouponType.FIXED,
          applyTo: ECouponApplyType.ALL,
          startDate: format(new Date(), "yyyy-MM-dd"),
          endDate: format(new Date(), "yyyy-MM-dd")
        }
  })

  useEffect(() => {
    setValue(
      "productApply",
      selectedKeys.map((key) => key as string)
    )
  }, [selectedKeys, setValue])

  useEffect(() => {
    if (data?.productApply) {
      setSelectedKeys(data.productApply as Key[])
    }
  }, [data?.productApply])

  const { execute, status } = useAction(isEdit ? updateCoupon : createCoupon, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        router.push(APP_ROUTES.COUPONS.INDEX)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateCouponFormSchema | UpdateCouponFormSchema) => {
    const _data = isEdit ? ({ ...data, _id: params.id } as UpdateCouponFormSchema) : (data as CreateCouponFormSchema)
    execute(_data)
  }

  const onSelectChange = useCallback(
    (selectedRowKeys: Selection) => {
      if (selectedRowKeys === "all") {
        setSelectedKeys(products.map((item: IProduct) => item._id!))
        return
      }
      setSelectedKeys(Array.from(selectedRowKeys))
    },
    [products]
  )

  useEffect(() => {
    fetchNext(1, { keyword: debouncedKeyword })
  }, [debouncedKeyword, fetchNext])

  return (
    <div className='flex flex-wrap gap-8'>
      <div className='space-y-1'>
        <h3 className='font-semibold'>Information</h3>
        <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} coupon information from here</p>
      </div>
      <div className='flex-1 rounded-md border bg-background p-8 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex'>
            <div className='w-1/3'>
              <p className='mb-2 text-sm'>Image</p>
              <Button color='primary' variant='bordered' onClick={() => setShowPlugin(true)}>
                Choose Image
              </Button>
            </div>
            <div className='ml-4 w-2/3 '>
              <div className='size-fit border border-dashed p-4'>
                <div className='relative '>
                  <Image src={watch("image") as string} alt='coupon' objectFit='contain' width={400} height={300} />
                </div>
              </div>
            </div>
            {showPlugin && (
              <CloudinaryPlugin
                visible={showPlugin}
                onClose={() => setShowPlugin(false)}
                onUploadSuccess={({ urls }) => setValue("image", urls[0])}
                assetType='image'
                multiple={false}
                folder='/image/coupon'
              />
            )}
          </div>
          <Input
            {...register("code")}
            label='Code'
            labelPlacement='outside'
            placeholder='COUPON-CODE'
            variant='bordered'
            errorMessage={errors.code?.message}
            isInvalid={!!errors.code}
            isDisabled={isLoading}
          />
          <RadioGroup
            {...(register("type"),
            {
              value: watch("type"),
              onValueChange: (value) => setValue("type", value)
            })}
            label='Select coupon type'
            errorMessage={errors.type?.message}
            isDisabled={isLoading}
          >
            {Object.values(ECouponType).map((type) => (
              <Radio key={type} value={type}>
                {type}
              </Radio>
            ))}
          </RadioGroup>
          <Input
            {...register("discountValue", { valueAsNumber: true })}
            label='Discount Value'
            labelPlacement='outside'
            placeholder='0'
            type='number'
            variant='bordered'
            errorMessage={errors.discountValue?.message}
            isInvalid={!!errors.discountValue}
            isDisabled={isLoading}
          />
          <Input
            {...register("minOrderValue", { valueAsNumber: true })}
            label='Min Order Value'
            labelPlacement='outside'
            placeholder='0'
            type='number'
            variant='bordered'
            errorMessage={errors.minOrderValue?.message}
            isInvalid={!!errors.minOrderValue}
            isDisabled={isLoading}
          />
          <Input
            {...register("usageLimit", { valueAsNumber: true })}
            label='Usage Limit'
            labelPlacement='outside'
            placeholder='0'
            type='number'
            variant='bordered'
            errorMessage={errors.minOrderValue?.message}
            isInvalid={!!errors.minOrderValue}
            isDisabled={isLoading}
          />
          <div className='flex gap-8'>
            <Input
              {...register("startDate")}
              label='Start Date'
              labelPlacement='outside'
              type='date'
              variant='bordered'
              errorMessage={errors.startDate?.message}
              isInvalid={!!errors.startDate}
              isDisabled={isLoading}
            />
            <Input
              {...register("endDate")}
              label='End Date'
              labelPlacement='outside'
              type='date'
              variant='bordered'
              errorMessage={errors.endDate?.message}
              isInvalid={!!errors.endDate}
              isDisabled={isLoading}
            />
          </div>
          <RadioGroup
            label='Select coupon apply type'
            {...(register("applyTo"),
            {
              value: watch("applyTo"),
              onValueChange: (value) => setValue("applyTo", value)
            })}
            errorMessage={errors.type?.message}
            isDisabled={isLoading}
          >
            {Object.values(ECouponApplyType).map((type) => (
              <Radio key={type} value={type}>
                {type}
              </Radio>
            ))}
          </RadioGroup>

          <Divider />
          {selectedKeys.length > 0 &&
            products
              .filter((v) => selectedKeys.includes(v._id!))
              .map((product) => {
                const category = product.category as ICategory
                return (
                  <div
                    key={product._id}
                    className='flex items-center justify-between rounded-md border border-foreground-300 p-2'
                  >
                    <div className='flex gap-2'>
                      <Image
                        src={product.thumbnail || DEFAULT_IMAGE}
                        alt={product.name}
                        width={50}
                        height={50}
                        className='hidden overflow-hidden bg-white object-contain md:block'
                      />
                      <div>
                        <p className='line-clamp-1'>{product.name}</p>
                        <p className='line-clamp-1 text-sm text-slate-500'>{category.name}</p>
                      </div>
                    </div>
                    <Button
                      color='danger'
                      variant='bordered'
                      onClick={() => setSelectedKeys(selectedKeys.filter((key) => key !== product._id))}
                    >
                      Remove
                    </Button>
                  </div>
                )
              })}
          {selectedKeys.length > 0 && <Divider />}
          {watch("applyTo") === ECouponApplyType.SPECIFIC && (
            <CustomTable
              RenderCell={(product, columnKey) => <RenderCellProduct product={product} columnKey={columnKey} />}
              columns={productColumns}
              dataSource={products}
              searchKeys={["name"] as ProductColumnKey[]}
              searchPlaceholder='Search products...'
              bodyProps={{
                emptyContent: "No products found",
                isLoading: isFetching,
                loadingContent: <Spinner />
              }}
              onSelectionChange={onSelectChange}
              //@ts-ignore
              selectedKeys={selectedKeys}
              topContent={
                <div className='flex space-x-2'>
                  <Input
                    className='flex-1'
                    placeholder='Search products...'
                    variant='bordered'
                    endContent={<Search size={20} />}
                    onValueChange={onChangeKeyword}
                    value={keyword}
                  />
                </div>
              }
              pagination={{
                page: paginationRes.page,
                total: paginationRes.total,
                onChangePage: fetchNext
              }}
              showExport={false}
              showCreate={false}
            />
          )}
          <div className='flex flex-wrap gap-2'>
            <Button type='submit' variant='solid' color='primary' isDisabled={isLoading} isLoading={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CouponForm
