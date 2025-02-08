export interface CopyTradeData {
  id: string
  name: string
  rank: number
  walletAddress: string
  balance: number
  pnl: {
    "1d": { percentage: number; value: number }
    "7d": { percentage: number; value: number }
    "30d": { percentage: number; value: number }
  }
  winRate: number
  profit: number
}

export const copyTradeData: CopyTradeData[] = [
  {
    id: "1",
    name: "Trader 1",
    rank: 1,
    walletAddress: "0x742d...f44e",
    balance: 52.5,
    pnl: {
      "1d": { percentage: 12.5, value: 650 },
      "7d": { percentage: 45.2, value: 2340 },
      "30d": { percentage: 125.5, value: 6520 }
    },
    winRate: 85,
    profit: 12500
  },
  {
    id: "2",
    name: "Trader 2",
    rank: 2,
    walletAddress: "0x9A3D...c17E",
    balance: 89.2,
    pnl: {
      "1d": { percentage: -2.5, value: -150 },
      "7d": { percentage: 15.8, value: 950 },
      "30d": { percentage: 85.2, value: 4250 }
    },
    winRate: 72,
    profit: 8900
  },
  {
    id: "3",
    name: "Trader 3",
    rank: 3,
    walletAddress: "0x1234...5678",
    balance: 125.4,
    pnl: {
      "1d": { percentage: 8.2, value: 420 },
      "7d": { percentage: 28.5, value: 1580 },
      "30d": { percentage: 95.8, value: 5240 }
    },
    winRate: 78,
    profit: 15800
  },
  {
    id: "4",
    name: "Trader 4",
    rank: 4,
    walletAddress: "0xabcd...efgh",
    balance: 45.8,
    pnl: {
      "1d": { percentage: -5.2, value: -280 },
      "7d": { percentage: -12.5, value: -750 },
      "30d": { percentage: 25.4, value: 1250 }
    },
    winRate: 65,
    profit: 3500
  },
  {
    id: "5",
    name: "Trader 5",
    rank: 5,
    walletAddress: "0x9876...4321",
    balance: 78.6,
    pnl: {
      "1d": { percentage: 15.4, value: 850 },
      "7d": { percentage: 35.2, value: 1920 },
      "30d": { percentage: 112.5, value: 5850 }
    },
    winRate: 82,
    profit: 11200
  }
];
