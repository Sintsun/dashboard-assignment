import { PRIORITY_TONE } from '../constants/tickets';

export function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex min-w-14 justify-center rounded px-1.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${PRIORITY_TONE[priority]}`}
    >
      {priority}
    </span>
  );
}
