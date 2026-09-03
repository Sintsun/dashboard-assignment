import { formatDate } from '../../utils/dates';
import { PriorityBadge } from '../PriorityBadge';
import { StatusBadge } from '../StatusBadge';

export function RecentWidget({ tickets }) {
  const items = [...tickets]
    .sort((a, b) => b.created.localeCompare(a.created) || b.id - a.id)
    .slice(0, 6);

  if (items.length === 0) {
    return <p className="text-sm text-muted">No tickets in the current filter.</p>;
  }

  return (
    <ol className="grid gap-2 sm:grid-cols-2">
      {items.map((ticket, index) => (
        <li key={ticket.id} className="rounded border border-rule bg-paper px-3 py-2">
          <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
            {index + 1} · {formatDate(ticket.created)}
          </p>
          <p className="mt-1 text-sm font-medium">{ticket.title}</p>
          <p className="text-xs text-muted">{ticket.location}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </li>
      ))}
    </ol>
  );
}
