import type { ChartData, ChartOptions } from "chart.js"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const defaultOptions: ChartOptions<"line"> = {
  plugins: {
    title: {
      display: true,
      text: "Chart Title"
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

type Props = {
  data: ChartData<"line">
  options?: ChartOptions<"line">
}

const LineChart = ({ data, options = defaultOptions }: Props) => {
  return <Line data={data} options={options} />
}
export default LineChart
