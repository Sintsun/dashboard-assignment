import { useLanguage } from '../../i18n/LanguageContext';
import { formatDate } from '../../utils/dates';
import { EmptyState } from '../EmptyState';
import { TicketBadges } from '../TicketBadges';

export function RecentWidget({ tickets }) {
  const { lang, t } = useLanguage();
  const items = [...tickets]
    .sort((a, b) => b.created.localeCompare(a.created) || b.id - a.id)
    .slice(0, 6);

  if (items.length === 0) {
    return <EmptyState>{t('empty.recent')}</EmptyState>;
  }

  return (
    <ol className="grid gap-2 sm:grid-cols-2">
      {items.map((ticket, index) => (
        <li key={ticket.id} className="rounded border border-rule bg-paper px-3 py-2">
          <p className="text-[11px] font-medium tracking-wide text-muted">
            {index + 1} · {formatDate(ticket.created, lang)}
          </p>
          <p className="mt-1 text-sm font-medium">{ticket.title}</p>
          <p className="text-xs text-muted">{ticket.location}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <TicketBadges ticket={ticket} />
          </div>
        </li>
      ))}
    </ol>
  );
}
