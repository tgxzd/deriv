export interface ActivityData {
  id: string
  type: 'Buy' | 'Sell'
  token: {
    name: string
    symbol: string
    
  }
  total: string
  amount: string
  price: string
  profit: string | null
  age: string
}

export const activityData: ActivityData[] = [
  {
    id: "1",
    type: "Buy",
    token: {
      name: "LYT",
      symbol: "LYT",
      
    },
    total: "$0.016",
    amount: "434.24",
    price: "$0.035816",
    profit: null,
    age: "56s"
  },
  {
    id: "2",
    type: "Buy",
    token: {
      name: "pep",
      symbol: "PEP",
      
    },
    total: "$9.62",
    amount: "942.65",
    price: "$0.01021",
    profit: null,
    age: "57s"
  },
  {
    id: "3",
    type: "Buy",
    token: {
      name: "OIIAOIIA",
      symbol: "OIIAOIIA",
      
    },
    total: "$9.62",
    amount: "981.16",
    price: "$0.00981",
    profit: null,
    age: "57s"
  },
  {
    id: "4",
    type: "Sell",
    token: {
      name: "MARSH",
      symbol: "MARSH",
      
    },
    total: "$9.55",
    amount: "12.72K",
    price: "$0.00075",
    profit: "-$0.048",
    age: "2m ago"
  },
  {
    id: "5",
    type: "Buy",
    token: {
      name: "LYT",
      symbol: "LYT",
      
    },
    total: "$0.016",
    amount: "434.24",
    price: "$0.035792",
    profit: null,
    age: "5m ago"
  },
  {
    id: "6",
    type: "Buy",
    token: {
      name: "ALPHA",
      symbol: "ALPHA",
      
    },
    total: "$9.62",
    amount: "863.05",
    price: "$0.01114",
    profit: null,
    age: "6m ago"
  }
] 