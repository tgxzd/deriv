"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const networks = [
  {
    id: "sol",
    name: "Solana",
    icon: "/solana.png"
  },
 
]

export function NetworkSelect() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-sans hover:bg-accent"
      >
        <Image
          src={selectedNetwork.icon}
          alt={selectedNetwork.name}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span>{selectedNetwork.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-background shadow-lg">
          {networks.map((network) => (
            <button
              key={network.id}
              onClick={() => {
                setSelectedNetwork(network)
                setIsOpen(false)
              }}
              className="flex w-full items-center space-x-2 px-3 py-2 text-sm font-sans hover:bg-accent"
            >
              <Image
                src={network.icon}
                alt={network.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span>{network.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 