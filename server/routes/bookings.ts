import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

export const bookingsRouter = Router();

// Public: create booking
bookingsRouter.post('/', (req, res) => {
  const { name, phone, email, line_id } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const result = getDb().prepare(
    'INSERT INTO bookings (name, phone, email, line_id) VALUES (?, ?, ?, ?)'
  ).run(name, phone, email, line_id);
  res.json({ id: result.lastInsertRowid, message: '感謝您的報名，專員將儘速與您聯繫！' });
});

// Admin: list bookings
bookingsRouter.get('/admin', requireAuth, (_req, res) => {
  const rows = getDb().prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
  res.json(rows);
});

// Admin: update status
bookingsRouter.put('/admin/:id', requireAuth, (req, res) => {
  const { status } = req.body;
  getDb().prepare('UPDATE bookings SET status=? WHERE id=?').run(status, req.params.id);
  res.json({ ok: true });
});
