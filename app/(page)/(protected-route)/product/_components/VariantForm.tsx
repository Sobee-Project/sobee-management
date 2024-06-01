import { ScreenLoader } from "@/_components"
import { cartesianProduct } from "@/_lib/_utils"
import { EProductSize } from "@/_lib/enums"
import { IVariant } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Accordion, AccordionItem, Button, Checkbox, CheckboxGroup, Input } from "@nextui-org/react"
import { Trash2 } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import React, { useCallback, useEffect, useMemo, useState } from "react"

const CloudinaryPlugin = dynamic(() => import("@/_plugins").then((r) => r.CloudinaryPlugin), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  displayPrice: number
  variants: IVariant[]
  setVariants: React.Dispatch<React.SetStateAction<IVariant[]>>
}

const VariantForm = ({ displayPrice, variants, setVariants }: Props) => {
  const [showAssetPlugin, setShowAssetPlugin] = useState<number | null>(null)

  const colors = useMemo(() => [...new Set(variants.map((variant) => variant.color))], [variants])

  const sizes = useMemo(() => [...new Set(variants.map((variant) => variant.size))], [variants])

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

  const onColorChange = (index: number, value: string) => {
    const newColors = [...colors]
    newColors[index] = value
    setTimeout(() => {
      cartesian(sizes, newColors)
    }, 200)
  }

  const increaseColorHex = (hex: string) => {
    const remvoveHash = hex.replace("#", "")
    const hexToDec = (hex: string) => parseInt(remvoveHash, 16)
    const decToHex = (dec: number) => dec.toString(16).padStart(6, "0")
    const dec = hexToDec(remvoveHash) + 1
    return "#" + decToHex(dec)
  }

  const onAddColor = () => {
    cartesian(sizes, [...colors, increaseColorHex(colors[colors.length - 1] || "#000000")])
  }

  const onRemoveColor = (index: number) => {
    const newColors = [...colors]
    newColors.splice(index, 1)
    cartesian(sizes, newColors)
  }

  const cartesian = useCallback(
    (_sizes: string[], _colors: string[]) => {
      const sizes = _sizes.length === 0 ? [EProductSize.M] : _sizes
      const colors = _colors.length === 0 ? ["#000000"] : _colors

      const _cartesian = cartesianProduct([sizes, colors])
      setVariants((prev) => {
        return _cartesian.map(([size, color]) => {
          return {
            size,
            color,
            price: displayPrice,
            amount: 0,
            assets: []
          }
        })
      })
    },
    [displayPrice, setVariants]
  )

  const onAddSize = (_sizes: string[]) => {
    console.log(_sizes)
    cartesian(_sizes, colors)
  }

  return (
    <div>
      <p className='mb-4 text-sm'>Add variants for the product. You can add multiple variants for the product.</p>
      <div className='my-4'>
        <div className='flex flex-col gap-2 rounded border p-2'>
          <p className='line-clamp-1 flex-1 text-sm'>Size values</p>
          <CheckboxGroup
            orientation='horizontal'
            classNames={{
              wrapper: "gap-4"
            }}
            onValueChange={onAddSize}
            value={sizes}
          >
            {Object.values(EProductSize).map((size) => (
              <Checkbox key={size} value={size}>
                {size}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className='my-2 flex flex-col gap-2 rounded border p-2'>
          <p className='line-clamp-1 flex-1 text-sm'>Color values</p>
          <div className='flex flex-wrap items-center gap-4'>
            {colors.map((color, index) => (
              <div key={index} className='flex items-center gap-2 rounded border p-1'>
                <input
                  type='color'
                  onChange={(e) => onColorChange(index, e.target.value)}
                  value={color}
                  className='rounded'
                />
                <span className='text-sm uppercase'>{color}</span>
                <Button isIconOnly color='danger' variant='light' size='sm' onPress={() => onRemoveColor(index)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button color='primary' variant='bordered' onPress={onAddColor}>
              Add color
            </Button>
          </div>
        </div>
      </div>
      {variants.length > 0 && (
        <Accordion variant='bordered' selectionMode='multiple'>
          {variants.map(({ amount, assets, price, color, size }, index) => {
            return (
              <AccordionItem
                key={index.toString()}
                title={
                  <div className='flex items-center gap-2'>
                    <div
                      className={cn(`h-4 w-8 rounded-full`)}
                      style={{
                        backgroundColor: color
                      }}
                    />
                    <p>{size}</p>
                  </div>
                }
                classNames={{
                  title: "text-sm font-medium"
                }}
              >
                <div key={index} className='p-2'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                      <Input
                        autoFocus
                        min={1}
                        label='Price'
                        placeholder='200'
                        endContent={"$"}
                        onValueChange={(e) => onVariantValueChange("price", index, e)}
                        value={price.toString()}
                      />
                      <Input
                        // type='number'
                        min={1}
                        label='Amount'
                        placeholder='5'
                        onValueChange={(e) => onVariantValueChange("amount", index, Number(e))}
                        value={amount.toString()}
                      />
                    </div>
                    <div className='my-2 flex items-center justify-between'>
                      <p className='text-sm'>Assets for variants</p>
                      <Button color='primary' variant='bordered' size='sm' onPress={() => setShowAssetPlugin(index)}>
                        Add asset
                      </Button>
                    </div>
                    <div className='grid gap-2 md:grid-cols-3'>
                      {(assets || []).map((asset, assetIndex) => (
                        <Image
                          key={asset}
                          src={asset}
                          alt='product'
                          width={100}
                          height={100}
                          className='size-40 rounded object-contain'
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
          onUploadSuccess={({ urls }) =>
            onVariantValueChange("assets", showAssetPlugin, [...(variants[showAssetPlugin]?.assets || []), ...urls])
          }
          assetType='image'
          folder='image/product/asset'
        />
      )}
    </div>
  )
}

export default VariantForm
