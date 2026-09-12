import { MapPin, Plug, Activity, Leaf, IndianRupee } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Station } from '@/lib/mock-data'

function loadTone(load: number) {
  if (load < 50) return { dot: 'bg-primary', bar: 'bg-primary' }
  if (load < 75) return { dot: 'bg-chart-2', bar: 'bg-chart-2' }
  return { dot: 'bg-destructive', bar: 'bg-destructive' }
}

export function StationCard({ station }: { station: Station }) {
  const tone = loadTone(station.load)
  const available = station.status === 'Available'

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{station.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            {station.distance} away
          </p>
        </div>
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            available ? 'bg-primary/15 text-primary' : 'bg-chart-2/15 text-chart-2',
          )}
        >
          <span className={cn('size-1.5 rounded-full', available ? 'bg-primary' : 'bg-chart-2')} />
          {station.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Field icon={Plug} label="Connectors" value={`${station.connectorsAvailable} / ${station.connectorsTotal}`} />
        <Field icon={IndianRupee} label="Tariff" value={`₹${station.tariff}/kWh`} />
        <Field icon={Leaf} label="Renewable" value={`${station.renewable}%`} />
        <Field icon={Activity} label="Current load" value={`${station.load}%`} />
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Grid load</span>
          <span className="flex items-center gap-1">
            <span className={cn('size-1.5 rounded-full', tone.dot)} />
            {station.load < 50 ? 'Low' : station.load < 75 ? 'Moderate' : 'High'}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className={cn('h-full rounded-full', tone.bar)} style={{ width: `${station.load}%` }} />
        </div>
      </div>
    </Card>
  )
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Plug
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="mt-1 font-mono text-sm font-semibold tabular-nums">{value}</p>
    </div>
  )
}
