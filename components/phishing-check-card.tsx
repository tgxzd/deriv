"use client"

import { userMetricsData } from "@/dummydata/metrics-data"

type Period = "1d" | "7d" | "30d"

const periodMap: Record<Period, "1D" | "7D" | "30D"> = {
  "1d": "1D",
  "7d": "7D",
  "30d": "30D"
}

interface PhishingCheckCardProps {
  period: Period
}

export function PhishingCheckCard({ period }: PhishingCheckCardProps) {
  if (!userMetricsData || userMetricsData.length === 0) {
    return (
      <div className="rounded-lg bg-background border p-6 shadow-sm">
        <p className="text-center text-muted-foreground">Loading phishing check...</p>
      </div>
    )
  }

  const user = userMetricsData[0]
  const metrics = user.timePeriods[periodMap[period]]
  const { phishing } = metrics

  // Extract percentages from the format "X (Y%)"
  const getPercentage = (value: string) => {
    const match = value.match(/\(([\d.]+)%\)/)
    return match ? parseFloat(match[1]) : 0
  }

  return (
    <div className="rounded-lg bg-background border p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
          <path d="M12 12 2.2 12" />
          <path d="M12 12 5.9 4.9" />
        </svg>
        <h2 className="text-lg font-semibold">Phishing check</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Blacklist:</span>
            <span className="text-sm font-medium">{phishing.totalPnL}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-sm text-muted-foreground">Sold > Bought:</span>
            <span className="text-sm font-medium">{phishing.unrealizedProfits}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-sm text-muted-foreground">Didn't buy:</span>
            <span className="text-sm font-medium">{phishing.avgDuration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Buy/Sell within 10 secs:</span>
            <span className="text-sm font-medium">{phishing.totalCost}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 