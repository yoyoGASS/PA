import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

export const coursesRouter = Router();

// Public
coursesRouter.get('/', (_req, res) => {
  const rows = getDb().prepare('SELECT * FROM courses WHERE is_active = 1 ORDER BY sort_order').all();
  res.json(rows);
});

// Admin: all
coursesRouter.get('/admin', requireAuth, (_req, res) => {
  const rows = getDb().prepare('SELECT * FROM courses ORDER BY sort_order').all();
  res.json(rows);
});

// Admin: create
coursesRouter.post('/', requireAuth, (req, res) => {
  const { title, subtitle, description, photo_url, sort_order } = req.body;
  const result = getDb().prepare(
    'INSERT INTO courses (title, subtitle, description, photo_url, sort_order) VALUES (?, ?, ?, ?, ?)'
  ).run(title, subtitle, description, photo_url, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

// Admin: update
coursesRouter.put('/:id', requireAuth, (req, res) => {
  const { title, subtitle, description, photo_url, sort_order, is_active } = req.body;
  getDb().prepare(
    'UPDATE courses SET title=?, subtitle=?, description=?, photo_url=?, sort_order=?, is_active=? WHERE id=?'
  ).run(title, subtitle, description, photo_url, sort_order || 0, is_active ?? 1, req.params.id);
  res.json({ ok: true });
});

// Admin: delete
coursesRouter.delete('/:id', requireAuth, (req, res) => {
  getDb().prepare('DELETE FROM courses WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});
