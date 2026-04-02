import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

export const venuePhotosRouter = Router();

// Public
venuePhotosRouter.get('/', (_req, res) => {
  const rows = getDb().prepare('SELECT * FROM venue_photos WHERE is_active = 1 ORDER BY sort_order').all();
  res.json(rows);
});

// Admin: all
venuePhotosRouter.get('/admin', requireAuth, (_req, res) => {
  const rows = getDb().prepare('SELECT * FROM venue_photos ORDER BY sort_order').all();
  res.json(rows);
});

// Admin: create
venuePhotosRouter.post('/', requireAuth, (req, res) => {
  const { label, subtitle, photo_url, grid_size, sort_order } = req.body;
  const result = getDb().prepare(
    'INSERT INTO venue_photos (label, subtitle, photo_url, grid_size, sort_order) VALUES (?, ?, ?, ?, ?)'
  ).run(label, subtitle, photo_url, grid_size || '1x1', sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

// Admin: update
venuePhotosRouter.put('/:id', requireAuth, (req, res) => {
  const { label, subtitle, photo_url, grid_size, sort_order, is_active } = req.body;
  getDb().prepare(
    'UPDATE venue_photos SET label=?, subtitle=?, photo_url=?, grid_size=?, sort_order=?, is_active=? WHERE id=?'
  ).run(label, subtitle, photo_url, grid_size || '1x1', sort_order || 0, is_active ?? 1, req.params.id);
  res.json({ ok: true });
});

// Admin: delete
venuePhotosRouter.delete('/:id', requireAuth, (req, res) => {
  getDb().prepare('DELETE FROM venue_photos WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});
