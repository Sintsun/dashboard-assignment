import { FilterBar } from './components/FilterBar';
import { KpiStrip } from './components/KpiStrip';
import { LayoutPicker } from './components/LayoutPicker';
import { WidgetGrid } from './components/WidgetGrid';
import { useDashboardLayout } from './hooks/useDashboardLayout';
import { useTickets } from './hooks/useTickets';

export default function App() {
  const {
    tickets,
    filtered,
    filters,
    updateFilter,
    toggleFilter,
    clearFilters,
    loading,
    error,
    options,
  } = useTickets();
  const { layout, visibleWidgets, reorder, toggleWidget, resetLayout } = useDashboardLayout();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Harbourview Residences
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Maintenance board</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Built for the duty manager and shift coordinator: see what is still open, what is
            high priority, and who has not been assigned — then reshape the board for the shift.
          </p>
        </div>
        <LayoutPicker layout={layout} onToggle={toggleWidget} onReset={resetLayout} />
      </header>

      {loading && <p className="text-sm text-muted">Loading tickets…</p>}

      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {error} Start the API on port 3001, then refresh.
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          <KpiStrip tickets={tickets} filters={filters} onToggle={toggleFilter} />
          <FilterBar
            filters={filters}
            options={options}
            onChange={updateFilter}
            onClear={clearFilters}
            resultCount={filtered.length}
            totalCount={tickets.length}
          />
          <WidgetGrid widgets={visibleWidgets} tickets={filtered} onReorder={reorder} />
        </div>
      )}
    </div>
  );
}
