import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

export const coachesRouter = Router();

// Public: active coaches only
coachesRouter.get('/', (_req, res) => {
  const rows = getDb().prepare('SELECT * FROM coaches WHERE is_active = 1 ORDER BY sort_order').all();
  res.json(rows);
});

// Admin: all coaches
coachesRouter.get('/admin', requireAuth, (_req, res) => {
  const rows = getDb().prepare('SELECT * FROM coaches ORDER BY sort_order').all();
  res.json(rows);
});

// Admin: create
coachesRouter.post('/', requireAuth, (req, res) => {
  const { name, title, specialty, certifications, photo_url, sort_order } = req.body;
  const result = getDb().prepare(
    'INSERT INTO coaches (name, title, specialty, certifications, photo_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(name, title, specialty, certifications, photo_url, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

// Admin: update
coachesRouter.put('/:id', requireAuth, (req, res) => {
  const { name, title, specialty, certifications, photo_url, sort_order, is_active } = req.body;
  getDb().prepare(
    'UPDATE coaches SET name=?, title=?, specialty=?, certifications=?, photo_url=?, sort_order=?, is_active=? WHERE id=?'
  ).run(name, title, specialty, certifications, photo_url, sort_order || 0, is_active ?? 1, req.params.id);
  res.json({ ok: true });
});

// Admin: delete
coachesRouter.delete('/:id', requireAuth, (req, res) => {
  getDb().prepare('DELETE FROM coaches WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});
