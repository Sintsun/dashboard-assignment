import { useLanguage } from '../i18n/LanguageContext';
import { isHighActiveOnly } from '../utils/filters';
import { FIELD_CLASS, SelectField } from './SelectField';

export function FilterBar({ filters, options, onChange, onClear, resultCount, totalCount }) {
  const { t } = useLanguage();
  const hasActive =
    filters.status ||
    filters.category ||
    filters.priority ||
    filters.unassignedOnly ||
    filters.search;

  const selects = [
    { key: 'status', options: options.statuses, prefix: 'status' },
    { key: 'category', options: options.categories, prefix: 'category' },
    { key: 'priority', options: options.priorities, prefix: 'priority' },
  ];

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
            className={FIELD_CLASS}
          />
        </label>

        {selects.map((field) => (
          <SelectField
            key={field.key}
            label={t(`filter.${field.key}`)}
            value={filters[field.key]}
            onChange={(value) => onChange(field.key, value)}
            options={field.options}
            allLabel={t('filter.all')}
            getLabel={(value) => t(`${field.prefix}.${value}`)}
          />
        ))}

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

      {isHighActiveOnly(filters) && (
        <p className="mt-2 text-xs text-muted">{t('filter.highActiveHint')}</p>
      )}
    </section>
  );
}
