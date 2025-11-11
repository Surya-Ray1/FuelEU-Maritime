import './index.css'
import { useEffect, useMemo, useState } from 'react'
import { Tabs } from './adapters/ui/components/Tabs'
import { RoutesPage } from './adapters/ui/pages/RoutesPage'
import { ComparePage } from './adapters/ui/pages/ComparePage'
import { BankingPage } from './adapters/ui/pages/BankingPage'
import { PoolingPage } from './adapters/ui/pages/PoolingPage'
import { Badge } from './adapters/ui/components/Badge'

type TabKey = 'routes' | 'compare' | 'banking' | 'pooling'

export default function App() {
  const [tab, setTab] = useState<TabKey>('routes')
  useEffect(() => {
    const saved = localStorage.getItem('activeTab') as TabKey | null
    if (saved) setTab(saved)
  }, [])

  const heroStats = useMemo(() => ([
    { label: 'Target Intensity (2025)', value: '89.3368 gCO2e/MJ' },
    { label: 'Energy Density', value: '41,000 MJ/t' },
    { label: 'Articles', value: 'Art. 20 Banking · Art. 21 Pooling' },
  ]), [])
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(129,140,248,0.18), transparent 35%)' }} />
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10 space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Badge color="blue">FuelEU Maritime</Badge>
            <span>Compliance module · Hexagonal architecture</span>
          </div>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white">Fuel EU Compliance Dashboard</h1>
            <p className="mt-2 max-w-3xl text-slate-300">Monitor route performance, compare intensities, manage banking decisions, and orchestrate pooling strategies from a single workspace.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {heroStats.map(stat => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </header>

        <Tabs onChange={setTab} initial={tab} />
        <section className="rounded-3xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur">
          {tab === 'routes' && <RoutesPage />}
          {tab === 'compare' && <ComparePage />}
          {tab === 'banking' && <BankingPage />}
          {tab === 'pooling' && <PoolingPage />}
        </section>
      </main>
    </div>
  )
}
