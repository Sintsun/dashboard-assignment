import { useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { daysOpen, formatDate, isStaleTicket } from '../../utils/dates';
import { PriorityBadge } from '../PriorityBadge';
import { StatusBadge } from '../StatusBadge';

export function TicketListWidget({ tickets }) {
  const { lang, t } = useLanguage();
  const [ageFirst, setAgeFirst] = useState(false);

  const rows = useMemo(() => {
    if (!ageFirst) return tickets;
    return [...tickets].sort((a, b) => daysOpen(b.created) - daysOpen(a.created));
  }, [tickets, ageFirst]);

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
            <th className="pb-2 font-medium">
              <button
                type="button"
                onClick={() => setAgeFirst((current) => !current)}
                aria-pressed={ageFirst}
                title={ageFirst ? t('age.sortActive') : t('age.sort')}
                className={`inline-flex cursor-pointer items-center gap-1 hover:text-ink ${
                  ageFirst ? 'font-semibold text-ink' : 'font-medium'
                }`}
              >
                <span className="uppercase tracking-wide">{t('table.age')}</span>
                <span className="text-[10px] font-medium tracking-normal normal-case text-muted">
                  {ageFirst ? t('age.oldest') : '↕'}
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((ticket) => {
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
