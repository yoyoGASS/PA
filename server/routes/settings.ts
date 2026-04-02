import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

export const settingsRouter = Router();

// Public: get all settings as object
settingsRouter.get('/', (_req, res) => {
  const rows = getDb().prepare('SELECT key, value FROM site_settings').all() as { key: string; value: string }[];
  const obj: Record<string, string> = {};
  for (const r of rows) obj[r.key] = r.value;
  res.json(obj);
});

// Admin: update settings
settingsRouter.put('/', requireAuth, (req, res) => {
  const db = getDb();
  const upsert = db.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)');
  const entries = Object.entries(req.body) as [string, string][];
  const tx = db.transaction(() => {
    for (const [key, value] of entries) {
      upsert.run(key, String(value));
    }
  });
  tx();
  res.json({ ok: true });
});
