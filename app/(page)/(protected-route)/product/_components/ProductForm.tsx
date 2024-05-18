"use client"
import { createProduct, updateProduct } from "@/_actions"
import { ScreenLoader } from "@/_components"
import { APP_ROUTES, DEFAULT_IMAGE } from "@/_constants"
import { EProductType } from "@/_lib/enums"
import {
    CreateProductFormSchema,
    UpdateProductFormSchema,
    createProductFormSchema,
    updateProductFormSchema
} from "@/_lib/form-schema"
import { IAttribute, IBrand, ICategory, IProduct, IVariant } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import titleize from "titleize"
import { BrandSelect } from "../../_components"
import VariantForm from "./VariantForm"

const CloudinaryPlugin = dynamic(() => import("@/_plugins").then((r) => r.CloudinaryPlugin), {
    ssr: false,
    loading: () => <ScreenLoader />
})

type Props = {
    type?: "new" | "edit"
    data?: IProduct
    attributes: IAttribute[]
    brands: IBrand[]
    categories: ICategory[]
}

const ProductForm = ({ type = "new", data, attributes, brands, categories }: Props) => {
    const isEdit = type === "edit"
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<CreateProductFormSchema | UpdateProductFormSchema>({
        resolver: zodResolver(isEdit ? updateProductFormSchema : createProductFormSchema),
        defaultValues: isEdit
            ? ({
                  ...data,
                  category: (data?.category as ICategory)._id,
                  brand: (data?.brand as IBrand)._id,
                  variants: data?.variants
              } as any)
            : {
                  thumbnail: DEFAULT_IMAGE,
                  isDraft: false,
                  type: EProductType.SIMPLE,
                  price: 0,
                  quantity: 0
              }
    })

    const router = useRouter()
    const params = useParams()
    const [showThumbnailPlugin, setShowThumbnailPlugin] = useState(false)
    const [variants, setVariants] = useState<IVariant[]>([])
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
    const [attributeValues, setAttributeValues] = useState<{ [key: string]: string[] }>({})

    useEffect(() => {
        if (data) {
            const variants = data.variants as IVariant[]
            const selectedAttributes = [
                ...new Set(
                    variants.flatMap((variant) => variant.attributeList.map((attr) => attr.attribute)) as string[]
                )
            ]
            setSelectedAttributes(selectedAttributes)

            const attributeValues = selectedAttributes.reduce(
                (acc, key) => {
                    const values = variants
                        .flatMap((variant) => variant.attributeList)
                        .filter((attr) => attr.attribute === key)
                        .map((attr) => attr.value)
                    return { ...acc, [key]: [...new Set(values)] }
                },
                {} as { [key: string]: string[] }
            )
            console.log(attributeValues)

            setAttributeValues(attributeValues)

            setVariants(variants)
        }
    }, [data])

    useEffect(() => {
        const totalQuantity = variants.reduce((acc, item) => acc + item.amount, 0)
        setValue("quantity", totalQuantity)
        setValue("variants", variants as any)
    }, [setValue, variants])

    const { execute, status } = useAction(isEdit ? updateProduct : createProduct, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
                router.push(APP_ROUTES.PRODUCTS.INDEX)
            } else {
                toast.error(data.message)
            }
        }
    })

    const isLoading = status === "executing"

    const onSubmit = (data: CreateProductFormSchema | UpdateProductFormSchema) => {
        const _data = isEdit
            ? ({ ...data, _id: params.id } as UpdateProductFormSchema)
            : (data as CreateProductFormSchema)
        execute(_data)
    }

    return (
        <div className='flex flex-wrap gap-8'>
            <div className='space-y-1'>
                <h3 className='font-semibold'>Information</h3>
                <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} your product information from here</p>
            </div>
            <div className='flex-1 rounded-md border bg-white p-8 shadow-lg'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                    <Input
                        {...register("name")}
                        label='Name'
                        labelPlacement='outside'
                        placeholder='Name of the product'
                        variant='bordered'
                        errorMessage={errors.name?.message}
                        isInvalid={!!errors.name}
                        isDisabled={isLoading}
                    />
                    <Input
                        {...register("displayPrice", {
                            valueAsNumber: true
                        })}
                        label='Display Price'
                        labelPlacement='outside'
                        placeholder='Price of the product'
                        variant='bordered'
                        errorMessage={errors.displayPrice?.message}
                        isInvalid={!!errors.displayPrice}
                        isDisabled={isLoading}
                        endContent='$'
                    />
                    <BrandSelect
                        {...register("brand")}
                        brandList={brands}
                        variant='bordered'
                        labelPlacement='outside'
                    />
                    <Select
                        {...register("category")}
                        label='Category'
                        labelPlacement='outside'
                        description='Select the category of the product'
                        placeholder='Select category'
                        variant='bordered'
                    >
                        {categories.map((category) => (
                            <SelectItem key={category._id!} value={category._id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Textarea
                        {...register("description")}
                        label='Description'
                        labelPlacement='outside'
                        placeholder='Description of the product'
                        variant='bordered'
                        errorMessage={errors.description?.message}
                        isInvalid={!!errors.description}
                        isDisabled={isLoading}
                        disableAutosize
                        disableAnimation
                        classNames={{
                            input: "resize-y min-h-20"
                        }}
                    />

                    <Checkbox {...register("isDraft")} isDisabled={isLoading}>
                        Draft
                    </Checkbox>

                    <div className='flex'>
                        <div className='w-1/3'>
                            <p className='mb-2 text-sm'>Thumbnail</p>
                            <Button color='primary' variant='bordered' onClick={() => setShowThumbnailPlugin(true)}>
                                Choose Thumbnail
                            </Button>
                        </div>
                        <div className='ml-4 w-2/3 '>
                            <div className='size-fit rounded border border-dashed p-4'>
                                <div className='relative'>
                                    <Image
                                        src={watch("thumbnail") as string}
                                        alt='coupon'
                                        objectFit='contain'
                                        width={400}
                                        height={300}
                                        className='rounded'
                                    />
                                </div>
                            </div>
                        </div>
                        {showThumbnailPlugin && (
                            <CloudinaryPlugin
                                visible={showThumbnailPlugin}
                                onClose={() => setShowThumbnailPlugin(false)}
                                onUploadSuccess={({ urls }) => setValue("thumbnail", urls[0])}
                                assetType='image'
                                multiple={false}
                                folder='image/product/thumbnail'
                            />
                        )}
                    </div>

                    <div className='flex flex-col gap-4'>
                        <Select
                            {...register("type")}
                            label='Type'
                            labelPlacement='outside'
                            description='Select the type of the product'
                            variant='bordered'
                            disallowEmptySelection
                        >
                            {Object.values(EProductType).map((item) => (
                                <SelectItem key={item} value={item}>
                                    {titleize(item)}
                                </SelectItem>
                            ))}
                        </Select>
                        {watch("type") === EProductType.VARIABLE && (
                            <VariantForm
                                variants={variants}
                                setVariants={setVariants}
                                attributes={attributes}
                                selectedAttributes={selectedAttributes}
                                setSelectedAttributes={setSelectedAttributes}
                                attributeValues={attributeValues}
                                setAttributeValues={setAttributeValues}
                            />
                        )}
                    </div>

                    <Input
                        {...register("quantity", {
                            valueAsNumber: true
                        })}
                        label='Quantity'
                        labelPlacement='outside'
                        placeholder='Quantity of the product'
                        variant='bordered'
                        errorMessage={errors.quantity?.message}
                        isInvalid={!!errors.quantity}
                        isDisabled={isLoading}
                        isReadOnly={watch("type") === EProductType.VARIABLE}
                        description={
                            watch("type") === EProductType.VARIABLE &&
                            "You cannot modify product quantity when the product type is variable. Quantity will be calculated based on the variants."
                        }
                        value={(watch("quantity") || 0).toString()}
                    />

                    <div className='flex flex-wrap gap-2'>
                        <Button
                            type='submit'
                            variant='solid'
                            color='primary'
                            isDisabled={isLoading}
                            isLoading={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
