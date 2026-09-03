import { useLanguage } from '../i18n/LanguageContext';
import { isHighActiveOnly } from '../utils/filters';
import { summarise } from '../utils/tickets';
import { KpiCard } from './KpiCard';

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
      active: isHighActiveOnly(filters),
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
        <KpiCard
          key={card.label}
          label={card.label}
          count={card.count}
          note={card.note}
          active={card.active}
          onClick={() => onToggle(card.key, card.value)}
        />
      ))}
    </section>
  );
}
