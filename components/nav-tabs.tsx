"use client"

import { Activity, TrendingUp, Sparkles, Layers, Users2, Copy } from "lucide-react"

type Tab = 'activity' 

interface NavTabsProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  const tabs = [
    {
      id: 'activity' as const,
      label: 'Activity',
      icon: Activity,
      description: 'Track your trading activity'
    },
   
   
    
  ]

  return (
    <div className="space-y-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-1 rounded-lg bg-muted/50 p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm scale-105'
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground hover:scale-105'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Mobile Navigation */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Description */}
      <p className="text-sm text-muted-foreground hidden md:block">
        {tabs.find(tab => tab.id === activeTab)?.description}
      </p>
    </div>
  )
} 