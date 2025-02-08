"use client"


import { CopyTradeLeaderboard } from "@/components/copy-trade-leaderboard"

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <div className="rounded-lg border bg-card">
          <CopyTradeLeaderboard />
        </div>
      </div>
    </div>
  )
}
