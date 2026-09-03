# Maintenance Ticket Dashboard

A small operations board for an estate duty manager / shift coordinator. It shows the live maintenance queue, lets them filter by status, category and priority, and lets them rearrange or hide widgets for the shift they are covering.

Built for the Butler Asia technical assessment: React frontend, Node/Express API, JSON dummy data.

## Who it is for

The primary user is not a resident logging a fault. It is the person standing in the management office who has to answer “what is on fire this morning?”

That person needs, at a glance:

- How many jobs are still **Open**
- How many **High** jobs are still active
- Which Open jobs have **no technician**
- A queue ordered for dispatch (high and open first), not just by created date

KPIs stay estate-wide so the numbers do not collapse when you filter. The widgets below follow the current filters so you can, for example, spend the morning on HVAC only.

## Quick start

Needs Node.js 18+.

```bash
npm install
npm run install:all
npm run dev
```

- API: http://localhost:3001/api/health
- App: http://localhost:5173

Or run the two apps yourself:

```bash
# terminal 1
cd backend
npm install
npm run dev

# terminal 2
cd frontend
npm install
npm run dev
```

## What you get

**API**

- `GET /api/tickets` — all tickets
- `GET /api/tickets?status=Open&category=HVAC&priority=High` — server-side filters
- `GET /api/tickets/summary` — counts by status / category / priority
- `GET /api/health`

The dashboard loads all tickets once and filters in the browser. With 72 records that is the right call: the duty manager should not wait on a round-trip every time they change a dropdown. The query-param API is still there to show how this would move server-side if the dataset grew.

**Board**

- KPI cards (click to toggle a filter)
- Instant filters: status, category, priority, unassigned, search
- Draggable widgets, show/hide, layout saved in `localStorage`
- Default queue sort: High → Open → newest

Widgets:

1. **Needs attention** — High and not closed, or Open with no assignee
2. **Work by trade** — volume by category
3. **Ticket queue** — full working list
4. **Recently raised** — newest six in the current filter

## Dummy data

`backend/data/tickets.json` has **72** tickets. Ids 1–8 are the assessment samples, unchanged except for two extra fields the office actually needs: `location` and `assignedTo`.

The rest is written against a fictional mid-size Hong Kong estate (Harbourview Residences), not random lorem ipsum. Regenerating:

```bash
cd backend
node scripts/generate-tickets.js
```

Distribution (deliberate, not uniform):

| Dimension | Shape | Why |
| --- | --- | --- |
| Status | Open 37 · In Progress 19 · Closed 16 | The live queue is the thing a manager acts on |
| Priority | High 15 · Medium 34 · Low 23 | High stays the minority |
| Category | HVAC / Electrical / Plumbing dominate; Lift, Security, Civil, Safety smaller | Matches day-to-day estate calls |
| Dates | Closed tickets skew older (May–June); Open tickets skew recent (Aug–Sep 2026) | A closed fire-alarm from May is plausible; a brand-new closed job on every row is not |
| Assignee | 14 unassigned, and only on Open jobs | In Progress / Closed always have an owner |

## Project layout

```text
backend/
  data/tickets.json
  scripts/generate-tickets.js
  src/
    server.js
    routes/tickets.js
    services/ticketService.js
frontend/
  src/
    components/          # board chrome, filters, badges
    components/widgets/  # one file per widget
    constants/
    hooks/
    utils/
```

Filtering lives in `ticketService.js` on the server and `useTickets.js` on the client. Widget order lives in `useDashboardLayout.js` so the grid is not mixed up with data fetching.

## Design choices worth walking through

- **Widgets, not column-drag on a table.** The brief said “columns or widgets”. A duty manager cares more about which panels are on the board than about column order. Drag handles are labelled “Drag” on purpose — a grip icon alone is easy to miss.
- **No database, no Redux.** Dummy JSON plus React state. A database would be theatre for 72 rows.
- **CSS bars instead of a chart library.** Category volume is a count, not a visualisation problem.
- **`location` / `assignedTo`.** The original schema cannot answer “where?” or “who owns this?” Those are the first two questions in the office.

## Scripts

| Command | Where | What |
| --- | --- | --- |
| `npm run dev` | repo root | API + Vite together |
| `npm run dev` | `backend/` | Express with `--watch` |
| `npm run dev` | `frontend/` | Vite + proxy `/api` → `:3001` |
