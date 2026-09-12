'use client'

import { useState } from 'react'
import { Check, Battery, Target, Clock, Timer, Leaf, IndianRupee } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChargingTimeline } from '@/components/charging-timeline'
import {
  vehicle,
  optimizationFactors,
  optimizationScore,
  scheduleOptions,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function SmartScheduleScreen() {
  const [selected, setSelected] = useState('best')
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">Smart Charging Schedule</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
          AI-optimized charging plan based on renewable availability, price and your departure
          deadline.
        </p>
      </div>

      {/* Constraints */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Constraint icon={Battery} label="Current SoC" value={`${vehicle.currentSoC}%`} />
        <Constraint icon={Target} label="Target SoC" value={`${vehicle.targetSoC}%`} />
        <Constraint icon={Clock} label="Departure" value={vehicle.departure} />
        <Constraint icon={Timer} label="Required charging" value={vehicle.estimatedTime} />
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Optimized Timeline</CardTitle>
          <p className="text-xs text-muted-foreground">Renewable availability from now until departure</p>
        </CardHeader>
        <CardContent>
          <ChargingTimeline />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Why this schedule?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {optimizationFactors.map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-mono font-semibold tabular-nums">{f.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${f.value}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg border border-primary/25 bg-primary/[0.07] px-4 py-3">
              <span className="text-sm font-medium">Optimization Score</span>
              <span className="font-mono text-xl font-bold text-primary tabular-nums">
                {optimizationScore}/100
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Alternatives */}
        <Card>
          <CardHeader>
            <CardTitle>Alternative Schedules</CardTitle>
            <p className="text-xs text-muted-foreground">Pick the plan that fits your priority</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {scheduleOptions.map((opt) => {
              const isSelected = selected === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/[0.07]'
                      : 'border-border hover:bg-secondary',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-5 shrink-0 place-items-center rounded-full border',
                      isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                    )}
                  >
                    {isSelected && <Check className="size-3" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{opt.label}</p>
                      {opt.recommended && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{opt.window} · {opt.note}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="flex items-center justify-end gap-0.5 font-mono text-base font-bold tabular-nums">
                      <IndianRupee className="size-3.5" />
                      {opt.cost}
                    </p>
                    <p className="flex items-center justify-end gap-1 text-[11px] text-primary">
                      <Leaf className="size-3" />
                      {opt.renewable}%
                    </p>
                  </div>
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className={cn(
                'mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
                confirmed
                  ? 'bg-primary/20 text-primary'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90',
              )}
            >
              <Check className="size-4" />
              {confirmed ? 'Schedule Confirmed' : 'Confirm Schedule'}
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Constraint({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Battery
  label: string
  value: string
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="mt-1 font-mono text-lg font-bold tabular-nums">{value}</p>
    </Card>
  )
}
