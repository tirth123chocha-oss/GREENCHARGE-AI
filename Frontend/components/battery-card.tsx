import { BatteryCharging, Clock, Zap, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CircularProgress } from '@/components/circular-progress'
import { vehicle } from '@/lib/mock-data'

export function BatteryCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Your EV</CardTitle>
          <p className="text-xs text-muted-foreground">{vehicle.name}</p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Change target
        </button>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <CircularProgress value={vehicle.currentSoC} size={172} strokeWidth={14}>
          <span className="flex items-center gap-1 text-primary">
            <BatteryCharging className="size-4" />
          </span>
          <span className="font-mono text-4xl font-bold tabular-nums">{vehicle.currentSoC}%</span>
          <span className="text-xs text-muted-foreground">Current battery</span>
        </CircularProgress>

        <div className="grid w-full flex-1 grid-cols-2 gap-3">
          <Stat icon={Target} label="Target" value={`${vehicle.targetSoC}%`} />
          <Stat icon={Zap} label="Required energy" value={`${vehicle.requiredEnergy} kWh`} />
          <Stat icon={Clock} label="Departure" value={vehicle.departure} />
          <Stat icon={BatteryCharging} label="Est. charge time" value={vehicle.estimatedTime} />
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="mt-1 font-mono text-base font-semibold tabular-nums">{value}</p>
    </div>
  )
}
