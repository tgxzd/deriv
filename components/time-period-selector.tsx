"use client"

import { type TimePeriod } from "@/lib/metrics-data"

interface TimePeriodSelectorProps {
  selected: TimePeriod
  onChange: (period: TimePeriod) => void
}

const periods: { value: TimePeriod; label: string }[] = [
  { value: "1d", label: "1d" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
]

export function TimePeriodSelector({ selected, onChange }: TimePeriodSelectorProps) {
  return (
    <div className="inline-flex rounded-md bg-muted p-1 text-muted-foreground">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            selected === period.value
              ? "bg-background text-foreground shadow-sm"
              : "hover:bg-background/50 hover:text-foreground"
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
} 