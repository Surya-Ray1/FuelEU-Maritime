import { useEffect, useState } from 'react'

type TabKey = 'routes' | 'compare' | 'banking' | 'pooling'

function Icon({ name }: { name: string }) {
  // minimal inline icons — keep them tiny and stylistic
  switch (name) {
    case 'routes':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h6l2 3 4-6 6 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )
    case 'compare':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 6v12M6 12h12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )
    case 'banking':
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10.5L12 6l9 4.5M4 10v6a1 1 0 001 1h14a1 1 0 001-1v-6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )
    default:
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="1.5"/></svg>
      )
  }
}

export function Tabs({ onChange, initial = 'routes' as TabKey }: { onChange: (k: TabKey) => void; initial?: TabKey }) {
  const [active, setActive] = useState<TabKey>(initial)
  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'routes', label: 'Routes', icon: 'routes' },
    { key: 'compare', label: 'Compare', icon: 'compare' },
    { key: 'banking', label: 'Banking', icon: 'banking' },
    { key: 'pooling', label: 'Pooling', icon: 'pooling' },
  ]

  useEffect(() => {
    onChange(active)
    localStorage.setItem('activeTab', active)
  }, [active, onChange])

  return (
    <nav aria-label="Main tabs" className="sticky top-6 z-20 mb-6">
      <div className="flex items-center gap-3 overflow-auto rounded-full bg-slate-900/50 px-1 py-1 pr-2 shadow-sm border border-white/6">
        {tabs.map(t => {
          const isActive = active === t.key
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              role="tab"
              aria-selected={isActive}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive ? 'bg-gradient-to-r from-ocean-500 via-sky-500 to-indigo-500 text-white shadow-glow scale-105' : 'text-slate-300 hover:text-white/90 hover:bg-slate-800/40'}`}
            >
              <Icon name={t.icon} />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
