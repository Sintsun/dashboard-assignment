import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../constants/tickets';
import { compareForDispatch } from '../utils/tickets';

const emptyFilters = {
  status: '',
  category: '',
  priority: '',
  unassignedOnly: false,
  search: '',
};

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/tickets', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load tickets from the API.');
        }
        return response.json();
      })
      .then((payload) => {
        setTickets(payload.tickets);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return tickets
      .filter((ticket) => {
        if (filters.status && ticket.status !== filters.status) return false;
        if (filters.category && ticket.category !== filters.category) return false;
        if (filters.priority && ticket.priority !== filters.priority) return false;
        if (
          filters.priority === 'High' &&
          !filters.status &&
          ticket.status === 'Closed'
        ) {
          return false;
        }
        if (filters.unassignedOnly && ticket.assignedTo) return false;
        if (query) {
          const haystack = `${ticket.title} ${ticket.location} ${ticket.assignedTo ?? ''}`.toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      })
      .sort(compareForDispatch);
  }, [tickets, filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const toggleFilter = (key, value) => {
    setFilters((current) => {
      if (key === 'unassignedOnly') {
        return { ...current, unassignedOnly: !current.unassignedOnly };
      }
      // High KPI is "not yet closed". Clear status so Closed highs do not sneak in.
      if (key === 'priority' && value === 'High') {
        const turningOn = current.priority !== 'High' || current.status;
        return {
          ...current,
          priority: turningOn ? 'High' : '',
          status: '',
        };
      }
      return { ...current, [key]: current[key] === value ? '' : value };
    });
  };

  const clearFilters = () => setFilters(emptyFilters);

  return {
    tickets,
    filtered,
    filters,
    updateFilter,
    toggleFilter,
    clearFilters,
    loading,
    error,
    options: {
      statuses: STATUSES,
      categories: CATEGORIES,
      priorities: PRIORITIES,
    },
  };
}
