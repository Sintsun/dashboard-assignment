import { useLanguage } from '../i18n/LanguageContext';
import { daysOpen, formatDate, isStaleTicket } from '../utils/dates';

export function AgeLabel({ ticket, withDate = false }) {
  const { lang, t } = useLanguage();
  const stale = isStaleTicket(ticket);
  const age = t('age.days', { n: daysOpen(ticket.created) });

  return (
    <span
      title={stale ? t('age.stale') : undefined}
      className={`tabular-nums ${stale ? 'font-semibold text-rose-800' : 'text-muted'}`}
    >
      {withDate ? `${formatDate(ticket.created, lang)} · ${age}` : age}
    </span>
  );
}

export function AssigneeLabel({ ticket }) {
  const { t } = useLanguage();
  return ticket.assignedTo ?? t('unassigned');
}
