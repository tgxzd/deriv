export interface MetricsData {
  pnl: {
    value: string;
    change: string;
    balance: string;
    isPositive: boolean;
    winRate: string;
  };
  transactions: {
    value: string;
    totalPnL: string;
    unrealizedProfits: string;
    avgDuration: string;
    totalCost: string;
    tokenAvgCost: string;
    tokenAvgProfit: string;
  };
  distribution: {
    total: number;
    ranges: {
      range: string;
      count: number;
      percentage: number;
      isPositive: boolean;
    }[];
  };
  phishing: {
    totalPnL: string;
    unrealizedProfits: string;
    avgDuration: string;
    totalCost: string;
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
        },
        transactions: {
          value: "245/89",
          totalPnL: "$0 (--)",
          unrealizedProfits: "-$10.5",
          avgDuration: "30m",
          totalCost: "$3,251.25",
          tokenAvgCost: "$45.83",
          tokenAvgProfit: "-$0.001"
        },
        distribution: {
          total: 50,
          ranges: [
            { range: ">500%", count: 0, percentage: 0, isPositive: true },
            { range: "200% ~ 500%", count: 0, percentage: 0, isPositive: true },
            { range: "0% ~ 200%", count: 27, percentage: 54, isPositive: true },
            { range: "0% ~ -50%", count: 22, percentage: 44, isPositive: false },
            { range: "<-50%", count: 1, percentage: 2, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "1 (2%)",
          totalCost: "0 (0%)"
        }
      },
      "7D": {
        pnl: {
          value: "-2.1%",
          change: "1,340",
          balance: "$63,954",
          isPositive: false,
          winRate: "65%"
        },
        transactions: {
          value: "1,751/487",
          totalPnL: "$0 (--)",
          unrealizedProfits: "-$20.9",
          avgDuration: "1h",
          totalCost: "$7,351.75",
          tokenAvgCost: "$66.83",
          tokenAvgProfit: "-$0.002"
        },
        distribution: {
          total: 110,
          ranges: [
            { range: ">500%", count: 0, percentage: 0, isPositive: true },
            { range: "200% ~ 500%", count: 0, percentage: 0, isPositive: true },
            { range: "0% ~ 200%", count: 57, percentage: 51.82, isPositive: true },
            { range: "0% ~ -50%", count: 52, percentage: 47.27, isPositive: false },
            { range: "<-50%", count: 1, percentage: 0.91, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "2 (1.79%)",
          totalCost: "0 (0%)"
        }
      },
      "30D": {
        pnl: {
          value: "-3.5%",
          change: "5,240",
          balance: "$72,145",
          isPositive: false,
          winRate: "65%"
        },
        transactions: {
          value: "5,832/1,245",
          totalPnL: "$0 (--)",
          unrealizedProfits: "-$45.2",
          avgDuration: "2h",
          totalCost: "$15,721.50",
          tokenAvgCost: "$72.45",
          tokenAvgProfit: "-$0.004"
        },
        distribution: {
          total: 320,
          ranges: [
            { range: ">500%", count: 2, percentage: 0.63, isPositive: true },
            { range: "200% ~ 500%", count: 5, percentage: 1.56, isPositive: true },
            { range: "0% ~ 200%", count: 167, percentage: 52.19, isPositive: true },
            { range: "0% ~ -50%", count: 142, percentage: 44.37, isPositive: false },
            { range: "<-50%", count: 4, percentage: 1.25, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "5 (1.56%)",
          totalCost: "0 (0%)"
        }
      }
    }
  },
  {
    address: "0x9A3DBCa554e9f6b9257aAa24010DA8377C57c17E",
    network: "ETH",
    networkImage: "/ethereum.png",
    balance: "0.89 ETH",
    timePeriods: {
      "1D": {
        pnl: {
          value: "+2.5%",
          change: "890",
          balance: "$78,234",
          isPositive: true,
          winRate: "72%"
        },
        transactions: {
          value: "156/45",
          totalPnL: "$890 (+2.5%)",
          unrealizedProfits: "+$15.8",
          avgDuration: "45m",
          totalCost: "$4,567.89",
          tokenAvgCost: "$52.45",
          tokenAvgProfit: "+$0.003"
        },
        distribution: {
          total: 45,
          ranges: [
            { range: ">500%", count: 1, percentage: 2.22, isPositive: true },
            { range: "200% ~ 500%", count: 3, percentage: 6.67, isPositive: true },
            { range: "0% ~ 200%", count: 25, percentage: 55.56, isPositive: true },
            { range: "0% ~ -50%", count: 15, percentage: 33.33, isPositive: false },
            { range: "<-50%", count: 1, percentage: 2.22, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "0 (0%)",
          totalCost: "0 (0%)"
        }
      },
      "7D": {
        pnl: {
          value: "+4.2%",
          change: "2,450",
          balance: "$82,567",
          isPositive: true,
          winRate: "70%"
        },
        transactions: {
          value: "987/324",
          totalPnL: "$2,450 (+4.2%)",
          unrealizedProfits: "+$45.6",
          avgDuration: "1.5h",
          totalCost: "$12,345.67",
          tokenAvgCost: "$58.90",
          tokenAvgProfit: "+$0.005"
        },
        distribution: {
          total: 95,
          ranges: [
            { range: ">500%", count: 2, percentage: 2.11, isPositive: true },
            { range: "200% ~ 500%", count: 5, percentage: 5.26, isPositive: true },
            { range: "0% ~ 200%", count: 53, percentage: 55.79, isPositive: true },
            { range: "0% ~ -50%", count: 32, percentage: 33.68, isPositive: false },
            { range: "<-50%", count: 3, percentage: 3.16, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "1 (1.05%)",
          totalCost: "0 (0%)"
        }
      },
      "30D": {
        pnl: {
          value: "+8.7%",
          change: "7,890",
          balance: "$98,765",
          isPositive: true,
          winRate: "68%"
        },
        transactions: {
          value: "4,567/1,543",
          totalPnL: "$7,890 (+8.7%)",
          unrealizedProfits: "+$123.4",
          avgDuration: "2.5h",
          totalCost: "$45,678.90",
          tokenAvgCost: "$65.43",
          tokenAvgProfit: "+$0.008"
        },
        distribution: {
          total: 280,
          ranges: [
            { range: ">500%", count: 5, percentage: 1.79, isPositive: true },
            { range: "200% ~ 500%", count: 15, percentage: 5.36, isPositive: true },
            { range: "0% ~ 200%", count: 154, percentage: 55, isPositive: true },
            { range: "0% ~ -50%", count: 98, percentage: 35, isPositive: false },
            { range: "<-50%", count: 8, percentage: 2.85, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "3 (1.07%)",
          totalCost: "0 (0%)"
        }
      }
    }
  },
  {
    address: "0xF8e31cb472bc70500f08Bf52596572BC4E35c346",
    network: "SOL",
    networkImage: "/solana.png",
    balance: "1.23 SOL",
    timePeriods: {
      "1D": {
        pnl: {
          value: "-0.8%",
          change: "234",
          balance: "$45,678",
          isPositive: false,
          winRate: "58%"
        },
        transactions: {
          value: "123/45",
          totalPnL: "-$234 (-0.8%)",
          unrealizedProfits: "-$5.6",
          avgDuration: "25m",
          totalCost: "$2,345.67",
          tokenAvgCost: "$38.90",
          tokenAvgProfit: "-$0.001"
        },
        distribution: {
          total: 35,
          ranges: [
            { range: ">500%", count: 0, percentage: 0, isPositive: true },
            { range: "200% ~ 500%", count: 1, percentage: 2.86, isPositive: true },
            { range: "0% ~ 200%", count: 18, percentage: 51.43, isPositive: true },
            { range: "0% ~ -50%", count: 15, percentage: 42.85, isPositive: false },
            { range: "<-50%", count: 1, percentage: 2.86, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "1 (2.86%)",
          totalCost: "0 (0%)"
        }
      },
      "7D": {
        pnl: {
          value: "-1.5%",
          change: "789",
          balance: "$48,901",
          isPositive: false,
          winRate: "60%"
        },
        transactions: {
          value: "567/234",
          totalPnL: "-$789 (-1.5%)",
          unrealizedProfits: "-$12.3",
          avgDuration: "45m",
          totalCost: "$5,678.90",
          tokenAvgCost: "$42.34",
          tokenAvgProfit: "-$0.002"
        },
        distribution: {
          total: 85,
          ranges: [
            { range: ">500%", count: 1, percentage: 1.18, isPositive: true },
            { range: "200% ~ 500%", count: 3, percentage: 3.53, isPositive: true },
            { range: "0% ~ 200%", count: 44, percentage: 51.76, isPositive: true },
            { range: "0% ~ -50%", count: 35, percentage: 41.18, isPositive: false },
            { range: "<-50%", count: 2, percentage: 2.35, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "2 (2.35%)",
          totalCost: "0 (0%)"
        }
      },
      "30D": {
        pnl: {
          value: "-2.8%",
          change: "1,567",
          balance: "$54,321",
          isPositive: false,
          winRate: "62%"
        },
        transactions: {
          value: "2,345/987",
          totalPnL: "-$1,567 (-2.8%)",
          unrealizedProfits: "-$34.5",
          avgDuration: "1.5h",
          totalCost: "$23,456.78",
          tokenAvgCost: "$45.67",
          tokenAvgProfit: "-$0.003"
        },
        distribution: {
          total: 250,
          ranges: [
            { range: ">500%", count: 2, percentage: 0.8, isPositive: true },
            { range: "200% ~ 500%", count: 8, percentage: 3.2, isPositive: true },
            { range: "0% ~ 200%", count: 130, percentage: 52, isPositive: true },
            { range: "0% ~ -50%", count: 102, percentage: 40.8, isPositive: false },
            { range: "<-50%", count: 8, percentage: 3.2, isPositive: false }
          ]
        },
        phishing: {
          totalPnL: "0 (0%)",
          unrealizedProfits: "0 (0%)",
          avgDuration: "4 (1.6%)",
          totalCost: "0 (0%)"
        }
      }
    }
  }
]; 