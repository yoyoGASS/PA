import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

const isDemo = import.meta.env.VITE_DEMO === 'true';
const Router = isDemo ? HashRouter : BrowserRouter;
import HomePage from '@/pages/HomePage';
import AdminLayout from '@/pages/admin/AdminLayout';
import LoginPage from '@/pages/admin/LoginPage';
import DashboardPage from '@/pages/admin/DashboardPage';
import CoachesPage from '@/pages/admin/CoachesPage';
import CoursesPage from '@/pages/admin/CoursesPage';
import TestimonialsPage from '@/pages/admin/TestimonialsPage';
import VenuePhotosPage from '@/pages/admin/VenuePhotosPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import HeroPage from '@/pages/admin/HeroPage';
import BookingsPage from '@/pages/admin/BookingsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="coaches" element={<CoachesPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="venue-photos" element={<VenuePhotosPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="hero" element={<HeroPage />} />
          <Route path="bookings" element={<BookingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
