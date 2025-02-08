"use client"

import { coinsData } from "@/dummydata/coins-data"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MessageSquare } from "lucide-react"

export function CoinsLeaderboard() {
  const formatChange = (value: number) => {
    if (value === 0) return "0%"
    return `${value > 0 ? '+' : ''}${value}%`
  }

  const getChangeColor = (value: number) => {
    if (value > 0) return "text-green-500"
    if (value < 0) return "text-red-500"
    return "text-muted-foreground"
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border/50">
            <th className="p-4 text-left text-sm font-medium text-muted-foreground">#</th>
            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Token</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">
              <div className="flex items-center justify-end gap-2">
                Age
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">
              <div className="flex items-center justify-end gap-2">
                Market Cap
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Price</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {coinsData.map((coin, index) => (
            <tr key={coin.id} className="group hover:bg-muted/50 transition-colors">
              <td className="p-4 text-sm text-muted-foreground">
                {index + 1}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-right text-sm">{coin.age}</td>
              <td className="p-4">
                <div className="text-right">
                  <div className="font-medium">{coin.marketCap.formatted}</div>
                  <div className={`text-xs ${getChangeColor(coin.marketCap.change)}`}>
                    {formatChange(coin.marketCap.change)}
                  </div>
                </div>
              </td>
              <td className="p-4 text-right font-medium">{coin.price.formatted}</td>
              <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 px-4">
                    Buy
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 