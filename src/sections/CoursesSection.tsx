import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import SectionTitle from '@/components/ui/SectionTitle';
import { useApi } from '@/hooks/useApi';
import type { Course } from '@/lib/types';

export default function CoursesSection() {
  const { data: courses } = useApi<Course[]>('/courses');

  if (!courses || courses.length === 0) return null;

  return (
    <section id="courses" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="專屬課程企劃" subtitle="Curated Programs" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              {...fadeInUp}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-rose-gold/10 group"
            >
              <div className="arch-mask h-80 relative">
                <img
                  src={course.photo_url}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 text-center">
                <p className="text-rose-gold text-xs font-bold tracking-widest uppercase mb-2">{course.subtitle}</p>
                <h3 className="text-2xl mb-4 text-brown-text">{course.title}</h3>
                <p className="text-stone-gray/70 text-sm leading-relaxed mb-6">{course.description}</p>
                <button className="text-brown-text font-bold text-sm border-b border-brown-text pb-1 hover:text-rose-gold hover:border-rose-gold transition-colors">
                  了解更多
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
