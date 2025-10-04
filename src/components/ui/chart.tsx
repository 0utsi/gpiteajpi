import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{ name: string; value: number; color?: string }>
  type?: "bar" | "line" | "pie"
  height?: number
  showLabels?: boolean
  showValues?: boolean
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, data, type = "bar", height = 300, showLabels = true, showValues = true, ...props }, ref) => {
    const maxValue = Math.max(...data.map((d) => d.value))

    const renderBarChart = () => (
      <div className="flex h-full items-end justify-between gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-1 flex-col items-center">
            {showValues && <span className="text-muted-foreground mb-1 text-xs">{item.value}</span>}
            <div
              className="w-full rounded-t transition-all duration-300 hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || `hsl(${index * 40}, 70%, 50%)`,
                minHeight: "4px",
              }}
            />
            {showLabels && <span className="text-muted-foreground mt-1 max-w-full truncate text-xs">{item.name}</span>}
          </div>
        ))}
      </div>
    )

    const renderLineChart = () => (
      <svg className="h-full w-full" viewBox="0 0 400 200">
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          points={data
            .map(
              (item, index) => `${(index / (data.length - 1)) * 380 + 10},${200 - (item.value / maxValue) * 180 + 10}`
            )
            .join(" ")}
        />
        {data.map((item, index) => (
          <g key={index}>
            <circle
              cx={(index / (data.length - 1)) * 380 + 10}
              cy={200 - (item.value / maxValue) * 180 + 10}
              r="4"
              fill="hsl(var(--primary))"
            />
            {showValues && (
              <text
                x={(index / (data.length - 1)) * 380 + 10}
                y={200 - (item.value / maxValue) * 180 - 10}
                textAnchor="middle"
                className="fill-muted-foreground text-xs"
              >
                {item.value}
              </text>
            )}
            {showLabels && (
              <text
                x={(index / (data.length - 1)) * 380 + 10}
                y="195"
                textAnchor="middle"
                className="fill-muted-foreground text-xs"
              >
                {item.name}
              </text>
            )}
          </g>
        ))}
      </svg>
    )

    const renderPieChart = () => {
      let cumulativePercentage = 0
      const radius = 80
      const centerX = 100
      const centerY = 100

      return (
        <svg className="h-full w-full" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100
            const startAngle = (cumulativePercentage / 100) * 360
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360

            const startAngleRad = (startAngle - 90) * (Math.PI / 180)
            const endAngleRad = (endAngle - 90) * (Math.PI / 180)

            const x1 = centerX + radius * Math.cos(startAngleRad)
            const y1 = centerY + radius * Math.sin(startAngleRad)
            const x2 = centerX + radius * Math.cos(endAngleRad)
            const y2 = centerY + radius * Math.sin(endAngleRad)

            const largeArcFlag = percentage > 50 ? 1 : 0

            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              "Z",
            ].join(" ")

            cumulativePercentage += percentage

            return (
              <path
                key={index}
                d={pathData}
                fill={item.color || `hsl(${index * 40}, 70%, 50%)`}
                className="transition-all duration-300 hover:opacity-80"
              />
            )
          })}
          {showValues &&
            data.map((item, index) => (
              <text
                key={`text-${index}`}
                x="100"
                y="100"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-xs font-medium"
              >
                {item.value}
              </text>
            ))}
        </svg>
      )
    }

    const renderChart = () => {
      switch (type) {
        case "line":
          return renderLineChart()
        case "pie":
          return renderPieChart()
        default:
          return renderBarChart()
      }
    }

    return (
      <div ref={ref} className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
        {renderChart()}
      </div>
    )
  }
)
Chart.displayName = "Chart"

export { Chart }
