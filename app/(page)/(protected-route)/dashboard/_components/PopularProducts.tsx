"use client"
import RatingStars from "@/_components/RatingStars"
import { formatCurrency } from "@/_lib/_utils"
import { EProductType } from "@/_lib/enums"
import { IBrand, ICategory, IProduct } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Avatar, Card, CardBody, CardHeader, Chip } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useMemo } from "react"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { NoDataFound } from "./icons"

const ProductCard = ({ product }: { product: IProduct }) => {
  const brand = product.brand ? (product.brand as IBrand) : null
  const category = product.category as ICategory

  const quantity = 1

  const calculateDiscount = useCallback(
    (price: number = 0) => {
      const discount = product.discount || 0
      return price - (price * discount) / 100
    },
    [product.discount]
  )

  const discountPrice = useMemo(() => {
    return product.type === EProductType.SIMPLE
      ? [calculateDiscount(product.displayPrice)]
      : [calculateDiscount(product.minPrice), calculateDiscount(product.maxPrice)]
  }, [calculateDiscount, product.displayPrice, product.maxPrice, product.minPrice, product.type])

  const renderDiscountPrice = useCallback(() => {
    return discountPrice.map((v) => formatCurrency(v * quantity)).join(" - ")
  }, [discountPrice, quantity])

  const renderPrice = useCallback(() => {
    return (
      product.type === EProductType.SIMPLE ? [product.displayPrice] : [product.minPrice || 0, product.maxPrice || 0]
    )
      .map((v) => formatCurrency(v * quantity))
      .join(" - ")
  }, [product.displayPrice, product.maxPrice, product.minPrice, product.type, quantity])
  return (
    <Card className='h-full min-w-60 pb-8 transition-transform hover:scale-[1.008]' shadow='sm'>
      <CardHeader className='relative'>
        {product.isDiscount && (
          <Chip className='absolute right-0 top-0 z-[2]' radius='md' color='danger' size='lg'>
            <span className=''>Discount {(product.discount || 0) * 100}%</span>
          </Chip>
        )}

        <Image
          src={product.thumbnail}
          alt={product.name}
          width={400}
          height={400}
          className='h-60 w-full rounded-md bg-white object-contain'
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <Link
            // href={APP_ROUTES.PRODUCTS.ID.replace(":id", product.slug!)}
            href={""}
            className='min-h-14 w-fit text-foreground transition-colors hover:text-primary'
          >
            <h3 className='line-clamp-2 text-xl font-semibold' title={product.name}>
              {product.name}
            </h3>
          </Link>
          <Link
            // href={APP_ROUTES.CATEGORIES.ID.replace(":id", category._id!)}
            href={""}
            className='w-fit text-slate-400 transition-colors hover:text-slate-200'
          >
            #{category.name}
          </Link>
          {brand && (
            <Link
              //   href={APP_ROUTES.BRANDS.ID.replace(":id", brand._id!)}
              href={""}
              className='flex w-fit items-center gap-2 text-sm'
            >
              <Avatar src={brand.logo} size='sm' />
              <span className='w-fit text-base text-primary-400 transition-colors hover:text-primary-100'>
                {brand.name}
              </span>
            </Link>
          )}
          <div className='mt-2 flex items-center gap-2'>
            <RatingStars initialRating={product.ratingValue || 0} starClassName='' readOnly />
            <p className='text-sm text-gray-400 dark:text-gray-600'>{product.ratingValue || 0}</p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              ({product.ratingCount} rating{(product.ratingCount || 0) > 1 ? "s" : ""})
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <h4
            className={cn(
              "line-clamp-1 flex-1",
              product.isDiscount ? "text-lg text-gray-400 line-through" : "text-3xl font-medium text-primary"
            )}
          >
            {renderPrice()}
          </h4>
          {product.isDiscount && <h4 className=' flex-1 text-3xl font-medium text-primary'>{renderDiscountPrice()}</h4>}
        </div>
      </CardBody>
    </Card>
  )
}

const PopularProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className='h-fit overflow-hidden rounded-lg border border-foreground-300 p-6  md:p-7 lg:col-span-1 lg:col-start-1 lg:row-start-5 2xl:col-span-5 2xl:col-start-auto 2xl:row-start-auto 2xl:me-20'>
      <div className='mb-5 flex items-center justify-between'>
        <h3 className='relative mt-1 text-lg font-semibold  before:absolute before:-left-6 before:-top-px before:h-7 before:w-1 before:rounded-r-md before:bg-primary-500 before:content-[""] dark:before:bg-primary-600 md:before:-left-6 md:before:-top-0.5 lg:before:h-8'>
          Top 10 Popular Products
        </h3>
      </div>
      {products.length === 0 ? (
        <div className='flex h-[calc(100%-60px)] items-center justify-center'>
          <div className='flex flex-col items-center py-7'>
            <NoDataFound className='w-52' />
            <div className='mb-1 pt-6 text-base font-semibold '>No data found</div>
            <p className='text-[13px]'>Sorry we couldn’t found any data</p>
          </div>
        </div>
      ) : (
        <div className='px-20'>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            grid={{
              rows: 1
            }}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true
            }}
            loop
            pagination={{
              clickable: true,
              bulletClass: "dark:bg-white swiper-pagination-bullet",
              bulletActiveClass: "dark:bg-primary-400 swiper-pagination-bullet-active"
            }}
            modules={[Pagination, Autoplay]}
            className='relative size-full'
          >
            {products.map((product) => (
              <SwiperSlide key={product._id} className='px-4 pb-10 pt-4'>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}
export default PopularProducts
