"use client"

import { ThemeToggle } from "./theme-toggle"
import { NetworkSelect } from "./network-select"
import { WalletDisplay } from "./wallet-display"
import { userData } from "@/dummydata/user-data"
import Link from "next/link"
import { Menu, Search, X } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { name: "Meme", href: "/meme" },
  { name: "New pair", href: "/new-pair" },
  { name: "Trending", href: "/trending" },
  { name: "CopyTrade", href: "/copy-trade" },
  { name: "Holding", href: "/holding" },
  { name: "Follow", href: "/follow" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  // Use the first user's data from the array
  const currentUser = userData[0]
  // Format the balance to show just the number
  const balanceNumber = parseFloat(currentUser.balance.split(' ')[0])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center flex-1 md:flex-none">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold font-sans">AI Trading</span>
          </Link>
          <div className="hidden md:block">
            <NetworkSelect />
          </div>
          <nav className="hidden md:flex items-center space-x-4 ml-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium font-sans text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Search Bar - Desktop */}
        <div className="relative hidden md:flex flex-1 mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search token/contract/wallet"
              className="h-9 w-full rounded-md border border-input bg-background px-8 text-sm font-sans ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800/50"
            />
            <div className="absolute right-2 top-2.5 text-sm font-mono text-muted-foreground">
              Ctrl alt K
            </div>
          </div>
        </div>

        {/* Search Toggle - Mobile */}
        <button
          className="md:hidden p-2 ml-auto"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-6 w-6" />
        </button>

        <div className="hidden md:flex items-center space-x-4">
          <WalletDisplay 
            address={currentUser.address}
            balance={balanceNumber}
            network={currentUser.network}
          />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="container py-4">
            <NetworkSelect />
            <nav className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium font-sans text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between">
              <WalletDisplay 
                address={currentUser.address}
                balance={balanceNumber}
                network={currentUser.network}
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="container py-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search token/contract/wallet"
                className="h-9 w-full rounded-md border border-input bg-background px-8 text-sm font-sans ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800/50"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
