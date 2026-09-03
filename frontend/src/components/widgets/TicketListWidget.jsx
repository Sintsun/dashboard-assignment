import { useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { daysOpen, formatDate } from '../../utils/dates';
import { isActiveHigh } from '../../utils/tickets';
import { AgeLabel, AssigneeLabel } from '../AgeLabel';
import { EmptyState } from '../EmptyState';
import { PriorityBadge } from '../PriorityBadge';
import { StatusBadge } from '../StatusBadge';
import { TicketCard } from '../TicketCard';

function AgeSortButton({ ageFirst, onToggle }) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={ageFirst}
      title={ageFirst ? t('age.sortActive') : t('age.sort')}
      className={`rounded border border-rule px-2 py-1 text-xs font-medium ${
        ageFirst ? 'bg-ink text-paper' : 'bg-paper text-muted hover:text-ink'
      }`}
    >
      {t('table.age')}: {ageFirst ? t('age.oldest') : t('age.sort')}
    </button>
  );
}

export function TicketListWidget({ tickets }) {
  const { lang, t } = useLanguage();
  const [ageFirst, setAgeFirst] = useState(false);

  const rows = useMemo(() => {
    if (!ageFirst) return tickets;
    return [...tickets].sort((a, b) => daysOpen(b.created) - daysOpen(a.created));
  }, [tickets, ageFirst]);

  if (tickets.length === 0) {
    return <EmptyState>{t('empty.tickets')}</EmptyState>;
  }

  const toggleAgeSort = () => setAgeFirst((current) => !current);

  return (
    <>
      <div className="mb-2 flex justify-end md:hidden">
        <AgeSortButton ageFirst={ageFirst} onToggle={toggleAgeSort} />
      </div>

      <div className="grid gap-2 md:hidden">
        {rows.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
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
                  onClick={toggleAgeSort}
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
            {rows.map((ticket) => (
              <tr
                key={ticket.id}
                className={`border-b border-rule last:border-0 ${
                  isActiveHigh(ticket) ? 'bg-rose-50/70' : ''
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
                <td className="py-2 pr-3 text-muted">
                  <AssigneeLabel ticket={ticket} />
                </td>
                <td className="py-2 whitespace-nowrap text-muted">
                  {formatDate(ticket.created, lang)}
                </td>
                <td className="py-2 pr-1">
                  <AgeLabel ticket={ticket} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
