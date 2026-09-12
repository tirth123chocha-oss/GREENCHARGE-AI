'use client'

import {
  LayoutDashboard,
  CalendarClock,
  LineChart,
  BatteryCharging,
  MapPin,
  Settings,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ScreenId } from './types'

export const navItems: { id: ScreenId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'schedule', label: 'Smart Schedule', icon: CalendarClock },
  { id: 'insights', label: 'Energy Insights', icon: LineChart },
  { id: 'sessions', label: 'Charging Sessions', icon: BatteryCharging },
  { id: 'stations', label: 'Stations', icon: MapPin },
]

export function AppSidebar({
  active,
  onNavigate,
}: {
  active: ScreenId
  onNavigate: (id: ScreenId) => void
}) {
  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-sidebar-border">
        <span className="grid place-items-center size-8 rounded-lg bg-primary text-primary-foreground">
          <Zap className="size-5" fill="currentColor" />
        </span>
        <span className="text-base font-semibold tracking-tight">
          GreenCharge <span className="text-primary">AI</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-5">
        <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
                  )}
                >
                  <Icon className="size-[18px] shrink-0" />
                  {item.label}
                  {isActive && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
        >
          <Settings className="size-[18px]" />
          Settings
        </button>
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-secondary text-sm font-semibold text-foreground">
            DP
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium">Dharmi Patel</p>
            <p className="truncate text-xs text-muted-foreground">dharmi@greencharge.ai</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export function MobileNav({
  active,
  onNavigate,
}: {
  active: ScreenId
  onNavigate: (id: ScreenId) => void
}) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-sidebar/95 backdrop-blur">
      <ul className="flex items-stretch justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'flex w-full flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className="size-5" />
                <span className="truncate max-w-[64px]">{item.label.split(' ')[0]}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
