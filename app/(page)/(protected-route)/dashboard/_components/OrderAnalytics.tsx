"use client"
import { fetchOrderAnalytics } from "@/_actions/analytics-action"
import { IOrderAnalyticData } from "@/_lib/interfaces"
import { getLocalTimeZone, today } from "@internationalized/date"
import { DateRangePicker, Spinner } from "@nextui-org/react"
import type { ChartData, ChartOptions } from "chart.js"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"

const BarChart = dynamic(() => import("./BarChart"), {
  ssr: false,
  loading: () => <Spinner />
})
const LineChart = dynamic(() => import("./LineChart"), {
  ssr: false,
  loading: () => <Spinner />
})

const barChartOptions: ChartOptions<"bar"> = {
  plugins: {
    title: {
      display: true,
      text: "Order Revenue Analytics"
    }
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
}

const lineChartOptions: ChartOptions<"line"> = {
  plugins: {
    title: {
      display: true,
      text: "Order Number Analytics"
    }
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
}

const OrderAnalytics = () => {
  const [barChartData, setBarChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: []
  })
  const [lineChartData, setLineChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: []
  })
  const [loading, setLoading] = useState(false)

  const [rangeDate, setRangeDate] = useState({
    start: today(getLocalTimeZone()).add({ days: -60 }),
    end: today(getLocalTimeZone())
  })

  const fetchOrderAnalyticsData = useCallback(async () => {
    const startDate = new Date(rangeDate.start.toDate(getLocalTimeZone())).toLocaleDateString()
    const endDate = new Date(rangeDate.end.toDate(getLocalTimeZone())).toLocaleDateString()
    setLoading(true)
    // fetch order analytics
    const res = await fetchOrderAnalytics(startDate, endDate)
    if (res.success) {
      const data = res.data!

      setBarChartData({
        labels: data.map((item: IOrderAnalyticData) => item.key),
        datasets: [
          {
            label: "Total Revenue",
            data: data.map((item: IOrderAnalyticData) => item.totalRevenue),
            backgroundColor: "#A0DEFF",
            borderRadius: 5,
            animation: {
              duration: 1000,
              easing: "easeInCirc"
            }
          }
        ]
      })

      setLineChartData({
        labels: data.map((item: IOrderAnalyticData) => item.key),
        datasets: [
          {
            label: "Total Orders",
            data: data.map((item: IOrderAnalyticData) => item.totalOrders),
            borderColor: "#A1DD70",
            fill: false,
            animation: {
              duration: 1000,
              easing: "easeInCirc"
            }
          }
        ]
      })
    }
    setLoading(false)
  }, [rangeDate.start, rangeDate.end])

  useEffect(() => {
    fetchOrderAnalyticsData()
  }, [fetchOrderAnalyticsData])
  return (
    <div className='size-full overflow-hidden rounded-lg border border-foreground-300 bg-white p-6 shadow-sm dark:bg-slate-200 md:p-7'>
      <div className='mb-5 flex items-center justify-between'>
        <h3 className='relative mt-1 text-lg font-semibold text-gray-800 before:absolute before:-left-6 before:-top-px before:h-7 before:w-1 before:rounded-r-md before:bg-primary-500 before:content-[""] dark:before:bg-primary-600 md:before:-left-6 md:before:-top-0.5 lg:before:h-8'>
          Order Analytics
        </h3>
        <div>
          <DateRangePicker value={rangeDate} onChange={setRangeDate} label='Range Order Date' isDisabled={loading} />
        </div>
      </div>
      <div className='flex flex-col flex-wrap lg:flex-row'>
        <div className='min-w-0 flex-1 p-3'>
          <BarChart data={barChartData} options={barChartOptions} />
        </div>
        <div className='min-w-0 flex-1 p-3'>
          <LineChart data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  )
}
export default OrderAnalytics
