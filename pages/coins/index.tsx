"use client"

import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"
import { CoinsLeaderboard } from "@/components/coins-leaderboard"

export default function CoinsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Coins</h1>
        </div>
        <Button variant="outline">View All</Button>
      </div>
      <div className="rounded-lg border bg-card">
        <CoinsLeaderboard />
      </div>
    </div>
  )
}
