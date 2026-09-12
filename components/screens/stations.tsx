import { StationCard } from '@/components/station-card'
import { stations } from '@/lib/mock-data'

export function StationsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">Charging Stations</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live status across the GreenCharge network. Greener, lower-load stations first.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  )
}
