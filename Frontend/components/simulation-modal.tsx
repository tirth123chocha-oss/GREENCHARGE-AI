'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, Leaf, IndianRupee, Cloud, Activity, Check, Play, RotateCcw } from 'lucide-react'
import { CircularProgress } from '@/components/circular-progress'
import { vehicle, recommendation } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const START = vehicle.currentSoC
const TARGET = vehicle.targetSoC

export function SimulationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [soc, setSoc] = useState(START)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  const reset = useCallback(() => {
    setSoc(START)
    setRunning(false)
    setDone(false)
  }, [])

  // Auto-start the animation shortly after opening.
  useEffect(() => {
    if (!open) return
    reset()
    const t = setTimeout(() => setRunning(true), 400)
    return () => clearTimeout(t)
  }, [open, reset])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSoc((prev) => {
        if (prev >= TARGET) {
          clearInterval(id)
          setRunning(false)
          setDone(true)
          return TARGET
        }
        return Math.min(TARGET, prev + 1)
      })
    }, 70)
    return () => clearInterval(id)
  }, [running])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const progress = (soc - START) / (TARGET - START) // 0 -> 1
  const renewableUsed = Math.round(recommendation.renewable * progress)
  const cost = (64 * progress).toFixed(0)
  const co2 = (recommendation.co2Avoided * progress).toFixed(1)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Charging Simulation"
        className="relative w-full max-w-lg rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary">
              <Play className="size-3.5" fill="currentColor" />
            </span>
            <h2 className="text-base font-semibold">Charging Simulation</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Meta label="Current SoC" value={`${START}%`} />
            <Meta label="Target" value={`${TARGET}%`} />
            <Meta label="Departure" value={vehicle.departure} />
          </div>

          <div className="mt-4 rounded-lg border border-primary/25 bg-primary/[0.07] px-4 py-2.5 text-center text-sm">
            <span className="text-muted-foreground">AI Recommendation: </span>
            <span className="font-medium text-primary">
              {recommendation.windowStart} – {recommendation.windowEnd}
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <CircularProgress value={soc} size={180} strokeWidth={14}>
              <span className="font-mono text-4xl font-bold tabular-nums">{soc}%</span>
              <span className="text-xs text-muted-foreground">
                {done ? 'Charged' : running ? 'Charging…' : 'Ready'}
              </span>
            </CircularProgress>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <LiveStat icon={Leaf} label="Renewable" value={`${renewableUsed}%`} />
            <LiveStat icon={IndianRupee} label="Cost" value={`₹${cost}`} />
            <LiveStat icon={Cloud} label="CO2 avoided" value={`${co2} kg`} />
            <LiveStat icon={Activity} label="Grid impact" value="Low" />
          </div>

          {done && (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/[0.08] p-4">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">Charging optimized successfully</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {TARGET}% target reached using the optimal renewable-energy window.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {done ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                <RotateCcw className="size-4" />
                Replay
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'inline-flex flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
                done
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border border-border hover:bg-secondary',
              )}
            >
              {done ? 'Done' : 'Close'}
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
            Demo simulation only — not connected to real EV hardware.
          </p>
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-2.5">
      <p className="font-mono text-sm font-semibold tabular-nums">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}

function LiveStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Leaf
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3 text-center">
      <Icon className="mx-auto size-4 text-primary" />
      <p className="mt-1.5 font-mono text-base font-bold tabular-nums">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}
