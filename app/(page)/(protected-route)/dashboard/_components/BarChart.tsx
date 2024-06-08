import type { ChartData, ChartOptions } from "chart.js"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const defaultOptions: ChartOptions<"bar"> = {
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
  data: ChartData<"bar">
  options?: ChartOptions<"bar">
}

const BarChart = ({ data, options = defaultOptions }: Props) => {
  return <Bar data={data} options={options} />
}
export default BarChart
