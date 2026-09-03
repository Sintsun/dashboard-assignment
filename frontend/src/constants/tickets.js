export const STATUSES = ['Open', 'In Progress', 'Closed'];
export const PRIORITIES = ['High', 'Medium', 'Low'];
export const CATEGORIES = [
  'HVAC',
  'Electrical',
  'Plumbing',
  'Lift',
  'Security',
  'Civil',
  'Safety',
];

export const STATUS_TONE = {
  Open: {
    label: 'Open',
    className: 'bg-rose-100 text-rose-800',
    dot: 'bg-rose-600',
  },
  'In Progress': {
    label: 'In progress',
    className: 'bg-amber-100 text-amber-900',
    dot: 'bg-amber-500',
  },
  Closed: {
    label: 'Closed',
    className: 'bg-teal-100 text-teal-800',
    dot: 'bg-teal-700',
  },
};

export const PRIORITY_TONE = {
  High: 'bg-rose-700 text-white',
  Medium: 'bg-amber-200 text-amber-950',
  Low: 'bg-stone-200 text-stone-700',
};

export const STATUS_RANK = { Open: 0, 'In Progress': 1, Closed: 2 };
export const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };
