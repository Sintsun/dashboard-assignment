import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dataPath = join(dirname(fileURLToPath(import.meta.url)), '../../data/tickets.json');

let cachedTickets = null;

export function getAllTickets() {
  if (!cachedTickets) {
    cachedTickets = JSON.parse(readFileSync(dataPath, 'utf8'));
  }
  return cachedTickets;
}

export function filterTickets(tickets, { status, category, priority } = {}) {
  return tickets.filter((ticket) => {
    if (status && ticket.status !== status) return false;
    if (category && ticket.category !== category) return false;
    if (priority && ticket.priority !== priority) return false;
    return true;
  });
}

function countBy(tickets, key) {
  return tickets.reduce((acc, ticket) => {
    const value = ticket[key];
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

export function summariseTickets(tickets) {
  const open = tickets.filter((ticket) => ticket.status === 'Open');
  const activeHigh = tickets.filter(
    (ticket) => ticket.priority === 'High' && ticket.status !== 'Closed',
  );
  const unassignedOpen = open.filter((ticket) => !ticket.assignedTo);

  return {
    total: tickets.length,
    byStatus: countBy(tickets, 'status'),
    byCategory: countBy(tickets, 'category'),
    byPriority: countBy(tickets, 'priority'),
    openCount: open.length,
    highPriorityActive: activeHigh.length,
    unassignedOpen: unassignedOpen.length,
  };
}
