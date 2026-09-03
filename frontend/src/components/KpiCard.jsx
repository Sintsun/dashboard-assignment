export function KpiCard({ label, count, note, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-lg border px-4 py-3 text-left transition ${
        active ? 'border-ink bg-ink text-paper' : 'border-rule bg-card hover:border-stone-400'
      }`}
    >
      <p className={`text-xs font-medium ${active ? 'text-stone-300' : 'text-muted'}`}>{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{count}</p>
      <p className={`mt-1 text-xs ${active ? 'text-stone-300' : 'text-muted'}`}>{note}</p>
    </button>
  );
}
