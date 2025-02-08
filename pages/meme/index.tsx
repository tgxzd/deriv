"use client"

import { useState } from "react"
import { MetricsCard } from "@/components/metrics-card"

import { NavTabs } from "@/components/nav-tabs"
import { ActivityTable } from "@/components/activity-table"

type Period = "1d" | "7d" | "30d"
type Tab = 'activity'

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("7d")
  const [activeTab, setActiveTab] = useState<Tab>('activity')

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'activity':
        return <ActivityTable />
      default:
        return <div className="text-muted-foreground p-4">Content coming soon...</div>
    }
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <div className="w-full space-y-6 md:space-y-8">
          {/* Metrics Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="rounded-xl border bg-card p-4 md:p-6 shadow-sm transition-shadow hover:shadow-md">
              <MetricsCard period={selectedPeriod} onPeriodChange={setSelectedPeriod} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 md:gap-6">
             
                
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="border-t pt-4 md:pt-6">
              <NavTabs activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <div className="rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
