import { cn } from '@/lib/utils'
import { energySeries } from '@/lib/mock-data'

// Render the midday-to-evening slice (12 PM -> 7 PM departure) as a 24h-style
// timeline with condition coloring and a highlighted recommended block.
const slice = energySeries.filter((p) => p.hour >= 12 && p.hour <= 19)

function condition(renewable: number) {
  if (renewable >= 78) return { label: 'Optimal', cls: 'bg-primary' }
  if (renewable >= 64) return { label: 'Good', cls: 'bg-chart-2' }
  return { label: 'Costly', cls: 'bg-destructive/70' }
}

export function ChargingTimeline() {
  return (
    <div>
      <div className="flex items-end gap-1.5">
        {slice.map((p) => {
          const isRecommended = p.hour >= 14 && p.hour <= 16
          const cond = condition(p.renewable)
          return (
            <div key={p.hour} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end">
                <div
                  className={cn(
                    'w-full rounded-md transition-all',
                    isRecommended ? 'bg-primary glow-green' : cond.cls,
                    !isRecommended && 'opacity-40',
                  )}
                  style={{ height: `${p.renewable}%` }}
                  aria-label={`${p.time}: ${p.renewable}% renewable`}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{p.time.replace(' ', '')}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 rounded-lg border border-primary/30 bg-primary/[0.07] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Recommended</p>
            <p className="mt-0.5 font-mono text-lg font-semibold">2:00 PM – 4:30 PM</p>
          </div>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
            Best renewable availability + low tariff
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <Legend cls="bg-primary" label="Optimal" />
        <Legend cls="bg-chart-2" label="Good" />
        <Legend cls="bg-destructive/70" label="Costly / high demand" />
      </div>
    </div>
  )
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn('size-2.5 rounded-sm', cls)} />
      {label}
    </span>
  )
}
