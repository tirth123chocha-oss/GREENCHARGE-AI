import { BatteryCharging, Zap, IndianRupee, Cloud } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/metric-card'
import { SessionTable } from '@/components/session-table'
import { sessionSummary } from '@/lib/mock-data'

export function ChargingSessionsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">Charging Sessions</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your charging history and lifetime impact.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={BatteryCharging} label="Total sessions" value={`${sessionSummary.total}`} accent="green" />
        <MetricCard icon={Zap} label="Energy charged" value={`${sessionSummary.energy} kWh`} accent="amber" />
        <MetricCard icon={IndianRupee} label="Money saved" value={`₹${sessionSummary.saved}`} accent="green" />
        <MetricCard icon={Cloud} label="CO2 avoided" value={`${sessionSummary.co2} kg`} accent="blue" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <p className="text-xs text-muted-foreground">Optimized sessions used AI renewable windows</p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <SessionTable />
        </CardContent>
      </Card>
    </div>
  )
}
