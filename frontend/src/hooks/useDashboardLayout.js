import { useEffect, useState } from 'react';

export const WIDGET_CATALOG = [
  {
    id: 'attention',
    title: 'Needs attention',
    hint: 'High priority or unassigned open jobs',
    span: 1,
  },
  {
    id: 'categories',
    title: 'Work by trade',
    hint: 'Where the queue is concentrating',
    span: 1,
  },
  {
    id: 'tickets',
    title: 'Ticket queue',
    hint: 'Sorted for dispatch: high and open first',
    span: 2,
  },
  {
    id: 'recent',
    title: 'Recently raised',
    hint: 'Newest tickets on the estate',
    span: 2,
  },
];

const STORAGE_KEY = 'harbourview-dashboard-layout';
const DEFAULT_ORDER = WIDGET_CATALOG.map((widget) => widget.id);
const DEFAULT_HIDDEN = [];

function readLayout() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { order: DEFAULT_ORDER, hidden: DEFAULT_HIDDEN };

    const parsed = JSON.parse(raw);
    const knownIds = new Set(DEFAULT_ORDER);
    const order = parsed.order.filter((id) => knownIds.has(id));
    DEFAULT_ORDER.forEach((id) => {
      if (!order.includes(id)) order.push(id);
    });

    return {
      order,
      hidden: (parsed.hidden ?? []).filter((id) => knownIds.has(id)),
    };
  } catch {
    return { order: DEFAULT_ORDER, hidden: DEFAULT_HIDDEN };
  }
}

export function useDashboardLayout() {
  const [layout, setLayout] = useState(readLayout);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }, [layout]);

  const reorder = (activeId, overId) => {
    setLayout((current) => {
      const order = [...current.order];
      const from = order.indexOf(activeId);
      const to = order.indexOf(overId);
      if (from < 0 || to < 0) return current;
      order.splice(from, 1);
      order.splice(to, 0, activeId);
      return { ...current, order };
    });
  };

  const toggleWidget = (id) => {
    setLayout((current) => {
      const hidden = current.hidden.includes(id)
        ? current.hidden.filter((item) => item !== id)
        : [...current.hidden, id];
      return { ...current, hidden };
    });
  };

  const resetLayout = () => setLayout({ order: DEFAULT_ORDER, hidden: DEFAULT_HIDDEN });

  const visibleWidgets = layout.order
    .filter((id) => !layout.hidden.includes(id))
    .map((id) => WIDGET_CATALOG.find((widget) => widget.id === id));

  return {
    layout,
    visibleWidgets,
    reorder,
    toggleWidget,
    resetLayout,
  };
}
