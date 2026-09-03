import { Router } from 'express';
import { filterTickets, getAllTickets, summariseTickets } from '../services/ticketService.js';

export const ticketsRouter = Router();

ticketsRouter.get('/', (req, res) => {
  const { status, category, priority } = req.query;
  const tickets = filterTickets(getAllTickets(), { status, category, priority });
  res.json({ tickets, count: tickets.length });
});

ticketsRouter.get('/summary', (_req, res) => {
  res.json(summariseTickets(getAllTickets()));
});
