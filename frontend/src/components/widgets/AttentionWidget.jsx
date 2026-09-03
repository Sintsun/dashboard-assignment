import { formatDate } from '../../utils/dates';
import { needsAttention } from '../../utils/tickets';
import { PriorityBadge } from '../PriorityBadge';
import { StatusBadge } from '../StatusBadge';

export function AttentionWidget({ tickets }) {
  const items = tickets.filter(needsAttention).slice(0, 8);

  if (items.length === 0) {
    return <p className="text-sm text-muted">Nothing urgent in the current filter.</p>;
  }

  return (
    <ul className="divide-y divide-rule">
      {items.map((ticket) => (
        <li key={ticket.id} className="flex items-start justify-between gap-3 py-2 first:pt-0 last:pb-0">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{ticket.title}</p>
            <p className="text-xs text-muted">
              {ticket.location}
              {ticket.assignedTo ? ` · ${ticket.assignedTo}` : ' · Unassigned'}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
            <span className="text-[11px] text-muted">{formatDate(ticket.created)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
