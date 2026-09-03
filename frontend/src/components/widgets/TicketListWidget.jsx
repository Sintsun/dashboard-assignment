import { useLanguage } from '../../i18n/LanguageContext';
import { daysOpen, formatDate, isStaleTicket } from '../../utils/dates';
import { PriorityBadge } from '../PriorityBadge';
import { StatusBadge } from '../StatusBadge';

export function TicketListWidget({ tickets }) {
  const { lang, t } = useLanguage();

  if (tickets.length === 0) {
    return <p className="text-sm text-muted">{t('empty.tickets')}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-rule text-xs tracking-wide text-muted uppercase">
            <th className="pb-2 font-medium">{t('table.priority')}</th>
            <th className="pb-2 font-medium">{t('table.title')}</th>
            <th className="pb-2 font-medium">{t('table.location')}</th>
            <th className="pb-2 font-medium">{t('table.trade')}</th>
            <th className="pb-2 font-medium">{t('table.status')}</th>
            <th className="pb-2 font-medium">{t('table.assigned')}</th>
            <th className="pb-2 font-medium">{t('table.raised')}</th>
            <th className="pb-2 font-medium">{t('table.age')}</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const stale = isStaleTicket(ticket);
            return (
              <tr
                key={ticket.id}
                className={`border-b border-rule last:border-0 ${
                  ticket.priority === 'High' && ticket.status !== 'Closed' ? 'bg-rose-50/70' : ''
                }`}
              >
                <td className="py-2 pr-3">
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td className="py-2 pr-3 font-medium">{ticket.title}</td>
                <td className="py-2 pr-3 text-muted">{ticket.location}</td>
                <td className="py-2 pr-3">{t(`category.${ticket.category}`)}</td>
                <td className="py-2 pr-3">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="py-2 pr-3 text-muted">{ticket.assignedTo ?? t('unassigned')}</td>
                <td className="py-2 whitespace-nowrap text-muted">{formatDate(ticket.created, lang)}</td>
                <td className="py-2 pr-1">
                  <span
                    title={stale ? t('age.stale') : undefined}
                    className={`tabular-nums ${stale ? 'font-semibold text-rose-800' : 'text-muted'}`}
                  >
                    {t('age.days', { n: daysOpen(ticket.created) })}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
