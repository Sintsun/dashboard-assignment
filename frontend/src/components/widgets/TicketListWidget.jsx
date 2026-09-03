import { formatDate } from '../../utils/dates';
import { PriorityBadge } from '../PriorityBadge';
import { StatusBadge } from '../StatusBadge';

export function TicketListWidget({ tickets }) {
  if (tickets.length === 0) {
    return <p className="text-sm text-muted">No tickets match the current filters.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-rule text-xs tracking-wide text-muted uppercase">
            <th className="pb-2 font-medium">Priority</th>
            <th className="pb-2 font-medium">Title</th>
            <th className="pb-2 font-medium">Location</th>
            <th className="pb-2 font-medium">Trade</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Assigned</th>
            <th className="pb-2 font-medium">Raised</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className={`border-b border-rule last:border-0 ${
                ticket.priority === 'High' && ticket.status !== 'Closed' ? 'bg-rose-50/70' : ''
              }`}
            >
              <td className="py-2 pr-3">
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className="py-2 pr-3 font-medium">{ticket.title}</td>
              <td className="py-2 pr-3 text-muted">{ticket.location}</td>
              <td className="py-2 pr-3">{ticket.category}</td>
              <td className="py-2 pr-3">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="py-2 pr-3 text-muted">{ticket.assignedTo ?? '—'}</td>
              <td className="py-2 whitespace-nowrap text-muted">{formatDate(ticket.created)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
