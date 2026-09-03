import { useCallback, useEffect, useMemo, useState } from 'react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../constants/tickets';
import { matchesFilters } from '../utils/filters';
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
  const [retryCount, setRetryCount] = useState(0);

  const loadTickets = useCallback((signal) => {
    setLoading(true);
    setError(null);

    return fetch('/api/tickets', { signal })
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
        if (!signal.aborted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadTickets(controller.signal);
    return () => controller.abort();
  }, [loadTickets, retryCount]);

  const retry = () => setRetryCount((count) => count + 1);

  const filtered = useMemo(
    () => tickets.filter((ticket) => matchesFilters(ticket, filters)).sort(compareForDispatch),
    [tickets, filters],
  );

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const toggleFilter = (key, value) => {
    setFilters((current) => {
      if (key === 'unassignedOnly') {
        return { ...current, unassignedOnly: !current.unassignedOnly };
      }
      if (key === 'priority' && value === 'High') {
        const turningOn = current.priority !== 'High' || current.status;
        return { ...current, priority: turningOn ? 'High' : '', status: '' };
      }
      return { ...current, [key]: current[key] === value ? '' : value };
    });
  };

  return {
    tickets,
    filtered,
    filters,
    updateFilter,
    toggleFilter,
    clearFilters: () => setFilters(emptyFilters),
    loading,
    error,
    retry,
    options: { statuses: STATUSES, categories: CATEGORIES, priorities: PRIORITIES },
  };
}
