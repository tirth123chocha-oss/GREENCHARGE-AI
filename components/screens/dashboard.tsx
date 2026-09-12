'use client'

import { Sun, Wind, Activity, IndianRupee, Cloud, Leaf, Play, CircleDot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BatteryCard } from '@/components/battery-card'
import { RecommendationCard } from '@/components/recommendation-card'
import { GreennessScore } from '@/components/greenness-score'
import { MetricCard } from '@/components/metric-card'
import { EnergyChart, type SeriesDef } from '@/components/energy-chart'
import { snapshot, todayImpact, energySeries } from '@/lib/mock-data'

const dashboardSeries: SeriesDef[] = [
  { key: 'renewable', name: 'Renewable %', color: 'var(--color-chart-1)', type: 'area', axis: 'left' },
  { key: 'price', name: 'Price ₹/kWh', color: 'var(--color-chart-2)', type: 'line', axis: 'right' },
]

export function DashboardScreen({ onSimulate }: { onSimulate: () => void }) {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-balance">Good afternoon, Dharmi</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your EV is ready for smarter charging.</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <CircleDot className="size-3.5" />
            Grid data updated 30 sec ago
          </div>
        </div>
        <button
          type="button"
          onClick={onSimulate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 glow-green"
        >
          <Play className="size-4" fill="currentColor" />
          Simulate Charging
        </button>
      </div>

      {/* Battery + Recommendation */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BatteryCard />
        <RecommendationCard onSimulate={onSimulate} />
      </div>

      {/* Greenness + snapshot */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <GreennessScore />
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-rows-[auto_1fr]">
          <MetricCard icon={Sun} label="Availability" value={`${snapshot.solar}%`} sublabel="Solar" accent="amber" />
          <MetricCard icon={Wind} label="Availability" value={`${snapshot.wind}%`} sublabel="Wind" accent="blue" />
          <MetricCard icon={Activity} label="Current load" value={`${snapshot.gridLoad}%`} sublabel="Grid" accent="green" />
          <Card className="sm:col-span-3">
            <CardHeader>
              <CardTitle>Today&apos;s Impact</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              <Impact icon={IndianRupee} value={`₹${todayImpact.savings}`} label="Estimated savings" />
              <Impact icon={Cloud} value={`${todayImpact.co2Avoided} kg`} label="CO2 avoided" />
              <Impact icon={Leaf} value={`${todayImpact.renewableUsed}%`} label="Renewable used" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 24h energy chart */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Renewable Energy &amp; Electricity Price</CardTitle>
            <p className="text-xs text-muted-foreground">Next 24 hours · shaded area is your recommended window</p>
          </div>
        </CardHeader>
        <CardContent>
          <EnergyChart
            data={energySeries}
            series={dashboardSeries}
            highlight={{ x1: '2 PM', x2: '4 PM', label: 'Recommended' }}
            rightLabel=""
          />
        </CardContent>
      </Card>
    </div>
  )
}

function Impact({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof IndianRupee
  value: string
  label: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4 text-center">
      <Icon className="mx-auto size-5 text-primary" />
      <p className="mt-2 font-mono text-xl font-bold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
