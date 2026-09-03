import { useLanguage } from '../i18n/LanguageContext';
import { summarise } from '../utils/tickets';

export function KpiStrip({ tickets, filters, onToggle }) {
  const { t } = useLanguage();
  const stats = summarise(tickets);

  const cards = [
    {
      key: 'status',
      value: 'Open',
      label: t('kpi.open.label'),
      count: stats.open,
      note: t('kpi.open.note'),
      active: filters.status === 'Open',
    },
    {
      key: 'status',
      value: 'In Progress',
      label: t('kpi.inProgress.label'),
      count: stats.inProgress,
      note: t('kpi.inProgress.note'),
      active: filters.status === 'In Progress',
    },
    {
      key: 'priority',
      value: 'High',
      label: t('kpi.high.label'),
      count: stats.highActive,
      note: t('kpi.high.note'),
      active: filters.priority === 'High',
    },
    {
      key: 'unassignedOnly',
      value: true,
      label: t('kpi.unassigned.label'),
      count: stats.unassignedOpen,
      note: t('kpi.unassigned.note'),
      active: filters.unassignedOnly,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {cards.map((card) => (
        <button
          key={card.label}
          type="button"
          aria-pressed={card.active}
          onClick={() => onToggle(card.key, card.value)}
          className={`rounded-lg border px-4 py-3 text-left transition ${
            card.active
              ? 'border-ink bg-ink text-paper'
              : 'border-rule bg-card hover:border-stone-400'
          }`}
        >
          <p className={`text-xs font-medium ${card.active ? 'text-stone-300' : 'text-muted'}`}>
            {card.label}
          </p>
          <p className="mt-1 text-3xl font-semibold tracking-tight">{card.count}</p>
          <p className={`mt-1 text-xs ${card.active ? 'text-stone-300' : 'text-muted'}`}>
            {card.note}
          </p>
        </button>
      ))}
    </section>
  );
}
