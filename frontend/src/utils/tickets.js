import { PRIORITY_RANK, STATUS_RANK } from '../constants/tickets';

export function uniqueValues(tickets, key) {
  return [...new Set(tickets.map((ticket) => ticket[key]))];
}

export function compareForDispatch(a, b) {
  const byPriority = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  if (byPriority !== 0) return byPriority;

  const byStatus = STATUS_RANK[a.status] - STATUS_RANK[b.status];
  if (byStatus !== 0) return byStatus;

  return b.created.localeCompare(a.created);
}

export function needsAttention(ticket) {
  const highAndOpen = ticket.priority === 'High' && ticket.status !== 'Closed';
  const unassignedOpen = ticket.status === 'Open' && !ticket.assignedTo;
  return highAndOpen || unassignedOpen;
}

export function countBy(tickets, key) {
  return tickets.reduce((acc, ticket) => {
    const value = ticket[key];
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

export function summarise(tickets) {
  return {
    open: tickets.filter((ticket) => ticket.status === 'Open').length,
    inProgress: tickets.filter((ticket) => ticket.status === 'In Progress').length,
    highActive: tickets.filter(
      (ticket) => ticket.priority === 'High' && ticket.status !== 'Closed',
    ).length,
    unassignedOpen: tickets.filter(
      (ticket) => ticket.status === 'Open' && !ticket.assignedTo,
    ).length,
  };
}
