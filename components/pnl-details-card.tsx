"use client"

import { userMetricsData } from "@/dummydata/metrics-data"

type Period = "1d" | "7d" | "30d"

const periodMap: Record<Period, "1D" | "7D" | "30D"> = {
  "1d": "1D",
  "7d": "7D",
  "30d": "30D"
}

interface PnLDetailsCardProps {
  period: Period
}

export function PnLDetailsCard({ period }: PnLDetailsCardProps) {
  if (!userMetricsData || userMetricsData.length === 0) {
    return (
      <div className="rounded-lg bg-background border p-3 md:p-6 shadow-sm">
        <p className="text-center text-muted-foreground">Loading details...</p>
      </div>
    )
  }

  const user = userMetricsData[0]
  const metrics = user.timePeriods[periodMap[period]]
  const isPnlPositive = metrics.pnl.isPositive

  const getValueColor = (value: string) => {
    if (value.includes("+")) return "text-green-500"
    if (value.includes("-")) return "text-red-500"
    return ""
  }

  return (
    <div className="rounded-lg bg-background border p-3 md:p-6 shadow-sm space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold">PnL</h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          {period.toUpperCase()} TXs {metrics.transactions.value}
        </p>
      </div>
      
      <div className="space-y-2 md:space-y-3">
        <div className="flex justify-between items-center gap-4">
          <span className="text-xs md:text-sm text-muted-foreground min-w-[80px]">Total PnL</span>
          <span className={`text-xs md:text-sm font-medium ${getValueColor(metrics.transactions.totalPnL)} truncate`}>
            {metrics.transactions.totalPnL}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-xs md:text-sm text-muted-foreground min-w-[80px]">Unrealized</span>
          <span className={`text-xs md:text-sm font-medium ${getValueColor(metrics.transactions.unrealizedProfits)} truncate`}>
            {metrics.transactions.unrealizedProfits}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-xs md:text-sm text-muted-foreground min-w-[80px]">Avg Duration</span>
          <span className="text-xs md:text-sm font-medium truncate">
            {metrics.transactions.avgDuration}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-xs md:text-sm text-muted-foreground min-w-[80px]">Total Cost</span>
          <span className="text-xs md:text-sm font-medium truncate">
            {metrics.transactions.totalCost}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-xs md:text-sm text-muted-foreground min-w-[80px]">Avg Cost</span>
          <span className="text-xs md:text-sm font-medium truncate">
            {metrics.transactions.tokenAvgCost}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-xs md:text-sm text-muted-foreground min-w-[80px]">Avg Profit</span>
          <span className={`text-xs md:text-sm font-medium ${getValueColor(metrics.transactions.tokenAvgProfit)} truncate`}>
            {metrics.transactions.tokenAvgProfit}
          </span>
        </div>
      </div>
    </div>
  )
} 