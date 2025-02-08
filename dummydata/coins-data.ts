interface CoinStatus {
  isNoMint: boolean
  isBlacklist: boolean
  isBurn: boolean
}

interface CoinData {
  id: string
  name: string
  symbol: string
  age: string
  marketCap: {
    formatted: string
    change: number
  }
  price: {
    formatted: string
    changes: {
      "1h": number
      "5m": number
      "1m": number
    }
  }
  status: CoinStatus
}

function generateCoins(): CoinData[] {
  return [
    {
      id: "1",
      name: "TRUMP",
      symbol: "TRUMP",
      age: "1d 2h",
      marketCap: {
        formatted: "$2.5M",
        change: 12.5
      },
      price: {
        formatted: "$0.000123",
        changes: {
          "1h": 2.5,
          "5m": -1.2,
          "1m": 0.8
        }
      },
      status: {
        isNoMint: true,
        isBlacklist: false,
        isBurn: true
      }
    },
    {
      id: "2",
      name: "RAY",
      symbol: "RAY",
      age: "5d 12h",
      marketCap: {
        formatted: "$15.8M",
        change: -3.2
      },
      price: {
        formatted: "$1.23",
        changes: {
          "1h": -1.5,
          "5m": 0.7,
          "1m": -0.3
        }
      },
      status: {
        isNoMint: true,
        isBlacklist: true,
        isBurn: false
      }
    }
  ]
}

export const coinsData = generateCoins() 