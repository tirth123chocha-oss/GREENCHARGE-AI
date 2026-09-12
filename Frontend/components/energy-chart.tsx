'use client'

import { useState } from 'react'
import {
  Area,
  Line,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from 'recharts'
import { cn } from '@/lib/utils'
import type { EnergyPoint } from '@/lib/mock-data'

export type SeriesDef = {
  key: keyof EnergyPoint
  name: string
  color: string
  type: 'area' | 'line'
  axis?: 'left' | 'right'
  unit?: string
}

type EnergyChartProps = {
  data: EnergyPoint[]
  series: SeriesDef[]
  highlight?: { x1: string; x2: string; label?: string }
  toggleable?: boolean
  height?: number
  rightLabel?: string
  leftLabel?: string
}

export function EnergyChart({
  data,
  series,
  highlight,
  toggleable = false,
  height = 320,
  rightLabel,
  leftLabel,
}: EnergyChartProps) {
  const [hidden, setHidden] = useState<Set<string>>(new Set())

  const toggle = (key: string) =>
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const visible = series.filter((s) => !hidden.has(s.key as string))
  const hasRight = visible.some((s) => s.axis === 'right')

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {series.map((s) => {
          const isHidden = hidden.has(s.key as string)
          return (
            <button
              key={s.key as string}
              type="button"
              disabled={!toggleable}
              onClick={() => toggleable && toggle(s.key as string)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                toggleable && 'hover:bg-secondary cursor-pointer',
                isHidden
                  ? 'border-border text-muted-foreground/50'
                  : 'border-border text-foreground',
              )}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: isHidden ? 'var(--muted)' : s.color }}
              />
              {s.name}
            </button>
          )
        })}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key as string} id={`grad-${s.key as string}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
            interval={2}
            minTickGap={8}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={40}
            label={
              leftLabel
                ? { value: leftLabel, angle: -90, position: 'insideLeft', fill: 'var(--muted-foreground)', fontSize: 11, dy: 40 }
                : undefined
            }
          />
          {hasRight && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
          )}
          <Tooltip content={<ChartTooltip rightLabel={rightLabel} />} cursor={{ stroke: 'var(--border)' }} />

          {highlight && (
            <ReferenceArea
              yAxisId="left"
              x1={highlight.x1}
              x2={highlight.x2}
              fill="var(--color-primary)"
              fillOpacity={0.1}
              stroke="var(--color-primary)"
              strokeOpacity={0.4}
              strokeDasharray="4 4"
              label={
                highlight.label
                  ? { value: highlight.label, position: 'insideTop', fill: 'var(--color-primary)', fontSize: 11, dy: 6 }
                  : undefined
              }
            />
          )}

          {visible.map((s) =>
            s.type === 'area' ? (
              <Area
                key={s.key as string}
                yAxisId={s.axis === 'right' ? 'right' : 'left'}
                type="monotone"
                dataKey={s.key as string}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#grad-${s.key as string})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ) : (
              <Line
                key={s.key as string}
                yAxisId={s.axis === 'right' ? 'right' : 'left'}
                type="monotone"
                dataKey={s.key as string}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ),
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
  rightLabel,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string; dataKey: string }[]
  label?: string
  rightLabel?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="mb-1.5 font-medium text-foreground">{label}</p>
      <div className="space-y-1">
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
            <span className="ml-auto font-mono font-medium text-foreground tabular-nums">
              {p.dataKey === 'price' ? `₹${p.value.toFixed(2)}` : `${p.value}${rightLabel ?? '%'}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
