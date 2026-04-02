import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import SectionTitle from '@/components/ui/SectionTitle';
import { useApi } from '@/hooks/useApi';
import type { Testimonial } from '@/lib/types';

export default function TransformationsSection() {
  const { data: testimonials } = useApi<Testimonial[]>('/testimonials');

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="transformations" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="見證改變的開始" subtitle="Real Results" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              {...fadeInUp}
              className="bg-bg-warm p-6 rounded-[2rem] border border-rose-gold/10"
            >
              <div className="flex space-x-2 mb-6">
                <div className="flex-1">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2">
                    <img src={item.before_photo_url} alt="Before" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-center text-[10px] uppercase tracking-widest opacity-40">Before</p>
                </div>
                <div className="flex-1">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2 border-2 border-rose-gold">
                    <img src={item.after_photo_url} alt="After" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-center text-[10px] uppercase tracking-widest text-rose-gold font-bold">After</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-stone-gray/80 text-sm italic">"{item.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
