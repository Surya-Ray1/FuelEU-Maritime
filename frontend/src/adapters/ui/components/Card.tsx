export function Card({ title, children, right }: { title?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 text-slate-100 shadow-glow backdrop-blur overflow-hidden">
      {(title || right) && (
        <div className="flex items-center justify-between px-4 py-2" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))' }}>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-ocean-400" />
            <div className="text-sm font-medium text-slate-200 uppercase tracking-wide">{title}</div>
          </div>
          {right}
        </div>
      )}
      <div className="p-4 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
