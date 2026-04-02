import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import SectionTitle from '@/components/ui/SectionTitle';
import { useApi } from '@/hooks/useApi';
import type { Coach } from '@/lib/types';

export default function CoachesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: coaches } = useApi<Coach[]>('/coaches');

  if (!coaches || coaches.length === 0) return null;

  return (
    <section id="coaches" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="專業師資團隊" subtitle="Our Experts" />

        <div className="relative group/slider">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-12 gap-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {coaches.map((coach) => (
              <motion.div
                key={coach.id}
                {...fadeInUp}
                className="min-w-[300px] md:min-w-[450px] snap-center bg-white rounded-[2rem] p-8 shadow-sm border border-rose-gold/5"
              >
                <div className="arch-mask aspect-[3/4] mb-8 shadow-md">
                  <img src={coach.photo_url} alt={coach.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-rose-gold font-bold tracking-widest uppercase mb-2 text-xs">{coach.title}</p>
                  <h3 className="text-3xl mb-4 text-brown-text">{coach.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-gray/40 mb-1">專長領域</h4>
                      <p className="text-stone-gray text-sm">{coach.specialty}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-gray/40 mb-1">專業證照</h4>
                      <p className="text-stone-gray text-xs leading-relaxed">{coach.certifications}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -480, behavior: 'smooth' })}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-gold hover:bg-rose-gold hover:text-white transition-all z-10 opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 480, behavior: 'smooth' })}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-gold hover:bg-rose-gold hover:text-white transition-all z-10 opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center space-x-2 mt-4">
            {coaches.map((c) => (
              <div key={c.id} className="w-1.5 h-1.5 rounded-full bg-rose-gold/20"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
