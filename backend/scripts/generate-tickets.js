import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Curated dummy data for a mid-size Hong Kong residential / mixed-use estate.
 * Original assessment samples are ids 1–8 and kept verbatim.
 *
 * Distribution choices (see README):
 * - Open is the largest status bucket (work still needing dispatch)
 * - High priority stays uncommon
 * - Closed tickets skew older; Open tickets skew recent
 * - HVAC / Electrical / Plumbing dominate because they generate the most day-to-day calls
 */
const tickets = [
  { id: 1, title: 'Aircon leaking on 15/F', status: 'Open', category: 'HVAC', priority: 'High', created: '2026-06-01', location: 'Tower A · 15/F', assignedTo: 'Ken Wong' },
  { id: 2, title: 'Lobby light flickering', status: 'In Progress', category: 'Electrical', priority: 'Medium', created: '2026-06-03', location: 'Tower A · G/F lobby', assignedTo: 'Amy Chan' },
  { id: 3, title: 'Car park gate broken', status: 'Closed', category: 'Security', priority: 'High', created: '2026-05-28', location: 'Car park · B1', assignedTo: 'David Ho' },
  { id: 4, title: 'Water pump noise', status: 'Open', category: 'Plumbing', priority: 'Low', created: '2026-06-10', location: 'Plant room · B2', assignedTo: null },
  { id: 5, title: 'Lift button unresponsive', status: 'In Progress', category: 'Lift', priority: 'High', created: '2026-06-12', location: 'Tower B · Lift 2', assignedTo: 'Raj Patel' },
  { id: 6, title: 'Rooftop drain blocked', status: 'Open', category: 'Civil', priority: 'Medium', created: '2026-06-15', location: 'Tower A · rooftop', assignedTo: 'Mei Lin' },
  { id: 7, title: 'Fire alarm false trigger', status: 'Closed', category: 'Safety', priority: 'High', created: '2026-05-20', location: 'Tower B · 9/F', assignedTo: 'Sarah Cheung' },
  { id: 8, title: 'Office AC not cooling', status: 'Open', category: 'HVAC', priority: 'Medium', created: '2026-06-18', location: 'Podium · mgmt office', assignedTo: 'Ken Wong' },

  { id: 9, title: 'AHU filter overdue for replacement', status: 'Open', category: 'HVAC', priority: 'Low', created: '2026-07-02', location: 'Tower A · plant room', assignedTo: null },
  { id: 10, title: 'Chiller plant high-pressure alarm', status: 'Open', category: 'HVAC', priority: 'High', created: '2026-08-29', location: 'Podium · chiller plant', assignedTo: 'Ken Wong' },
  { id: 11, title: 'Clubhouse AC dripping onto floor', status: 'In Progress', category: 'HVAC', priority: 'Medium', created: '2026-07-21', location: 'Clubhouse · lounge', assignedTo: 'Amy Chan' },
  { id: 12, title: '22/F corridor AC running loudly', status: 'Open', category: 'HVAC', priority: 'Low', created: '2026-08-04', location: 'Tower B · 22/F', assignedTo: null },
  { id: 13, title: 'Rooftop condenser fan seized', status: 'Closed', category: 'HVAC', priority: 'Medium', created: '2026-05-22', location: 'Tower B · rooftop', assignedTo: 'Ken Wong' },
  { id: 14, title: 'Thermostat unresponsive in 7/F office', status: 'In Progress', category: 'HVAC', priority: 'Medium', created: '2026-08-11', location: 'Tower A · 7/F', assignedTo: 'Mei Lin' },
  { id: 15, title: 'Fresh air unit vibration on podium', status: 'Open', category: 'HVAC', priority: 'Low', created: '2026-08-19', location: 'Podium · FAU-03', assignedTo: 'Ken Wong' },
  { id: 16, title: 'Split-type AC icing up', status: 'Closed', category: 'HVAC', priority: 'Medium', created: '2026-06-08', location: 'Guardhouse', assignedTo: 'Amy Chan' },
  { id: 17, title: '3/F pantry AC will not start', status: 'Open', category: 'HVAC', priority: 'Medium', created: '2026-09-01', location: 'Tower A · 3/F', assignedTo: null },
  { id: 18, title: 'Cooling tower bleed valve stuck', status: 'In Progress', category: 'HVAC', priority: 'Medium', created: '2026-07-28', location: 'Tower A · rooftop', assignedTo: 'David Ho' },
  { id: 19, title: 'VRV outdoor unit oil leak', status: 'Open', category: 'HVAC', priority: 'Medium', created: '2026-08-22', location: 'Tower B · 12/F ledge', assignedTo: 'Ken Wong' },
  { id: 20, title: 'Server room temperature above setpoint', status: 'In Progress', category: 'HVAC', priority: 'High', created: '2026-08-27', location: 'Podium · server room', assignedTo: 'Amy Chan' },
  { id: 21, title: 'Gym AC has mouldy odour', status: 'Open', category: 'HVAC', priority: 'Low', created: '2026-07-14', location: 'Clubhouse · gym', assignedTo: 'Mei Lin' },
  { id: 22, title: '18/F living room AC remote unpaired', status: 'Closed', category: 'HVAC', priority: 'Low', created: '2026-05-30', location: 'Tower B · 18/F', assignedTo: 'Tom Ng' },

  { id: 23, title: 'Car park B2 emergency light out', status: 'Open', category: 'Electrical', priority: 'Medium', created: '2026-08-06', location: 'Car park · B2', assignedTo: 'Amy Chan' },
  { id: 24, title: '12/F socket has no power', status: 'In Progress', category: 'Electrical', priority: 'Medium', created: '2026-07-16', location: 'Tower A · 12/F', assignedTo: 'Tom Ng' },
  { id: 25, title: 'Main DB earth leakage trip', status: 'In Progress', category: 'Electrical', priority: 'High', created: '2026-08-30', location: 'Tower A · switch room', assignedTo: 'Amy Chan' },
  { id: 26, title: 'Staircase lighting timer faulty', status: 'Open', category: 'Electrical', priority: 'Low', created: '2026-07-09', location: 'Tower B · staircase C', assignedTo: null },
  { id: 27, title: 'Clubhouse spotlight overheating', status: 'Closed', category: 'Electrical', priority: 'Medium', created: '2026-06-02', location: 'Clubhouse · hall', assignedTo: 'Tom Ng' },
  { id: 28, title: 'Facade lighting dead on west elevation', status: 'Open', category: 'Electrical', priority: 'Low', created: '2026-08-13', location: 'Tower A · facade', assignedTo: 'Amy Chan' },
  { id: 29, title: 'Meter room buzzing continuously', status: 'Open', category: 'Electrical', priority: 'Medium', created: '2026-08-25', location: 'Tower B · 1/F meter room', assignedTo: null },
  { id: 30, title: '9/F switch sparking when used', status: 'Closed', category: 'Electrical', priority: 'High', created: '2026-05-26', location: 'Tower A · 9/F', assignedTo: 'Amy Chan' },
  { id: 31, title: 'Lift lobby LED panel dim', status: 'Open', category: 'Electrical', priority: 'Low', created: '2026-07-25', location: 'Tower B · 16/F lobby', assignedTo: 'Tom Ng' },
  { id: 32, title: 'Backup generator failed weekly test', status: 'In Progress', category: 'Electrical', priority: 'High', created: '2026-08-18', location: 'Podium · generator room', assignedTo: 'David Ho' },
  { id: 33, title: '5/F pantry isolator loose', status: 'Closed', category: 'Electrical', priority: 'Low', created: '2026-06-21', location: 'Tower A · 5/F', assignedTo: 'Tom Ng' },
  { id: 34, title: 'Exit sign not illuminated', status: 'Open', category: 'Electrical', priority: 'Medium', created: '2026-09-02', location: 'Podium · east corridor', assignedTo: null },
  { id: 35, title: 'Car park column light cycling on/off', status: 'In Progress', category: 'Electrical', priority: 'Low', created: '2026-07-07', location: 'Car park · B1', assignedTo: 'Amy Chan' },

  { id: 36, title: '16/F toilet leaking into 15/F ceiling', status: 'Open', category: 'Plumbing', priority: 'High', created: '2026-08-28', location: 'Tower A · 16/F', assignedTo: 'Mei Lin' },
  { id: 37, title: 'G/F flush valve running continuously', status: 'Open', category: 'Plumbing', priority: 'Low', created: '2026-07-11', location: 'Tower B · G/F toilet', assignedTo: null },
  { id: 38, title: 'No hot water at clubhouse showers', status: 'In Progress', category: 'Plumbing', priority: 'Medium', created: '2026-08-08', location: 'Clubhouse · changing room', assignedTo: 'Mei Lin' },
  { id: 39, title: 'Irrigation leak at podium planter', status: 'Open', category: 'Plumbing', priority: 'Low', created: '2026-08-16', location: 'Podium · garden', assignedTo: 'David Ho' },
  { id: 40, title: '4/F kitchen sink blocked', status: 'Closed', category: 'Plumbing', priority: 'Medium', created: '2026-06-05', location: 'Tower A · 4/F', assignedTo: 'Mei Lin' },
  { id: 41, title: 'Transfer pump pressure unstable', status: 'In Progress', category: 'Plumbing', priority: 'Medium', created: '2026-07-30', location: 'Plant room · B2', assignedTo: 'David Ho' },
  { id: 42, title: 'Roof tank overflow alarm', status: 'Closed', category: 'Plumbing', priority: 'High', created: '2026-05-24', location: 'Tower B · roof tank', assignedTo: 'Mei Lin' },
  { id: 43, title: '21/F bathroom wall seepage', status: 'Open', category: 'Plumbing', priority: 'Medium', created: '2026-08-21', location: 'Tower B · 21/F', assignedTo: 'Mei Lin' },
  { id: 44, title: 'Lobby drinking fountain dripping', status: 'Open', category: 'Plumbing', priority: 'Low', created: '2026-07-19', location: 'Tower A · G/F lobby', assignedTo: null },
  { id: 45, title: 'Condensate drain backing up on 11/F', status: 'In Progress', category: 'Plumbing', priority: 'Medium', created: '2026-08-03', location: 'Tower A · 11/F', assignedTo: 'Ken Wong' },
  { id: 46, title: 'Calorifier temperature below setpoint', status: 'Open', category: 'Plumbing', priority: 'Medium', created: '2026-09-01', location: 'Podium · plant room', assignedTo: 'Mei Lin' },

  { id: 47, title: 'Lift 2 door sensor obstruction', status: 'In Progress', category: 'Lift', priority: 'High', created: '2026-08-26', location: 'Tower A · Lift 2', assignedTo: 'Raj Patel' },
  { id: 48, title: 'Lift 3 unusual grinding noise', status: 'Open', category: 'Lift', priority: 'Medium', created: '2026-08-09', location: 'Tower B · Lift 3', assignedTo: 'Raj Patel' },
  { id: 49, title: 'Lift 1 floor indicator showing wrong floor', status: 'Open', category: 'Lift', priority: 'Low', created: '2026-07-06', location: 'Tower A · Lift 1', assignedTo: null },
  { id: 50, title: 'Service lift not levelling at B1', status: 'In Progress', category: 'Lift', priority: 'Medium', created: '2026-07-23', location: 'Tower A · service lift', assignedTo: 'Raj Patel' },
  { id: 51, title: 'Lift 4 intercom has no audio', status: 'Closed', category: 'Lift', priority: 'Medium', created: '2026-06-14', location: 'Tower B · Lift 4', assignedTo: 'Raj Patel' },
  { id: 52, title: 'Passenger lift slow to close doors', status: 'Open', category: 'Lift', priority: 'Low', created: '2026-08-14', location: 'Tower A · Lift 3', assignedTo: 'Tom Ng' },
  { id: 53, title: 'Lift pit water ingress', status: 'Open', category: 'Lift', priority: 'High', created: '2026-08-31', location: 'Tower B · Lift 1 pit', assignedTo: 'Raj Patel' },

  { id: 54, title: 'Tower B entrance CCTV no image', status: 'Open', category: 'Security', priority: 'Medium', created: '2026-08-07', location: 'Tower B · G/F', assignedTo: 'Sarah Cheung' },
  { id: 55, title: 'Staff door card reader intermittent', status: 'In Progress', category: 'Security', priority: 'Medium', created: '2026-07-18', location: 'Podium · staff entrance', assignedTo: 'Sarah Cheung' },
  { id: 56, title: 'Pedestrian gate not latching', status: 'Open', category: 'Security', priority: 'Medium', created: '2026-08-20', location: 'Estate · side gate', assignedTo: null },
  { id: 57, title: 'Guardhouse intercom static', status: 'Closed', category: 'Security', priority: 'Low', created: '2026-06-09', location: 'Guardhouse', assignedTo: 'David Ho' },
  { id: 58, title: 'Car park barrier arm bent', status: 'Open', category: 'Security', priority: 'Low', created: '2026-07-27', location: 'Car park · exit', assignedTo: 'David Ho' },
  { id: 59, title: 'Loading bay shutter jammed', status: 'In Progress', category: 'Security', priority: 'Medium', created: '2026-08-12', location: 'Podium · loading bay', assignedTo: 'David Ho' },
  { id: 60, title: 'Visitor tablet frozen on login', status: 'Closed', category: 'Security', priority: 'Low', created: '2026-05-31', location: 'Tower A · concierge', assignedTo: 'Sarah Cheung' },

  { id: 61, title: '10/F lobby floor tile cracked', status: 'Open', category: 'Civil', priority: 'Low', created: '2026-07-13', location: 'Tower A · 10/F lobby', assignedTo: null },
  { id: 62, title: 'False ceiling stain on 6/F corridor', status: 'In Progress', category: 'Civil', priority: 'Medium', created: '2026-08-01', location: 'Tower B · 6/F', assignedTo: 'Mei Lin' },
  { id: 63, title: 'External wall seepage on Tower A', status: 'Open', category: 'Civil', priority: 'Medium', created: '2026-08-17', location: 'Tower A · 8/F west', assignedTo: 'David Ho' },
  { id: 64, title: 'Podium expansion joint failed', status: 'Closed', category: 'Civil', priority: 'Medium', created: '2026-06-11', location: 'Podium · driveway', assignedTo: 'David Ho' },
  { id: 65, title: 'Staircase nosing loose', status: 'Open', category: 'Civil', priority: 'Low', created: '2026-07-29', location: 'Tower B · staircase A', assignedTo: 'Tom Ng' },
  { id: 66, title: 'Refuse room door frame rusted', status: 'Open', category: 'Civil', priority: 'Low', created: '2026-08-05', location: 'Tower A · G/F refuse', assignedTo: null },
  { id: 67, title: 'Clubhouse pool deck grout missing', status: 'Closed', category: 'Civil', priority: 'Low', created: '2026-05-27', location: 'Clubhouse · pool', assignedTo: 'Mei Lin' },

  { id: 68, title: 'Fire extinguisher overdue inspection', status: 'Open', category: 'Safety', priority: 'Medium', created: '2026-08-10', location: 'Car park · B1', assignedTo: 'Sarah Cheung' },
  { id: 69, title: 'Emergency exit light out on staircase A', status: 'In Progress', category: 'Safety', priority: 'Medium', created: '2026-08-15', location: 'Tower A · staircase A', assignedTo: 'Amy Chan' },
  { id: 70, title: 'Sprinkler head weeping on 14/F', status: 'Open', category: 'Safety', priority: 'High', created: '2026-09-02', location: 'Tower B · 14/F', assignedTo: 'Sarah Cheung' },
  { id: 71, title: 'Fire door not self-closing', status: 'Open', category: 'Safety', priority: 'High', created: '2026-08-24', location: 'Tower A · 8/F', assignedTo: null },
  { id: 72, title: 'Smoke detector fault in plant room', status: 'Closed', category: 'Safety', priority: 'Medium', created: '2026-06-16', location: 'Tower B · plant room', assignedTo: 'Sarah Cheung' },
];

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] ?? 'Unassigned';
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

const summary = {
  total: tickets.length,
  status: countBy(tickets, 'status'),
  category: countBy(tickets, 'category'),
  priority: countBy(tickets, 'priority'),
  unassigned: tickets.filter((ticket) => !ticket.assignedTo).length,
};

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../data');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'tickets.json'), `${JSON.stringify(tickets, null, 2)}\n`);
console.log(summary);
