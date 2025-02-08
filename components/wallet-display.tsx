"use client"

import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface WalletDisplayProps {
  address: string
  balance: number
  network: 'SOL' | 'ETH'
}

export function WalletDisplay({ address, balance, network }: WalletDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Format the address to show only first and last few characters
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDisconnect = () => {
    // Add disconnect logic here
    console.log("Disconnecting wallet...")
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 hover:bg-accent"
      >
        <div className="flex items-center gap-1">
          <img src="/telegram.png" alt="Telegram" className="w-4 h-4" />
          <span className="text-sm font-medium">{shortAddress}</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-1">
          <img 
            src={network === 'SOL' ? '/solana.png' : '/ethereum.png'} 
            alt={network} 
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">{balance} {network}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-lg">
          <div className="py-1">
            <button
              onClick={handleDisconnect}
              className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-accent"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 