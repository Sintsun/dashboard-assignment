import { STATUS_TONE } from '../constants/tickets';
import { useLanguage } from '../i18n/LanguageContext';

export function StatusBadge({ status }) {
  const { t } = useLanguage();
  const tone = STATUS_TONE[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${tone.className}`}
    >
      <span className={`size-1.5 rounded-full ${tone.dot}`} />
      {t(`status.${status}`)}
    </span>
  );
}
