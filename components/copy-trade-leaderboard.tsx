"use client"

import { useState } from "react"
import { copyTradeData } from "@/dummydata/copytrade-data"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MessageSquare, Trophy, Copy, ChevronLeft, ChevronRight } from "lucide-react"
import { ForumDiscussion } from "./forum-discussion"

export function CopyTradeLeaderboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null)
  const itemsPerPage = 5
  const totalPages = Math.ceil(copyTradeData.length / itemsPerPage)

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toFixed(1)
  }

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return copyTradeData.slice(startIndex, endIndex)
  }

  return (
    <>
      <div className="w-full overflow-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Top Traders</h2>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  Wallet Address
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-right text-sm font-medium text-muted-foreground">1D PnL</th>
              <th className="p-4 text-right text-sm font-medium text-muted-foreground">7D PnL</th>
              <th className="p-4 text-right text-sm font-medium text-muted-foreground">30D PnL</th>
              <th className="p-4 text-right text-sm font-medium text-muted-foreground">Win Rate</th>
              <th className="p-4 text-right text-sm font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {getCurrentPageData().map((trader) => (
              <tr key={trader.id} className="group hover:bg-muted/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`font-medium ${getRankColor(trader.rank)}`}>
                      #{trader.rank}
                    </div>
                    <div>
                      <div className="font-medium">{trader.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{trader.walletAddress}</span>
                        <button className="hover:text-primary" onClick={() => navigator.clipboard.writeText(trader.walletAddress)}>
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`text-right ${trader.pnl["1d"].percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <div className="font-medium">{formatPercentage(trader.pnl["1d"].percentage)}</div>
                    <div className="text-xs opacity-80">${formatNumber(Math.abs(trader.pnl["1d"].value))}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`text-right ${trader.pnl["7d"].percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <div className="font-medium">{formatPercentage(trader.pnl["7d"].percentage)}</div>
                    <div className="text-xs opacity-80">${formatNumber(Math.abs(trader.pnl["7d"].value))}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`text-right ${trader.pnl["30d"].percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <div className="font-medium">{formatPercentage(trader.pnl["30d"].percentage)}</div>
                    <div className="text-xs opacity-80">${formatNumber(Math.abs(trader.pnl["30d"].value))}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-right font-medium">{trader.winRate}%</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="h-8 px-4">
                      Copy Trade
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => setSelectedTrader(trader.name)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, copyTradeData.length)} of {copyTradeData.length} traders
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Forum Discussion Modal */}
      <ForumDiscussion 
        isOpen={!!selectedTrader}
        onClose={() => setSelectedTrader(null)}
        traderName={selectedTrader || ""}
      />
    </>
  )
} 