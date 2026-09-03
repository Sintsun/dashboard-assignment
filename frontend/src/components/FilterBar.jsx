import { useLanguage } from '../i18n/LanguageContext';

export function FilterBar({ filters, options, onChange, onClear, resultCount, totalCount }) {
  const { t } = useLanguage();
  const hasActive =
    filters.status ||
    filters.category ||
    filters.priority ||
    filters.unassignedOnly ||
    filters.search;

  return (
    <section className="rounded-lg border border-rule bg-card p-3">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold">{t('filter.title')}</h2>
        <p className="text-xs text-muted">
          {t('filter.showing', { shown: resultCount, total: totalCount })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted">
          {t('filter.search')}
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder={t('filter.searchPlaceholder')}
            className="h-9 rounded border border-rule bg-paper px-2.5 text-sm text-ink outline-none focus:border-ink"
          />
        </label>

        <SelectField
          label={t('filter.status')}
          value={filters.status}
          onChange={(value) => onChange('status', value)}
          options={options.statuses}
          allLabel={t('filter.all')}
          getLabel={(value) => t(`status.${value}`)}
        />
        <SelectField
          label={t('filter.category')}
          value={filters.category}
          onChange={(value) => onChange('category', value)}
          options={options.categories}
          allLabel={t('filter.all')}
          getLabel={(value) => t(`category.${value}`)}
        />
        <SelectField
          label={t('filter.priority')}
          value={filters.priority}
          onChange={(value) => onChange('priority', value)}
          options={options.priorities}
          allLabel={t('filter.all')}
          getLabel={(value) => t(`priority.${value}`)}
        />

        <div className="flex items-end gap-2">
          <label className="flex h-9 flex-1 items-center gap-2 rounded border border-rule bg-paper px-2.5 text-sm">
            <input
              type="checkbox"
              checked={filters.unassignedOnly}
              onChange={(event) => onChange('unassignedOnly', event.target.checked)}
            />
            {t('filter.unassignedOnly')}
          </label>
          <button
            type="button"
            onClick={onClear}
            disabled={!hasActive}
            className="h-9 rounded border border-rule px-3 text-sm font-medium disabled:opacity-40"
          >
            {t('filter.clear')}
          </button>
        </div>
      </div>
    </section>
  );
}

function SelectField({ label, value, onChange, options, allLabel, getLabel }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded border border-rule bg-paper px-2 text-sm text-ink outline-none focus:border-ink"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {getLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
