"use client"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IProduct } from "@/_lib/interfaces"
import { useRouter } from "next/navigation"
import { ProductColumnKey, productColumns } from "../_mock"
import RenderCellProduct from "./RenderCellProduct"

type Props = {
    data: IProduct[]
}

const AttributeListData = ({ data: products }: Props) => {
    const router = useRouter()

    const onClickCreate = () => {
        router.push(APP_ROUTES.PRODUCTS.NEW)
    }

    return (
        <div>
            <CustomTable
                dataSource={products || []}
                columns={productColumns}
                RenderCell={(product, columnKey) => <RenderCellProduct product={product} columnKey={columnKey} />}
                searchKeys={["name"] as ProductColumnKey[]}
                searchPlaceholder='Search products...'
                bodyProps={{
                    emptyContent: "No products found"
                }}
                onClickCreate={onClickCreate}
                createText='Create new product'
            />
        </div>
    )
}

export default AttributeListData
