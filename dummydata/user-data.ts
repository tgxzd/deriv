export interface UserData {
  address: string;
  network: 'SOL' | 'ETH';
  balance: string;
}

export const userData: UserData[] = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "SOL",
    balance: "0.52 SOL"
  },
  {
    address: "0x9A3DBCa554e9f6b9257aAa24010DA8377C57c17E",
    network: "ETH",
    balance: "0.89 ETH"
  }
]; 