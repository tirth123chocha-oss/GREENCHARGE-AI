'use client'

import { Sun, Wind, Activity, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EnergyChart, type SeriesDef } from '@/components/energy-chart'
import { forecast, energySeries } from '@/lib/mock-data'

const insightSeries: SeriesDef[] = [
  { key: 'solar', name: 'Solar', color: 'var(--color-chart-2)', type: 'area', axis: 'left' },
  { key: 'wind', name: 'Wind', color: 'var(--color-chart-3)', type: 'area', axis: 'left' },
  { key: 'gridDemand', name: 'Grid Demand', color: 'var(--color-chart-4)', type: 'line', axis: 'left' },
  { key: 'price', name: 'Tariff ₹/kWh', color: 'var(--color-chart-2)', type: 'line', axis: 'right' },
]

export function EnergyInsightsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">Energy Intelligence</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
          Understand what is happening across the grid before you charge.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ForecastCard
          icon={Sun}
          title="Solar Forecast"
          level={forecast.solar.level}
          detail={`Peak at ${forecast.solar.peak}`}
          accent="bg-chart-2/15 text-chart-2"
        />
        <ForecastCard
          icon={Wind}
          title="Wind Forecast"
          level={forecast.wind.level}
          detail={`Peak at ${forecast.wind.peak}`}
          accent="bg-chart-3/15 text-chart-3"
        />
        <ForecastCard
          icon={Activity}
          title="Grid Demand"
          level={forecast.grid.level}
          detail={`Currently ${forecast.grid.current}%`}
          accent="bg-primary/12 text-primary"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>24-Hour Generation Forecast</CardTitle>
          <p className="text-xs text-muted-foreground">Toggle datasets to compare sources and tariff</p>
        </CardHeader>
        <CardContent>
          <EnergyChart data={energySeries} series={insightSeries} toggleable height={340} />
        </CardContent>
      </Card>

      <Card className="border-primary/25 bg-gradient-to-br from-primary/[0.06] to-card">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </span>
            <h3 className="text-sm font-semibold">AI Forecast</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{forecast.aiText}</p>
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Forecast confidence</span>
              <span className="font-mono font-semibold text-primary tabular-nums">
                {forecast.confidence}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${forecast.confidence}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ForecastCard({
  icon: Icon,
  title,
  level,
  detail,
  accent,
}: {
  icon: typeof Sun
  title: string
  level: string
  detail: string
  accent: string
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2.5">
        <span className={`grid size-9 place-items-center rounded-lg ${accent}`}>
          <Icon className="size-5" />
        </span>
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">{level}</p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </Card>
  )
}
