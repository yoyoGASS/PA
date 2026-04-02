import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import SectionTitle from '@/components/ui/SectionTitle';
import { useApi } from '@/hooks/useApi';
import type { VenuePhoto } from '@/lib/types';

export default function VenueSection() {
  const { data: photos } = useApi<VenuePhoto[]>('/venue-photos');

  if (!photos || photos.length === 0) return null;

  // Map grid_size to Tailwind classes
  const gridClass = (size: string) => {
    switch (size) {
      case '2x2': return 'md:col-span-2 md:row-span-2';
      case '2x1': return 'md:col-span-2';
      default: return '';
    }
  };

  return (
    <section id="venue" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="場館介紹" subtitle="Venue Aesthetics" align="left" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[700px]">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              {...fadeInUp}
              className={`${gridClass(photo.grid_size)} rounded-3xl overflow-hidden relative group`}
            >
              <img
                src={photo.photo_url}
                alt={photo.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                {photo.subtitle && <p className="text-sm uppercase tracking-widest">{photo.subtitle}</p>}
                <h3 className="text-xl font-serif">{photo.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
