import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

type MetricCardProps = {
  icon: LucideIcon
  label: string
  value: string
  sublabel?: string
  accent?: 'green' | 'amber' | 'blue' | 'neutral'
  className?: string
}

const accentMap = {
  green: 'bg-primary/12 text-primary',
  amber: 'bg-chart-2/15 text-chart-2',
  blue: 'bg-chart-3/15 text-chart-3',
  neutral: 'bg-secondary text-muted-foreground',
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  sublabel,
  accent = 'neutral',
  className,
}: MetricCardProps) {
  return (
    <Card className={cn('flex items-center gap-4 p-4', className)}>
      <span className={cn('grid size-11 shrink-0 place-items-center rounded-lg', accentMap[accent])}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xl font-semibold tracking-tight tabular-nums">{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        {sublabel && <p className="truncate text-[11px] text-muted-foreground/70">{sublabel}</p>}
      </div>
    </Card>
  )
}
