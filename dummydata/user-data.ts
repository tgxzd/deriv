export interface VaultData {
  token: string;
  symbol: string;
  lastActive: string;
  unrealized: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  realizedProfit: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  totalProfit: {
    value: string;
    count: number;
  };
  balance: string;
  usd: string;
  position: string;
  holdingDuration: string;
  bought: {
    value: string;
    avg: string;
  };
  sold: {
    value: string;
    avg: string;
  };
  txs: {
    buy: number;
    sell: number;
  };
  hasNotification?: boolean;
  sellAll?: boolean;
}

export interface UserData {
  address: string;
  network: 'SOL' | 'ETH';
  balance: string;
  vaultData: VaultData[];
}

export const userData: UserData[] = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "SOL",
    balance: "0.52 SOL",
    vaultData: [
      {
        token: "RUGPULL",
        symbol: "RUGPULL",
        lastActive: "3h",
        unrealized: {
          value: "-$5.29",
          percentage: "-17.9%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$5.29",
          percentage: "-17.9%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "24m",
        bought: {
          value: "$29.57",
          avg: "$0.0007"
        },
        sold: {
          value: "$24.28",
          avg: "$0.0005"
        },
        txs: {
          buy: 3,
          sell: 2
        },
        sellAll: true
      },
      {
        token: "SSE",
        symbol: "SSE",
        lastActive: "3h",
        unrealized: {
          value: "-$25.31",
          percentage: "-5.3%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$25.31",
          percentage: "-5.3%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "41m",
        bought: {
          value: "$478.94",
          avg: "$0.0254"
        },
        sold: {
          value: "$453.63",
          avg: "$0.0241"
        },
        txs: {
          buy: 43,
          sell: 10
        },
        sellAll: true
      },
      {
        token: "jellyjelly",
        symbol: "jellyjelly",
        lastActive: "3h",
        unrealized: {
          value: "-$1.73",
          percentage: "-0.4%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$1.73",
          percentage: "-0.4%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "1h",
        bought: {
          value: "$479.3",
          avg: "$0.0227"
        },
        sold: {
          value: "$477.57",
          avg: "$0.0227"
        },
        txs: {
          buy: 48,
          sell: 18
        }
      },
      {
        token: "MOBY",
        symbol: "MOBY",
        lastActive: "3h",
        unrealized: {
          value: "-$1",
          percentage: "-1.3%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$1",
          percentage: "-1.3%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "47m",
        bought: {
          value: "$75.48",
          avg: "$0.0545"
        },
        sold: {
          value: "$74.48",
          avg: "$0.0538"
        },
        txs: {
          buy: 9,
          sell: 7
        },
        sellAll: true
      },
      {
        token: "ZEREBRO",
        symbol: "ZEREBRO",
        lastActive: "3h",
        unrealized: {
          value: "-$0.186",
          percentage: "-0.4%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$0.186",
          percentage: "-0.4%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "37m",
        bought: {
          value: "$46.19",
          avg: "$0.0555"
        },
        sold: {
          value: "$46.01",
          avg: "$0.0553"
        },
        txs: {
          buy: 5,
          sell: 5
        }
      },
      {
        token: "Calicoin",
        symbol: "Calicoin",
        lastActive: "3h",
        unrealized: {
          value: "+$15.75",
          percentage: "+4.3%",
          isPositive: true
        },
        realizedProfit: {
          value: "+$15.75",
          percentage: "+4.3%",
          isPositive: true
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "42m",
        bought: {
          value: "$370.33",
          avg: "$0.0071"
        },
        sold: {
          value: "$386.08",
          avg: "$0.0074"
        },
        txs: {
          buy: 35,
          sell: 16
        }
      },
      {
        token: "San",
        symbol: "San",
        lastActive: "3h",
        unrealized: {
          value: "-$25.09",
          percentage: "-4.6%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$25.09",
          percentage: "-4.6%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "40m",
        bought: {
          value: "$546.81",
          avg: "$0.0127"
        },
        sold: {
          value: "$521.72",
          avg: "$0.0121"
        },
        txs: {
          buy: 54,
          sell: 18
        },
        sellAll: true
      }
    ]
  },
  {
    address: "0x9A3DBCa554e9f6b9257aAa24010DA8377C57c17E",
    network: "ETH",
    balance: "0.89 ETH",
    vaultData: [
      {
        token: "OmegaX",
        symbol: "OmegaX",
        lastActive: "4h",
        unrealized: {
          value: "+$4.72",
          percentage: "+1.2%",
          isPositive: true
        },
        realizedProfit: {
          value: "+$4.72",
          percentage: "+1.2%",
          isPositive: true
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "42m",
        bought: {
          value: "$389.63",
          avg: "$0.002"
        },
        sold: {
          value: "$394.35",
          avg: "$0.0021"
        },
        txs: {
          buy: 33,
          sell: 10
        },
        hasNotification: true
      },
      {
        token: "TTC",
        symbol: "TTC",
        lastActive: "10h",
        unrealized: {
          value: "-$45.7",
          percentage: "-12.2%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$45.7",
          percentage: "-12.2%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "55m",
        bought: {
          value: "$373.72",
          avg: "$0.0001"
        },
        sold: {
          value: "$328.02",
          avg: "$0.0001"
        },
        txs: {
          buy: 27,
          sell: 5
        },
        hasNotification: true
      }
    ]
  },
  {
    address: "0xF8e31cb472bc70500f08Bf52596572BC4E35c346",
    network: "SOL",
    balance: "1.23 SOL",
    vaultData: [
      {
        token: "BFC",
        symbol: "BFC",
        lastActive: "19h",
        unrealized: {
          value: "-$2.81",
          percentage: "-0.7%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$2.81",
          percentage: "-0.7%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "1h",
        bought: {
          value: "$412.78",
          avg: "$0.0016"
        },
        sold: {
          value: "$409.97",
          avg: "$0.0015"
        },
        txs: {
          buy: 35,
          sell: 18
        }
      },
      {
        token: "LUMO",
        symbol: "LUMO",
        lastActive: "4h",
        unrealized: {
          value: "-$5.29",
          percentage: "-1.4%",
          isPositive: false
        },
        realizedProfit: {
          value: "-$5.29",
          percentage: "-1.4%",
          isPositive: false
        },
        totalProfit: {
          value: "$0",
          count: 0
        },
        balance: "0%",
        usd: "",
        position: "0%",
        holdingDuration: "1h",
        bought: {
          value: "$371.2",
          avg: "$0.0217"
        },
        sold: {
          value: "$365.92",
          avg: "$0.0214"
        },
        txs: {
          buy: 42,
          sell: 21
        }
      }
    ]
  }
]; 