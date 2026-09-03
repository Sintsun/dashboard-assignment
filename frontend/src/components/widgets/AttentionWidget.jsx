import { useLanguage } from '../../i18n/LanguageContext';
import { needsAttention } from '../../utils/tickets';
import { AgeLabel, AssigneeLabel } from '../AgeLabel';
import { EmptyState } from '../EmptyState';
import { TicketBadges } from '../TicketBadges';

export function AttentionWidget({ tickets }) {
  const { t } = useLanguage();
  const items = tickets.filter(needsAttention).slice(0, 8);

  if (items.length === 0) {
    return <EmptyState>{t('empty.attention')}</EmptyState>;
  }

  return (
    <ul className="divide-y divide-rule">
      {items.map((ticket) => (
        <li
          key={ticket.id}
          className="flex items-start justify-between gap-3 py-2 first:pt-0 last:pb-0"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{ticket.title}</p>
            <p className="text-xs text-muted">
              {ticket.location} · <AssigneeLabel ticket={ticket} />
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <TicketBadges ticket={ticket} />
            <span className="text-[11px]">
              <AgeLabel ticket={ticket} withDate />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
