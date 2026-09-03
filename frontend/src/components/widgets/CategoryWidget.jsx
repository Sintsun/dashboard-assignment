import { CATEGORIES } from '../../constants/tickets';
import { countBy } from '../../utils/tickets';

export function CategoryWidget({ tickets }) {
  const counts = countBy(tickets, 'category');
  const max = Math.max(1, ...Object.values(counts));

  return (
    <ul className="space-y-2">
      {CATEGORIES.map((category) => {
        const count = counts[category] ?? 0;
        const width = `${(count / max) * 100}%`;

        return (
          <li key={category} className="grid grid-cols-[7rem_1fr_1.5rem] items-center gap-2 text-sm">
            <span className="truncate">{category}</span>
            <span className="h-2 rounded bg-stone-200">
              <span className="block h-2 rounded bg-ink" style={{ width }} />
            </span>
            <span className="text-right text-xs tabular-nums text-muted">{count}</span>
          </li>
        );
      })}
    </ul>
  );
}
