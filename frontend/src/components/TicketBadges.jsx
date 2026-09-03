import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';

export function TicketBadges({ ticket }) {
  return (
    <>
      <PriorityBadge priority={ticket.priority} />
      <StatusBadge status={ticket.status} />
    </>
  );
}
