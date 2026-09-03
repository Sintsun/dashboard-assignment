const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(isoDate, lang = 'en') {
  const date = parseIsoDate(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (lang === 'zh') {
    return `${year}年${month + 1}月${day}日`;
  }

  return `${day} ${months[month]} ${year}`;
}

export function daysOpen(isoDate, now = new Date()) {
  const created = parseIsoDate(isoDate);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today - created) / 86_400_000));
}

export const STALE_AFTER_DAYS = 30;

export function isStaleTicket(ticket, now = new Date()) {
  return ticket.status !== 'Closed' && daysOpen(ticket.created, now) >= STALE_AFTER_DAYS;
}
