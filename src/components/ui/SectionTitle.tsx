import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'center' | 'left';
}

export default function SectionTitle({ title, subtitle, className = '', align = 'center' }: SectionTitleProps) {
  return (
    <motion.div {...fadeInUp} className={`mb-16 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2 className="text-4xl mb-4 text-brown-text">{title}</h2>
      {subtitle && <p className={`text-stone-gray/60 ${align === 'left' ? 'italic' : ''}`}>{subtitle}</p>}
    </motion.div>
  );
}
