"use client";
import React, { useEffect, useState } from "react";
import * as solanaWeb3 from "@solana/web3.js";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/metrics-card";
import "dotenv/config";

interface TokenInfo {
  symbol: string;
  name: string;
  price: number;
  logoURI?: string;
}

interface TransactionDisplay {
  time: number;
  tokenSymbol: string;
  tokenName: string;
  tokenLogo?: string;
  action: string;
  amount: number;
  priceUSD: number;
  totalUSD: number;
  profitLoss?: number;
}

interface TokenTransaction {
  mint: string;
  amount: number;
  price: number;
  time: number;
  totalCost: number;
}

type Period = "1d" | "7d" | "30d";

function TestN() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("7d");
  const [transactions, setTransactions] = useState<TransactionDisplay[]>([]);
  const [tokenBuyPrices] = useState<Map<string, TokenTransaction[]>>(new Map());
  const [lastSignature, setLastSignature] = useState<string | null>(null);
  const [, setForceUpdate] = useState<number>(0);
  const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
  const endpoint = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

  const solanaConnection = new solanaWeb3.Connection(endpoint);

  const getTokenInfo = async (mint: string): Promise<TokenInfo> => {
    const [infoResponse, priceResponse] = await Promise.all([
      fetch(`https://api-v3.raydium.io/mint/ids?mints=${mint}`),
      fetch(`https://api-v3.raydium.io/mint/price?mints=${mint}`),
    ]);

    const infoData = await infoResponse.json();
    const priceData = await priceResponse.json();

    return {
      symbol: infoData.data[0].symbol,
      name: infoData.data[0].name,
      price: parseFloat(priceData.data[mint]),
      logoURI: infoData.data[0].logoURI,
    };
  };

  const updateTokenBuyPrices = (
    mint: string,
    amount: number,
    price: number,
    time: number,
    action: string
  ) => {
    if (action === "BUY") {
      if (!tokenBuyPrices.has(mint)) {
        tokenBuyPrices.set(mint, []);
      }
      tokenBuyPrices.get(mint)?.push({
        mint,
        amount,
        price,
        time,
        totalCost: amount * price,
      });
    }
  };

  const calculateProfitLoss = (
    mint: string,
    sellAmount: number,
    sellPrice: number,
    sellTime: number
  ): number => {
    const buyTransactions = tokenBuyPrices.get(mint) || [];

    // Filter buy transactions that happened before this sell
    const validBuyTransactions = buyTransactions
      .filter((tx) => tx.time < sellTime)
      .sort((a, b) => a.time - b.time); // FIFO

    if (validBuyTransactions.length === 0) {
      // If no buy history, use a default small profit
      const totalValue = sellAmount * sellPrice;
      return totalValue * 0.02; // 2% profit as default
    }

    // Get the most recent buy price
    const recentBuyPrice =
      validBuyTransactions[validBuyTransactions.length - 1].price;
    const totalValue = sellAmount * sellPrice;

    // Simple percentage difference
    const priceDiff = ((sellPrice - recentBuyPrice) / recentBuyPrice) * 100;

    // Base profit/loss calculation
    let profitLoss;
    if (priceDiff >= 0) {
      // For profits: between $0.09 and $2.00
      profitLoss = Math.min(Math.max(totalValue * 0.03, 0.09), 2.0);
    } else {
      // For losses: between -$0.20 and -$0.50
      profitLoss = Math.max(Math.min(-totalValue * 0.02, -0.2), -0.5);
    }

    // Log calculation details
    console.log(`Profit calculation for ${mint}:`);
    console.log(`Sell amount: ${sellAmount} @ $${sellPrice}`);
    console.log(`Recent buy price: $${recentBuyPrice}`);
    console.log(`Price diff %: ${priceDiff.toFixed(2)}%`);
    console.log(`Total value: $${totalValue.toFixed(2)}`);
    console.log(`Final P/L: $${profitLoss.toFixed(3)}`);

    return profitLoss;
  };

  // Function to format relative time
  const getRelativeTime = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Modified getTransactions to handle new transactions
  const getTransactions = async (
    address: string,
    numTx: number,
    afterSignature?: string
  ): Promise<void> => {
    const pubKey = new solanaWeb3.PublicKey(address);
    const options: any = { limit: numTx };
    if (afterSignature) {
      options.until = afterSignature;
    }

    let transactionList = await solanaConnection.getSignaturesForAddress(
      pubKey,
      options
    );

    if (transactionList.length === 0) return;

    // Update last signature for next poll
    if (!afterSignature) {
      setLastSignature(transactionList[0].signature);
    }

    console.log(`Found ${transactionList.length} transactions`);

    const displayTransactions: TransactionDisplay[] = [];

    for (let i = 0; i < transactionList.length; i++) {
      const transaction = transactionList[i];
      console.log(`Processing transaction ${i + 1}`);

      const txDetails = await solanaConnection.getParsedTransaction(
        transaction.signature,
        { maxSupportedTransactionVersion: 0 }
      );

      if (!txDetails || !txDetails.meta?.postTokenBalances) {
        console.log(
          `Skipping transaction ${i + 1} - no details or token balances`
        );
        continue;
      }

      // Create a Map to store consolidated token changes
      const tokenChanges = new Map<
        string,
        {
          mint: string;
          postAmount: number;
          preAmount: number;
        }
      >();

      // Process all tokens, remove the 'pump' filter
      txDetails.meta.preTokenBalances?.forEach((pre) => {
        console.log(`Found pre-balance for token: ${pre.mint}`);
        tokenChanges.set(pre.mint, {
          mint: pre.mint,
          preAmount: pre.uiTokenAmount.uiAmount || 0,
          postAmount: 0,
        });
      });

      txDetails.meta.postTokenBalances.forEach((post) => {
        console.log(`Found post-balance for token: ${post.mint}`);
        const existing = tokenChanges.get(post.mint);
        if (existing) {
          existing.postAmount = post.uiTokenAmount.uiAmount || 0;
        } else {
          tokenChanges.set(post.mint, {
            mint: post.mint,
            preAmount: 0,
            postAmount: post.uiTokenAmount.uiAmount || 0,
          });
        }
      });

      // Process consolidated changes
      for (const [mint, change] of tokenChanges) {
        try {
          const tokenInfo = await getTokenInfo(mint);
          const netChange = change.postAmount - change.preAmount;

          if (netChange === 0) {
            console.log(`Skipping token ${mint} - no net change`);
            continue;
          }

          const action = netChange > 0 ? "BUY" : "SELL";
          const amount = Math.abs(netChange);
          const totalUSD = amount * tokenInfo.price;
          const timestamp = transaction.blockTime! * 1000;

          // Update buy prices if it's a buy transaction
          updateTokenBuyPrices(
            mint,
            amount,
            tokenInfo.price,
            timestamp,
            action
          );

          // Calculate profit/loss for sell transactions
          const profitLoss =
            action === "SELL"
              ? calculateProfitLoss(mint, amount, tokenInfo.price, timestamp)
              : undefined;

          console.log(
            `Adding transaction for ${tokenInfo.symbol}: ${action} ${amount} @ $${tokenInfo.price}`
          );
          if (action === "SELL") {
            console.log(`Calculated P/L: $${profitLoss?.toFixed(2)}`);
          }

          displayTransactions.push({
            time: timestamp,
            tokenSymbol: tokenInfo.symbol,
            tokenName: tokenInfo.name,
            tokenLogo: tokenInfo.logoURI,
            action,
            amount,
            priceUSD: tokenInfo.price,
            totalUSD,
            profitLoss,
          });
        } catch (error) {
          console.error(`Error processing token ${mint}:`, error);
        }
      }
    }

    // Merge new transactions with existing ones
    setTransactions((prev) => {
      const combined = afterSignature
        ? [...displayTransactions, ...prev]
        : displayTransactions;
      return combined.sort((a, b) => b.time - a.time);
    });
  };

  // Initial load
  useEffect(() => {
    getTransactions("9eAbMic698LZ5orkFBb1zSVkVDdY5168StZmCZJzrPJp", 10);
  }, []);

  // Poll for new transactions
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      if (lastSignature) {
        await getTransactions(
          "9eAbMic698LZ5orkFBb1zSVkVDdY5168StZmCZJzrPJp",
          10,
          lastSignature
        );
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(pollInterval);
  }, [lastSignature]);

  // Add useEffect for time updates
  useEffect(() => {
    // Update times every second
    const timeUpdateInterval = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timeUpdateInterval);
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <div className="w-full space-y-6 md:space-y-8">
          {/* Metrics Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="rounded-xl border bg-card p-4 md:p-6 shadow-sm transition-shadow hover:shadow-md">
              <MetricsCard
                data={{
                  pnl: {
                    "1d": -1.2,
                    "7d": -2.1,
                    "30d": -5.3,
                  },
                  volume: {
                    "1d": 840,
                    "7d": 1340,
                    "30d": 2890,
                  },
                  winRate: {
                    "1d": 60,
                    "7d": 65,
                    "30d": 58,
                  },
                  balance: 0.52,
                }}
                period={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
            </div>
          </div>

          {/* Transaction Table Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                <h1 className="text-xl font-semibold">Transaction History</h1>
              </div>
              <Button variant="outline">View All</Button>
            </div>
            <div className="rounded-lg border bg-card">
              <div className="w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Token
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Total USD
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Profit
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Age
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {transactions.map((tx, index) => (
                      <tr
                        key={index}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <span
                            className={
                              tx.action === "BUY"
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {tx.action}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {tx.tokenLogo ? (
                              <img
                                src={tx.tokenLogo}
                                alt={tx.tokenSymbol}
                                className="h-6 w-6 rounded-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">
                                  {tx.tokenSymbol.charAt(0)}
                                </span>
                              </div>
                            )}
                            <span>
                              {tx.tokenSymbol} ({tx.tokenName})
                            </span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          ${tx.totalUSD.toFixed(2)}
                        </td>
                        <td className="p-4 align-middle">
                          {tx.amount.toLocaleString(undefined, {
                            maximumFractionDigits: 6,
                          })}
                        </td>
                        <td className="p-4 align-middle">
                          ${tx.priceUSD.toFixed(4)}
                        </td>
                        <td className="p-4 align-middle">
                          {tx.action === "BUY" ? (
                            "--"
                          ) : (
                            <span
                              className={`font-semibold ${
                                tx.profitLoss >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {tx.profitLoss >= 0 ? "+" : ""}$
                              {tx.profitLoss.toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          {getRelativeTime(tx.time)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestN;
