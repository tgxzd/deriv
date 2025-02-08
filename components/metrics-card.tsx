"use client"

import { type Dispatch, type SetStateAction } from "react"
import { userMetricsData } from "@/dummydata/metrics-data"
import { TimePeriodSelector } from "./time-period-selector"

type Period = "1d" | "7d" | "30d"

const periodMap: Record<Period, "1D" | "7D" | "30D"> = {
  "1d": "1D",
  "7d": "7D",
  "30d": "30D"
}

interface MetricsCardProps {
  period: Period
  onPeriodChange: Dispatch<SetStateAction<Period>>
}

export function MetricsCard({ period, onPeriodChange }: MetricsCardProps) {
  if (!userMetricsData || userMetricsData.length === 0) {
    return (
      <div className="rounded-lg bg-background border p-3 md:p-6 shadow-sm">
        <p className="text-center text-muted-foreground">Loading metrics...</p>
      </div>
    )
  }

  const user = userMetricsData[0]
  const metrics = user.timePeriods[periodMap[period]]
  const isPnlPositive = metrics.pnl.isPositive

  return (
    <div className="space-y-3 w-full max-w-full md:space-y-4">
      <div className="flex justify-end px-1">
        <TimePeriodSelector
          selected={period}
          onChange={onPeriodChange}
        />
      </div>
      <div className="rounded-lg bg-background border p-3 md:p-6 shadow-sm">
        <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          <div className="w-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-1.5 md:mb-2">
              Last {period.toUpperCase()} PnL
            </h3>
            <div className="space-y-0.5 md:space-y-1">
              <p className={`text-xl md:text-4xl font-bold tracking-tight ${isPnlPositive ? 'text-green-500' : 'text-red-500'}`}>
                {metrics.pnl.value}
              </p>
              <p className={`text-sm md:text-lg ${isPnlPositive ? 'text-green-500' : 'text-red-500'}`}>
                {metrics.pnl.change} @ {user.network}
              </p>
            </div>
          </div>
          
          <div className="w-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-1.5 md:mb-2">Win Rate</h3>
            <div className="space-y-0.5 md:space-y-1">
              <p className="text-xl md:text-4xl font-bold tracking-tight">
                {metrics.pnl.winRate}
              </p>
              <p className="text-sm md:text-lg text-muted-foreground">
                Bal: {user.balance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 