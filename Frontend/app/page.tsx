'use client'

import { useState } from 'react'
import { AppSidebar, MobileNav } from '@/components/app-sidebar'
import { TopBar } from '@/components/top-bar'
import { SimulationModal } from '@/components/simulation-modal'
import { DashboardScreen } from '@/components/screens/dashboard'
import { SmartScheduleScreen } from '@/components/screens/smart-schedule'
import { EnergyInsightsScreen } from '@/components/screens/energy-insights'
import { ChargingSessionsScreen } from '@/components/screens/charging-sessions'
import { StationsScreen } from '@/components/screens/stations'
import type { ScreenId } from '@/components/types'

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>('dashboard')
  const [simOpen, setSimOpen] = useState(false)

  const navigate = (id: ScreenId) => {
    setScreen(id)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar active={screen} onNavigate={navigate} />

      <div className="md:pl-64">
        <TopBar screen={screen} />
        <main className="mx-auto max-w-7xl px-5 py-6 pb-24 md:px-8 md:pb-10">
          {screen === 'dashboard' && <DashboardScreen onSimulate={() => setSimOpen(true)} />}
          {screen === 'schedule' && <SmartScheduleScreen />}
          {screen === 'insights' && <EnergyInsightsScreen />}
          {screen === 'sessions' && <ChargingSessionsScreen />}
          {screen === 'stations' && <StationsScreen />}
        </main>
      </div>

      <MobileNav active={screen} onNavigate={navigate} />
      <SimulationModal open={simOpen} onClose={() => setSimOpen(false)} />
    </div>
  )
}
