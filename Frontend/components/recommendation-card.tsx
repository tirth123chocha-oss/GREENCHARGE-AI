'use client'

import { useState } from 'react'
import { Sparkles, Leaf, Activity, IndianRupee, Check, ChevronRight, Cloud } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { recommendation } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function RecommendationCard({ onSimulate }: { onSimulate: () => void }) {
  const [accepted, setAccepted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/[0.08] to-card glow-green">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          <h3 className="text-sm font-semibold tracking-tight">GreenCharge AI Recommendation</h3>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">Optimal charging window today</p>
        <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          {recommendation.windowStart}{' '}
          <span className="text-muted-foreground">–</span> {recommendation.windowEnd}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Pill icon={Leaf} label="Renewable availability" value={`${recommendation.renewable}%`} />
          <Pill icon={Activity} label="Grid demand" value={recommendation.gridDemand} />
          <Pill icon={IndianRupee} label="Electricity rate" value={`₹${recommendation.rate}/kWh`} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-2xl font-bold text-primary tabular-nums">
              ₹{recommendation.savings}
            </span>
            <span className="text-xs text-muted-foreground">saved</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <Cloud className="size-4 self-center text-primary" />
            <span className="font-mono text-2xl font-bold tabular-nums">
              {recommendation.co2Avoided} kg
            </span>
            <span className="text-xs text-muted-foreground">CO2 avoided</span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 rounded-lg border border-border bg-background/50 p-4 text-sm text-muted-foreground">
            Charging in this window aligns with the daily solar peak while grid demand is at its
            lowest. Compared to charging at your {recommendation.windowStart === '2:00 PM' ? '7 PM departure' : 'default'} time,
            you cut roughly ₹{recommendation.savings} and {recommendation.co2Avoided} kg of CO2 by
            using {recommendation.renewable}% renewable energy.
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setAccepted(true)
              onSimulate()
            }}
            className={cn(
              'inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
              accepted
                ? 'bg-primary/20 text-primary'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            <Check className="size-4" />
            {accepted ? 'Schedule Accepted' : 'Accept Schedule'}
          </button>
          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            View Details
            <ChevronRight className={cn('size-4 transition-transform', showDetails && 'rotate-90')} />
          </button>
        </div>
      </div>
    </Card>
  )
}

function Pill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Leaf
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className="flex items-center gap-1.5 text-primary">
        <Icon className="size-4" />
      </div>
      <p className="mt-2 font-mono text-lg font-semibold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
