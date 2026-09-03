import { summarise } from '../utils/tickets';

export function KpiStrip({ tickets, filters, onToggle }) {
  const stats = summarise(tickets);

  const cards = [
    {
      key: 'status',
      value: 'Open',
      label: 'Open',
      count: stats.open,
      note: 'Still in the queue',
      active: filters.status === 'Open',
    },
    {
      key: 'status',
      value: 'In Progress',
      label: 'In progress',
      count: stats.inProgress,
      note: 'Assigned and underway',
      active: filters.status === 'In Progress',
    },
    {
      key: 'priority',
      value: 'High',
      label: 'High · active',
      count: stats.highActive,
      note: 'Not yet closed',
      active: filters.priority === 'High',
    },
    {
      key: 'unassignedOnly',
      value: true,
      label: 'Unassigned',
      count: stats.unassignedOpen,
      note: 'Open with no technician',
      active: filters.unassignedOnly,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {cards.map((card) => (
        <button
          key={card.label}
          type="button"
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
