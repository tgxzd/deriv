"use client"

import { userData } from "@/dummydata/user-data"

export function RecentPnLTable() {
  const allVaults = userData.flatMap(user => 
    user.vaultData.map(vault => ({
      ...vault,
      network: user.network
    }))
  ).sort((a, b) => {
    // Convert lastActive to minutes for sorting
    const getMinutes = (time: string) => {
      const num = parseInt(time)
      if (time.includes('h')) return num * 60
      return num
    }
    return getMinutes(a.lastActive) - getMinutes(b.lastActive)
  })

  return (
    <div className="rounded-lg border bg-background">
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b">
            <tr className="hover:bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Token/Last Active</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Unrealized</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Realized Profit</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Total Profit</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Balance USD</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Position</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Holding Duration</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Bought/Avg</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Sold/Avg</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">30D TXs</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {allVaults.map((vault, index) => (
              <tr key={`${vault.token}-${index}`} className="hover:bg-muted/50 border-b">
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="font-medium">{vault.token}</span>
                      <span className="text-xs text-muted-foreground">{vault.lastActive}</span>
                    </div>
                  </div>
                </td>
                <td className={`p-4 align-middle text-right ${vault.unrealized.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  <div className="text-right">
                    {vault.unrealized.value}
                    <br />
                    <span className="text-xs">
                      {vault.sellAll ? 'SELL ALL' : `(${vault.unrealized.percentage})`}
                    </span>
                  </div>
                </td>
                <td className={`p-4 align-middle text-right ${vault.realizedProfit.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {vault.realizedProfit.value}
                  <br />
                  <span className="text-xs">({vault.realizedProfit.percentage})</span>
                </td>
                <td className={`p-4 align-middle text-right ${vault.totalProfit.value.includes('-') ? 'text-red-500' : vault.totalProfit.value !== '$0' ? 'text-green-500' : ''}`}>
                  {vault.totalProfit.value}
                  <br />
                  <span className="text-xs">{vault.totalProfit.count || '--'}</span>
                </td>
                <td className="p-4 align-middle text-right">
                  {vault.balance !== '0%' ? vault.balance : '--'}
                </td>
                <td className="p-4 align-middle text-right">
                  {vault.position !== '0%' ? vault.position : '--'}
                </td>
                <td className="p-4 align-middle text-right">{vault.holdingDuration}</td>
                <td className="p-4 align-middle text-right">
                  {vault.bought.value}
                  <br />
                  <span className="text-xs">{vault.bought.avg}</span>
                </td>
                <td className="p-4 align-middle text-right">
                  {vault.sold.value}
                  <br />
                  <span className="text-xs">{vault.sold.avg}</span>
                </td>
                <td className="p-4 align-middle text-right">
                  <span className={vault.txs.buy > vault.txs.sell ? 'text-green-500' : 'text-red-500'}>
                    {vault.txs.buy}/{vault.txs.sell}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 