import { Router } from 'express';
import { signToken, requireAuth } from '../auth.js';

export const authRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Login
authRouter.post('/login', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: '密碼錯誤' });
  }
  const token = signToken();
  res.json({ token });
});

// Verify token
authRouter.get('/me', requireAuth, (_req, res) => {
  res.json({ admin: true });
});
