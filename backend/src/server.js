import cors from 'cors';
import express from 'express';
import { ticketsRouter } from './routes/tickets.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/tickets', ticketsRouter);

app.listen(port, () => {
  console.log(`Butler dashboard API running on http://localhost:${port}`);
});
