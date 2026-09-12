import { Leaf } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CircularProgress } from '@/components/circular-progress'
import { greenness } from '@/lib/mock-data'

export function GreennessScore() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Greenness Score</CardTitle>
        <p className="text-xs text-muted-foreground">Quality of your charging window</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <CircularProgress value={greenness.score} size={150} strokeWidth={12}>
          <span className="font-mono text-3xl font-bold tabular-nums">{greenness.score}</span>
          <span className="text-xs text-muted-foreground">out of 100</span>
        </CircularProgress>
        <div className="mt-3 flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
          <Leaf className="size-3.5" />
          Excellent charging window
        </div>
        <dl className="mt-5 w-full space-y-2.5 text-sm">
          <Row label="Renewable energy" value={`${greenness.renewable}%`} />
          <Row label="Grid impact" value={greenness.gridImpact} />
          <Row label="CO2 avoided" value={`${greenness.co2Avoided} kg`} />
        </dl>
      </CardContent>
    </Card>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono font-medium tabular-nums">{value}</dd>
    </div>
  )
}
