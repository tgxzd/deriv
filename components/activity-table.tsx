"use client"

import { activityData } from "@/dummydata/activity-data"
import Image from "next/image"

export function ActivityTable() {
  const getTypeColor = (type: 'Buy' | 'Sell') => {
    return type === 'Buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border/50">
            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Type</th>
            <th className="p-4 text-left text-sm font-medium text-muted-foreground">Token</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Total USD</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Amount</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Price</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Profit</th>
            <th className="p-4 text-right text-sm font-medium text-muted-foreground">Age</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {activityData.map((activity) => (
            <tr key={activity.id} className="group hover:bg-muted/50 transition-colors">
              <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                  {activity.type}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  
                  <div>
                    
                    <div className="text-xs text-muted-foreground">{activity.token.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-right font-medium">{activity.total}</td>
              <td className="p-4 text-right font-medium">{activity.amount}</td>
              <td className="p-4 text-right font-medium">{activity.price}</td>
              <td className="p-4 text-right">
                {activity.profit && (
                  <span className={activity.profit.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                    {activity.profit}
                  </span>
                )}
                {!activity.profit && (
                  <span className="text-muted-foreground">--</span>
                )}
              </td>
              <td className="p-4 text-right text-muted-foreground">{activity.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 