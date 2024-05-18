import { ScreenLoader } from "@/_components"
import { cartesianProduct } from "@/_lib/_utils"
import { IAttribute, IAttributeWithValue, IVariant } from "@/_lib/interfaces"
import { Accordion, AccordionItem, Button, Input, Select, SelectItem } from "@nextui-org/react"
import { PlusIcon, Trash2Icon } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import React, { useCallback, useEffect, useMemo, useState } from "react"

const CloudinaryPlugin = dynamic(() => import("@/_plugins").then((r) => r.CloudinaryPlugin), {
    ssr: false,
    loading: () => <ScreenLoader />
})

type Props = {
    attributes: IAttribute[]
    variants: IVariant[]
    setVariants: React.Dispatch<React.SetStateAction<IVariant[]>>
    selectedAttributes: string[]
    setSelectedAttributes: React.Dispatch<React.SetStateAction<string[]>>
    attributeValues: Record<string, string[]>
    setAttributeValues: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

const VariantForm = ({
    attributes,
    variants,
    setVariants,
    attributeValues,
    selectedAttributes,
    setAttributeValues,
    setSelectedAttributes
}: Props) => {
    const [showAssetPlugin, setShowAssetPlugin] = useState<number | null>(null)

    useEffect(() => {}, [])

    const getAttributeFromId = useCallback(
        (id: string) => attributes.find((attribute) => attribute._id === id),
        [attributes]
    )

    const onResetVariant = useCallback(() => {
        if (variants.length > 0) setVariants([])
    }, [variants, setVariants])

    const onAttributesChange = (value: string[]) => {
        const last = value[value.length - 1]
        setSelectedAttributes(value)
        onAddAttributeValue(last)
    }

    const onRemoveAttribute = (attribute: string) => {
        onResetVariant()
        setSelectedAttributes((prev) => prev.filter((v) => v !== attribute))
    }

    useEffect(() => {
        const attributeValuesKeys = Object.keys(attributeValues)
        if (attributeValuesKeys.length > 0) {
            // find not exist key in selectedAttributes and remove it from attributeValues
            const notExistKeys = attributeValuesKeys.filter((key) => !selectedAttributes.includes(key))
            if (notExistKeys.length > 0) {
                setAttributeValues((prev) => {
                    const newValues = { ...prev }
                    notExistKeys.forEach((key) => {
                        delete newValues[key]
                    })
                    return newValues
                })
            }
        }
    }, [attributeValues, selectedAttributes, setAttributeValues])

    const onAddAttributeValue = (attribute: string) => {
        onResetVariant()
        setAttributeValues((prev) => ({
            ...prev,
            [attribute]: [...(prev[attribute] || []), ""]
        }))
    }

    const onRemoveValueOfAttributeInAttributeValues = (attribute: string, index: number) => {
        onResetVariant()

        setAttributeValues((prev) => {
            const newList = [...(prev[attribute] || [])]
            newList.splice(index, 1)
            return {
                ...prev,
                [attribute]: newList
            }
        })
    }

    const onAttributeValuesChange = (attribute: string, index: number, value: string) => {
        onResetVariant()

        setAttributeValues((prev) => {
            const newList = [...(prev[attribute] || [])]
            newList[index] = value
            return {
                ...prev,
                [attribute]: newList
            }
        })
    }

    const canRenderAddVariantValues = useMemo(() => {
        return (
            selectedAttributes.length > 0 &&
            Object.keys(attributeValues).length === selectedAttributes.length &&
            Object.values(attributeValues).every((v) => v.every((val) => val.length > 0))
        )
    }, [attributeValues, selectedAttributes.length])

    const generateVariant = useCallback(() => {
        const tempValuesMatrix = [] as IAttributeWithValue[][]

        for (const attribute of selectedAttributes) {
            const values = attributeValues[attribute]
            tempValuesMatrix.push(
                values.map((v) => ({
                    attribute,
                    value: v
                }))
            )
        }

        const cartesian = cartesianProduct(tempValuesMatrix)

        setVariants(
            cartesian.map((values) => ({
                amount: 0,
                attributeList: values,
                assets: [],
                price: 0
            }))
        )
    }, [attributeValues, selectedAttributes, setVariants])

    const onVariantValueChange = (key: keyof IVariant, index: number, value: any) => {
        setVariants((prev) => {
            const newVariants = [...prev]
            newVariants[index] = {
                ...newVariants[index],
                [key]: value
            }
            return newVariants
        })
    }

    return (
        <div>
            <p className='mb-4 text-sm'>Add variants for the product. You can add multiple variants for the product.</p>
            <Select
                selectionMode='multiple'
                items={attributes}
                label='Attributes'
                placeholder='Select attributes'
                onSelectionChange={(v) => onAttributesChange(Array.from(v) as string[])}
                selectedKeys={selectedAttributes}
            >
                {(item) => (
                    <SelectItem key={item._id!} value={item._id}>
                        {item.name}
                    </SelectItem>
                )}
            </Select>
            <div className='my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                {selectedAttributes.map((attribute, index) => (
                    <div key={attribute} className='flex flex-col gap-2 rounded border p-2'>
                        <div className='flex items-center justify-between'>
                            <p className='line-clamp-1 flex-1 text-sm'>{getAttributeFromId(attribute)?.name} values</p>
                            <Button
                                color='danger'
                                size='sm'
                                variant='light'
                                onPress={() => onRemoveAttribute(attribute)}
                            >
                                Remove
                            </Button>
                        </div>
                        {attributeValues[attribute]?.map((value, valIndex) => (
                            <div key={valIndex} className='flex gap-2'>
                                <Input
                                    autoFocus
                                    placeholder={`#${valIndex + 1}`}
                                    value={value}
                                    onValueChange={(e) => onAttributeValuesChange(attribute, valIndex, e)}
                                />
                                <Button
                                    color='danger'
                                    isIconOnly
                                    size='sm'
                                    variant='light'
                                    onPress={() => onRemoveValueOfAttributeInAttributeValues(attribute, valIndex)}
                                >
                                    <Trash2Icon size={16} />
                                </Button>
                            </div>
                        ))}
                        <div className='flex justify-center gap-2'>
                            <Button
                                color='default'
                                variant='flat'
                                size='sm'
                                isIconOnly
                                onPress={() => onAddAttributeValue(attribute)}
                            >
                                <PlusIcon size={16} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            {canRenderAddVariantValues && variants.length === 0 && (
                <Button onPress={generateVariant}>Generate variants</Button>
            )}
            {variants.length > 0 && (
                <Accordion variant='bordered' selectionMode='multiple'>
                    {variants.map(({ amount, attributeList, assets, price }, index) => {
                        const variantTitle = attributeList.map(({ value }) => value).join("/")
                        return (
                            <AccordionItem
                                key={index.toString()}
                                title={variantTitle}
                                classNames={{
                                    title: "text-sm font-medium"
                                }}
                            >
                                <div key={index} className='p-2'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex gap-2'>
                                            <Input
                                                autoFocus
                                                type='number'
                                                min={1}
                                                label='Price'
                                                placeholder='200'
                                                endContent={"$"}
                                                onValueChange={(e) => onVariantValueChange("price", index, Number(e))}
                                                value={price.toString()}
                                            />
                                            <Input
                                                type='number'
                                                min={1}
                                                label='Amount'
                                                placeholder='5'
                                                onValueChange={(e) => onVariantValueChange("amount", index, Number(e))}
                                                value={amount.toString()}
                                            />
                                        </div>
                                        <div className='my-2 flex items-center justify-between'>
                                            <p className='text-sm'>Assets for variants</p>
                                            <Button
                                                color='primary'
                                                variant='bordered'
                                                size='sm'
                                                onPress={() => setShowAssetPlugin(index)}
                                            >
                                                Add asset
                                            </Button>
                                        </div>
                                        <div className='flex flex-wrap gap-2'>
                                            {(assets || []).map((asset, assetIndex) => (
                                                <Image
                                                    key={asset}
                                                    src={asset}
                                                    alt='product'
                                                    width={100}
                                                    height={100}
                                                    className='rounded'
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            )}

            {showAssetPlugin !== null && (
                <CloudinaryPlugin
                    visible={showAssetPlugin !== null}
                    onClose={() => setShowAssetPlugin(null)}
                    onUploadSuccess={({ urls }) => onVariantValueChange("assets", showAssetPlugin, urls)}
                    assetType='image'
                    folder='image/product/asset'
                />
            )}
        </div>
    )
}

export default VariantForm
