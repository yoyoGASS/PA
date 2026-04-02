import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/sections/HeroSection';
import BenefitsSection from '@/sections/BenefitsSection';
import VenueSection from '@/sections/VenueSection';
import VideoSection from '@/sections/VideoSection';
import CoursesSection from '@/sections/CoursesSection';
import TransformationsSection from '@/sections/TransformationsSection';
import CoachesSection from '@/sections/CoachesSection';
import BookingSection from '@/sections/BookingSection';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function HomePage() {
  const { data: settings } = useSiteSettings();

  return (
    <div className="min-h-screen selection:bg-rose-gold/30">
      <Header settings={settings} />
      <HeroSection />
      <BenefitsSection />
      <VenueSection />
      <VideoSection />
      <CoursesSection />
      <TransformationsSection />
      <CoachesSection />
      <BookingSection settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}
