export function matchesFilters(ticket, filters) {
  if (filters.status && ticket.status !== filters.status) return false;
  if (filters.category && ticket.category !== filters.category) return false;
  if (filters.priority && ticket.priority !== filters.priority) return false;
  if (isHighActiveOnly(filters) && ticket.status === 'Closed') return false;
  if (filters.unassignedOnly && ticket.assignedTo) return false;

  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack = `${ticket.title} ${ticket.location} ${ticket.assignedTo ?? ''}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  return true;
}

export function isHighActiveOnly(filters) {
  return filters.priority === 'High' && !filters.status;
}
