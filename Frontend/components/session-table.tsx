import { cn } from '@/lib/utils'
import { sessions } from '@/lib/mock-data'

export function SessionTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Duration</th>
            <th className="px-4 py-3 font-medium">Energy</th>
            <th className="px-4 py-3 font-medium">Cost</th>
            <th className="px-4 py-3 font-medium">Renewable %</th>
            <th className="px-4 py-3 font-medium">CO2 Avoided</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, i) => (
            <tr
              key={i}
              className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40"
            >
              <td className="px-4 py-3 font-medium">{s.date}</td>
              <td className="px-4 py-3 font-mono tabular-nums text-muted-foreground">{s.duration}</td>
              <td className="px-4 py-3 font-mono tabular-nums">{s.energy} kWh</td>
              <td className="px-4 py-3 font-mono tabular-nums">₹{s.cost}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${s.renewable}%` }} />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {s.renewable}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 font-mono tabular-nums">{s.co2} kg</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    s.status === 'Optimized'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-secondary text-muted-foreground',
                  )}
                >
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
