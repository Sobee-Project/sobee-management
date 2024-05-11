"use client"
import { CustomTable } from "@/_components"
import { EProductStatus } from "@/_lib/enums"
import { IReview } from "@/_lib/interfaces"
import { reviewColumn } from "../_mock"
import RenderCellReview from "./RenderCellReview"

type Props = {
    data: IReview[]
}

const ReviewListData = ({ data: reviewList }: Props) => {
    return (
        <div>
            <CustomTable
                dataSource={reviewList || []}
                columns={reviewColumn}
                RenderCell={(review, columnKey) => <RenderCellReview review={review} columnKey={columnKey} />}
                searchKeys={["product", "customer", "title", "content"]}
                searchPlaceholder='Search reviews...'
                bodyProps={{
                    emptyContent: "No data found"
                }}
                csvData={reviewList}
                showCreate={false}
            />
        </div>
    )
}
export default ReviewListData
