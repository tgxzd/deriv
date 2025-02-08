export interface MetricsData {
  pnl: {
    value: string;
    change: string;
    balance: string;
    isPositive: boolean;
    winRate: string;
  };
}

export interface UserMetricsData {
  address: string;
  network: 'SOL' | 'ETH';
  networkImage: string;
  balance: string;
  timePeriods: {
    "1D": MetricsData;
    "7D": MetricsData;
    "30D": MetricsData;
  };
}

export const userMetricsData: UserMetricsData[] = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "SOL",
    networkImage: "/solana.png",
    balance: "0.52 SOL",
    timePeriods: {
      "1D": {
        pnl: {
          value: "-1.2%",
          change: "650",
          balance: "$54,321",
          isPositive: false,
          winRate: "70%"
        }
      },
      "7D": {
        pnl: {
          value: "-2.1%",
          change: "1,340",
          balance: "$63,954",
          isPositive: false,
          winRate: "65%"
        }
      },
      "30D": {
        pnl: {
          value: "-3.5%",
          change: "5,240",
          balance: "$72,145",
          isPositive: false,
          winRate: "65%"
        }
      }
    }
  },
  
]; 