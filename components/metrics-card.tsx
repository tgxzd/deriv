"use client";

import { type Dispatch, type SetStateAction } from "react";
import { userMetricsData } from "@/dummydata/metrics-data";
import { TimePeriodSelector } from "./time-period-selector";

type Period = "1d" | "7d" | "30d";

const periodMap: Record<Period, "1D" | "7D" | "30D"> = {
  "1d": "1D",
  "7d": "7D",
  "30d": "30D",
};

interface MetricsCardProps {
  data: {
    pnl: Record<Period, number>;
    volume: Record<Period, number>;
    winRate: Record<Period, number>;
    balance: number;
  };
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export function MetricsCard({
  data,
  period,
  onPeriodChange,
}: MetricsCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {["1d", "7d", "30d"].map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p as Period)}
              className={`px-3 py-1 rounded-full text-sm ${
                period === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Last {period} PnL</div>
          <div
            className={`text-xl font-semibold ${
              data.pnl[period] >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {data.pnl[period] >= 0 ? "+" : ""}
            {data.pnl[period]}%
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Volume</div>
          <div className="text-xl font-semibold">
            {data.volume[period]} @ SOL
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Win Rate</div>
          <div className="text-xl font-semibold">{data.winRate[period]}%</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Balance</div>
          <div className="text-xl font-semibold">{data.balance} SOL</div>
        </div>
      </div>
    </div>
  );
}
