import { useLanguage } from '../i18n/LanguageContext';
import { formatDate } from '../utils/dates';
import { isActiveHigh } from '../utils/tickets';
import { AgeLabel, AssigneeLabel } from './AgeLabel';
import { TicketBadges } from './TicketBadges';

export function TicketCard({ ticket }) {
  const { lang, t } = useLanguage();

  return (
    <article
      className={`rounded border border-rule bg-paper px-3 py-2.5 ${
        isActiveHigh(ticket) ? 'border-rose-200 bg-rose-50/70' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium leading-snug">{ticket.title}</p>
        <TicketBadges ticket={ticket} />
      </div>
      <p className="mt-1 text-xs text-muted">{ticket.location}</p>
      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <div>
          <dt className="text-muted">{t('table.trade')}</dt>
          <dd>{t(`category.${ticket.category}`)}</dd>
        </div>
        <div>
          <dt className="text-muted">{t('table.assigned')}</dt>
          <dd>
            <AssigneeLabel ticket={ticket} />
          </dd>
        </div>
        <div>
          <dt className="text-muted">{t('table.raised')}</dt>
          <dd>{formatDate(ticket.created, lang)}</dd>
        </div>
        <div>
          <dt className="text-muted">{t('table.age')}</dt>
          <dd>
            <AgeLabel ticket={ticket} />
          </dd>
        </div>
      </dl>
    </article>
  );
}
