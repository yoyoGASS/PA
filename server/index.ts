import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb } from './db.js';
import { settingsRouter } from './routes/settings.js';
import { heroRouter } from './routes/hero.js';
import { coachesRouter } from './routes/coaches.js';
import { coursesRouter } from './routes/courses.js';
import { testimonialsRouter } from './routes/testimonials.js';
import { venuePhotosRouter } from './routes/venue-photos.js';
import { bookingsRouter } from './routes/bookings.js';
import { authRouter } from './routes/auth.js';
import { uploadRouter } from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

app.use(cors());
app.use(express.json());

// Static uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Initialize DB
getDb();

// API routes
app.use('/api/settings', settingsRouter);
app.use('/api/hero', heroRouter);
app.use('/api/coaches', coachesRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/venue-photos', venuePhotosRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);
app.use('/api', uploadRouter);

// Production: serve Vite build
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
