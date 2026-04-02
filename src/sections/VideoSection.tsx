import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import SectionTitle from '@/components/ui/SectionTitle';

export default function VideoSection() {
  return (
    <section id="video" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="影片介紹" subtitle="Experience the Flow" />

        <motion.div
          {...fadeInUp}
          className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-gold/10 group cursor-pointer"
        >
          <img
            src="/uploads/video-poster.jpg"
            alt="Video Poster"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
