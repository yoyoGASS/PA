import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

export const heroRouter = Router();

// Public
heroRouter.get('/', (_req, res) => {
  const row = getDb().prepare('SELECT * FROM hero WHERE id = 1').get();
  res.json(row || {});
});

// Admin: update hero
heroRouter.put('/', requireAuth, (req, res) => {
  const { headline, subtext, cta_text, image_url } = req.body;
  getDb().prepare(`
    INSERT OR REPLACE INTO hero (id, headline, subtext, cta_text, image_url)
    VALUES (1, ?, ?, ?, ?)
  `).run(headline, subtext, cta_text, image_url);
  res.json({ ok: true });
});
