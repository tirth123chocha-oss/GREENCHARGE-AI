'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

const titles: Record<string, string> = {
  dashboard: 'Dashboard',
  schedule: 'Smart Schedule',
  insights: 'Energy Insights',
  sessions: 'Charging Sessions',
  stations: 'Stations',
}

export function TopBar({ screen }: { screen: string }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])

  const dateStr = now
    ? now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    : ''
  const timeStr = now
    ? now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-5 backdrop-blur md:px-8">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="md:hidden grid place-items-center size-7 rounded-md bg-primary text-primary-foreground">
          <Zap className="size-4" fill="currentColor" />
        </span>
        <h1 className="truncate text-lg font-semibold tracking-tight">{titles[screen]}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium text-primary">Live Grid</span>
        </div>

        <div className="hidden text-right leading-tight sm:block">
          <p className="text-sm font-medium">{timeStr}</p>
          <p className="text-xs text-muted-foreground">{dateStr}</p>
        </div>

        <span className="grid size-9 place-items-center rounded-full bg-secondary text-sm font-semibold">
          DP
        </span>
      </div>
    </header>
  )
}
