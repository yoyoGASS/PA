import { motion } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';
import type { Hero } from '@/lib/types';
import { useApi } from '@/hooks/useApi';

export default function HeroSection() {
  const { data: hero } = useApi<Hero>('/hero');

  const headline = hero?.headline || '優雅流動\n重塑身心之美';
  const lines = headline.split('\n');

  return (
    <section className="pt-40 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl leading-tight mb-6 text-brown-text">
            {lines[0]}<br />
            {lines[1] && <span className="italic font-normal">{lines[1]}</span>}
          </h1>
          <p className="text-lg text-stone-gray/80 mb-10 max-w-md">
            {hero?.subtext || '在 LE PILATES STUDIO，我們不僅訓練肌肉，更在精緻的空間中，帶領您找回身體的覺察與平衡。'}
          </p>
          <div className="flex space-x-4">
            <a href="#booking" className="btn-rose-gold px-10 py-4">
              {hero?.cta_text || '立即預約體驗'}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <div className="arch-mask aspect-[4/5] shadow-2xl relative z-10">
            <img
              src={hero?.image_url || '/uploads/hero.jpg'}
              alt="Pilates Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <Star className="floating-star top-10 right-10 w-8 h-8 animate-float" />
          <Star className="floating-star bottom-20 left-0 w-6 h-6 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-gold/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}
