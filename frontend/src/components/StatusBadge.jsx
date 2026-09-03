import { STATUS_TONE } from '../constants/tickets';

export function StatusBadge({ status }) {
  const tone = STATUS_TONE[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${tone.className}`}
    >
      <span className={`size-1.5 rounded-full ${tone.dot}`} />
      {tone.label}
    </span>
  );
}
