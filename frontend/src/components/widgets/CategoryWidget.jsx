import { CATEGORIES } from '../../constants/tickets';
import { useLanguage } from '../../i18n/LanguageContext';
import { countBy } from '../../utils/tickets';

export function CategoryWidget({ tickets, selectedCategory, onToggleCategory }) {
  const { t } = useLanguage();
  const counts = countBy(tickets, 'category');
  const max = Math.max(1, ...Object.values(counts));

  return (
    <ul className="space-y-1">
      {CATEGORIES.map((category) => {
        const count = counts[category] ?? 0;
        const width = `${(count / max) * 100}%`;
        const active = selectedCategory === category;

        return (
          <li key={category}>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => onToggleCategory(category)}
              className={`grid w-full grid-cols-[7rem_1fr_1.5rem] items-center gap-2 rounded px-1.5 py-1.5 text-left text-sm transition ${
                active ? 'bg-ink text-paper' : 'hover:bg-paper'
              }`}
            >
              <span className="truncate">{t(`category.${category}`)}</span>
              <span className={`h-2 rounded ${active ? 'bg-stone-600' : 'bg-stone-200'}`}>
                <span
                  className={`block h-2 rounded ${active ? 'bg-paper' : 'bg-ink'}`}
                  style={{ width }}
                />
              </span>
              <span className={`text-right text-xs tabular-nums ${active ? 'text-stone-300' : 'text-muted'}`}>
                {count}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
