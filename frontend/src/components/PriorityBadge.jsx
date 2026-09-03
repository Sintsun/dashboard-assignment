import { PRIORITY_TONE } from '../constants/tickets';
import { useLanguage } from '../i18n/LanguageContext';

export function PriorityBadge({ priority }) {
  const { t } = useLanguage();

  return (
    <span
      className={`inline-flex min-w-14 justify-center rounded px-1.5 py-0.5 text-[11px] font-semibold tracking-wide ${PRIORITY_TONE[priority]}`}
    >
      {t(`priority.${priority}`)}
    </span>
  );
}
