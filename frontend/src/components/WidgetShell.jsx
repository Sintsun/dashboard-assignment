import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useLanguage } from '../i18n/LanguageContext';

export function WidgetShell({ id, title, hint, span, children }) {
  const { t } = useLanguage();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    gridColumn: span === 2 ? '1 / -1' : 'auto',
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border border-rule bg-card ${isDragging ? 'z-10 shadow-lg' : ''}`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-rule px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-muted">{hint}</p>
        </div>
        <button
          type="button"
          className="cursor-grab rounded border border-rule px-2 py-1 text-[11px] font-medium tracking-wide text-muted uppercase active:cursor-grabbing"
          aria-label={t('widgets.dragAria', { title })}
          {...attributes}
          {...listeners}
        >
          {t('widgets.drag')}
        </button>
      </header>
      <div className="p-4">{children}</div>
    </article>
  );
}
