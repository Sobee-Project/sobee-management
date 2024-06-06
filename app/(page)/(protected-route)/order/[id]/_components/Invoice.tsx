"use client"
import { CUSTOMER_ROUTES } from "@/_constants"
import { formatCurrency } from "@/_lib/_utils"
import { IAddress, IOrder, IOrderItem, IProduct, IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Avatar, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import React, { forwardRef } from "react"

type Props = {
  order: IOrder
}

// eslint-disable-next-line react/display-name
const Invoice = forwardRef<HTMLDivElement, Props>(({ order }, ref) => {
  const orderItems = order.orderItems as IOrderItem[]
  const address = order.shippingAddress as IAddress
  const customer = order.customer as IUser

  const addressString = [address.specificAddress, address.district, address.ward, address.city, address.country]
    .filter(Boolean)
    .join(", ")
  return (
    <div ref={ref}>
      <div className={cn("flex gap-8", "flex-col")}>
        <Table
          topContent={
            <div className='mb-20'>
              <div className='mb-20'>
                <h1 className='mb-2 text-4xl font-bold'>Invoice No: {order.orderGeneratedId}</h1>
                <cite>{format(order.createdAt?.toString()!, "EEEE MMMM, yyyy 'at' HH:mm")}</cite>
              </div>
              <div className='mt-4 flex gap-8'>
                <div className='flex-1 space-y-2'>
                  <p className='text-lg font-semibold'>Order Details</p>
                  <Divider />
                  <div className='space-y-1 text-foreground-500'>
                    <p>Ordered at: {format(order.createdAt?.toString()!, "dd/MM/yyyy 'at' HH:mm")}</p>
                    <p>{orderItems.length} Items</p>
                    <p>Payment Method: {order.paymentMethod?.toString()}</p>
                  </div>
                </div>
                <div className='flex-1 space-y-2 text-right'>
                  <p className='text-lg font-semibold'>Shipping Address</p>
                  <Divider />
                  <div className='space-y-1 text-foreground-500'>
                    <p>{addressString}</p>
                    <p>{customer.name}</p>
                    <p>{order.phoneNumber}</p>
                    <p>{order.emailAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          }
          classNames={{
            base: "border rounded"
          }}
          shadow='none'
          isStriped
          bottomContent={
            <div className='flex justify-end'>
              <div className='flex w-full justify-between border-t pt-4 sm:max-w-80'>
                <div>
                  <p className='text-foreground-500'>Subtotal:</p>
                  <p className='text-foreground-500'>Shipping Fee:</p>
                  <p className='text-foreground-500'>Tax Fee:</p>
                  <p className='text-lg font-semibold'>Total:</p>
                </div>
                <div>
                  <p className='text-foreground-500'>
                    {formatCurrency(orderItems.reduce((acc, item) => acc + item.subTotal, 0))}
                  </p>
                  <p className='text-foreground-500'>{formatCurrency(order.shippingFee)}</p>
                  <p className='text-foreground-500'>{formatCurrency(order.taxFee)}</p>
                  <p className='text-lg font-semibold'>{formatCurrency(order.total)}</p>
                </div>
              </div>
            </div>
          }
        >
          <TableHeader>
            <TableColumn>Product</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Subtotal</TableColumn>
            <TableColumn>Discount</TableColumn>
            <TableColumn>Total</TableColumn>
          </TableHeader>
          <TableBody>
            {orderItems.map((orderItem, index) => {
              const product = orderItem.product as IProduct
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className='flex gap-4'>
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={60}
                        height={60}
                        className='size-10 rounded border bg-white object-contain'
                      />
                      <Link target='_blank' href={CUSTOMER_ROUTES.PRODUCTS.ID.replace(":id", product.slug!)}>
                        {product.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(orderItem.price)}</TableCell>
                  <TableCell>{orderItem.amount}</TableCell>
                  <TableCell>
                    {formatCurrency(orderItem.price * orderItem.amount - product.discount! * orderItem.price)}
                  </TableCell>
                  <TableCell>{formatCurrency(product.discount! * orderItem.price)}</TableCell>
                  <TableCell>{formatCurrency(orderItem.subTotal)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
})

export default Invoice
