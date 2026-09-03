import { ErrorBanner } from './components/ErrorBanner';
import { FilterBar } from './components/FilterBar';
import { KpiStrip } from './components/KpiStrip';
import { LanguageToggle } from './components/LanguageToggle';
import { LayoutPicker } from './components/LayoutPicker';
import { WidgetGrid } from './components/WidgetGrid';
import { useDashboardLayout } from './hooks/useDashboardLayout';
import { useTickets } from './hooks/useTickets';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  const {
    tickets,
    filtered,
    filters,
    updateFilter,
    toggleFilter,
    clearFilters,
    loading,
    error,
    retry,
    options,
  } = useTickets();
  const { layout, visibleWidgets, reorder, toggleWidget, resetLayout } = useDashboardLayout();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            {t('estate')}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{t('heading')}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LanguageToggle />
          <LayoutPicker layout={layout} onToggle={toggleWidget} onReset={resetLayout} />
        </div>
      </header>

      {loading && <p className="text-sm text-muted">{t('loading')}</p>}

      {error && (
        <ErrorBanner
          message={t('error')}
          retryLabel={t('retry')}
          onRetry={retry}
          retrying={loading}
        />
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
          <WidgetGrid
            widgets={visibleWidgets}
            tickets={filtered}
            allTickets={tickets}
            filters={filters}
            onToggle={toggleFilter}
            onReorder={reorder}
          />
        </div>
      )}
    </div>
  );
}
