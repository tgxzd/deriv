"use client"

import { userMetricsData } from "@/dummydata/metrics-data"

type Period = "1d" | "7d" | "30d"

const periodMap: Record<Period, "1D" | "7D" | "30D"> = {
  "1d": "1D",
  "7d": "7D",
  "30d": "30D"
}

interface DistributionCardProps {
  period: Period
}

export function DistributionCard({ period }: DistributionCardProps) {
  if (!userMetricsData || userMetricsData.length === 0) {
    return (
      <div className="rounded-lg bg-background border p-3 md:p-6 shadow-sm">
        <p className="text-center text-muted-foreground">Loading distribution...</p>
      </div>
    )
  }

  const user = userMetricsData[0]
  const metrics = user.timePeriods[periodMap[period]]
  const { distribution } = metrics

  return (
    <div className="rounded-lg bg-background border p-3 md:p-6 shadow-sm space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold">Distribution ({distribution.total})</h2>
      </div>
      
      <div className="space-y-2">
        {distribution.ranges.map((range, index) => (
          <div key={range.range} className="space-y-1">
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5 min-w-[60px]">
                <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${range.isPositive ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="truncate">{range.range}</span>
              </span>
              <span className={`text-xs md:text-sm font-medium ${range.isPositive ? 'text-green-500' : 'text-red-500'} whitespace-nowrap`}>
                {range.count} ({range.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${range.isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${range.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 