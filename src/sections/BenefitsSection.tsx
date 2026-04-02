import { motion } from 'motion/react';
import { Target, Activity, Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import SectionTitle from '@/components/ui/SectionTitle';

const benefits = [
  { icon: <Target className="w-8 h-8" />, title: '核心強化', desc: '深層核心肌群訓練，穩定脊椎，建立身體強大的中心點。' },
  { icon: <Activity className="w-8 h-8" />, title: '姿態矯正', desc: '改善圓肩、駝背與骨盆歪斜，重塑挺拔自信的體態。' },
  { icon: <Sparkles className="w-8 h-8" />, title: '柔軟度提升', desc: '動態伸展增加關節活動度，讓身體更加輕盈靈活。' },
  { icon: <Compass className="w-8 h-8" />, title: '身心覺察', desc: '透過專注呼吸與控制，建立大腦與肌肉的深度連結。' },
  { icon: <ShieldCheck className="w-8 h-8" />, title: '預防受傷', desc: '強化弱勢肌群，平衡身體張力，減少日常與運動傷害。' },
  { icon: <Zap className="w-8 h-8" />, title: '線條雕塑', desc: '拉長肌肉線條，打造緊實而不厚重的優雅身形。' },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="為什麼選擇 PILATES？" subtitle="Pilates Benefits" />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-bg-warm p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-rose-gold/5 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-gold mb-6 group-hover:bg-rose-gold group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl mb-3 text-brown-text">{item.title}</h3>
              <p className="text-stone-gray/70 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
