/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  Heart, 
  User, 
  Users, 
  Play, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Compass,
  Target,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const coachScrollRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    lineId: ''
  });

  const navLinks = [
    { name: '關於PILATES', href: '#benefits' },
    { name: '場館介紹', href: '#venue' },
    { name: '影片介紹', href: '#video' },
    { name: '課程介紹', href: '#courses' },
    { name: '學員成果', href: '#transformations' },
    { name: '教練履歷', href: '#coaches' },
    { name: '報名表單', href: '#booking' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('感謝您的報名，專員將儘速與您聯繫！');
  };

  return (
    <div className="min-h-screen selection:bg-rose-gold/30">
      {/* 1. Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xl md:text-2xl font-serif font-bold tracking-wider text-brown-text">LE PILATES STUDIO</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-rose-gold transition-colors whitespace-nowrap">
                {link.name}
              </a>
            ))}
            <button className="btn-rose-gold flex items-center space-x-2 cursor-default">
              <MessageCircle className="w-4 h-4" />
              <span>加入官方 LINE@</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-stone-gray" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-b border-rose-gold/10 p-6 flex flex-col space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium hover:text-rose-gold"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="btn-rose-gold text-center cursor-default">加入官方 LINE@</button>
          </motion.div>
        )}
      </header>

      {/* Hero Section (Implicitly added for better flow) */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl leading-tight mb-6 text-brown-text">
              優雅流動<br />
              <span className="italic font-normal">重塑身心之美</span>
            </h1>
            <p className="text-lg text-stone-gray/80 mb-10 max-w-md">
              在 LE PILATES STUDIO，我們不僅訓練肌肉，更在精緻的空間中，帶領您找回身體的覺察與平衡。
            </p>
            <div className="flex space-x-4">
              <a href="#booking" className="btn-rose-gold px-10 py-4">立即預約體驗</a>
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
                src="https://picsum.photos/seed/pilates-hero-2/800/1000" 
                alt="Pilates Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Stars */}
            <Star className="floating-star top-10 right-10 w-8 h-8 animate-float" />
            <Star className="floating-star bottom-20 left-0 w-6 h-6 animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-gold/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. Pilates Benefits */}
      <section id="benefits" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-brown-text">為什麼選擇PILATES？</h2>
            <p className="text-stone-gray/60">Pilates Benefits</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <Target className="w-8 h-8" />, title: "核心強化", desc: "深層核心肌群訓練，穩定脊椎，建立身體強大的中心點。" },
              { icon: <Activity className="w-8 h-8" />, title: "姿態矯正", desc: "改善圓肩、駝背與骨盆歪斜，重塑挺拔自信的體態。" },
              { icon: <Sparkles className="w-8 h-8" />, title: "柔軟度提升", desc: "動態伸展增加關節活動度，讓身體更加輕盈靈活。" },
              { icon: <Compass className="w-8 h-8" />, title: "身心覺察", desc: "透過專注呼吸與控制，建立大腦與肌肉的深度連結。" },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "預防受傷", desc: "強化弱勢肌群，平衡身體張力，減少日常與運動傷害。" },
              { icon: <Zap className="w-8 h-8" />, title: "線條雕塑", desc: "拉長肌肉線條，打造緊實而不厚重的優雅身形。" }
            ].map((item, idx) => (
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

      {/* 3. Venue Gallery */}
      <section id="venue" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-12">
            <h2 className="text-4xl mb-4 text-brown-text">場館介紹</h2>
            <p className="text-stone-gray/60 italic">Venue Aesthetics</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[700px]">
            <motion.div 
              {...fadeInUp}
              className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img 
                src="https://picsum.photos/seed/venue-main/1200/1200" 
                alt="Main Studio" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm uppercase tracking-widest">Main Studio</p>
                <h3 className="text-2xl font-serif">陽光器械教室</h3>
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="md:col-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img 
                src="https://picsum.photos/seed/venue-lounge/1000/600" 
                alt="Lounge" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif">精品休息區</h3>
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="rounded-3xl overflow-hidden relative group"
            >
              <img 
                src="https://picsum.photos/seed/venue-locker/600/600" 
                alt="Locker" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-serif">私人更衣間</h3>
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="rounded-3xl overflow-hidden relative group"
            >
              <img 
                src="https://picsum.photos/seed/venue-detail/600/600" 
                alt="Detail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-serif">細節美學</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Video Showcase */}
      <section id="video" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-brown-text">影片介紹</h2>
            <p className="text-stone-gray/60">Experience the Flow</p>
          </motion.div>
          
          <motion.div 
            {...fadeInUp}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-gold/10 group cursor-pointer"
          >
            <img 
              src="https://picsum.photos/seed/video-poster/1280/720" 
              alt="Video Poster" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Courses */}
      <section id="courses" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-brown-text">專屬課程企劃</h2>
            <p className="text-stone-gray/60">Curated Programs</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "器械PILATES", sub: "Pilates Reformer", desc: "使用專業器械提供阻力與輔助，精準鍛鍊深層肌群。", img: "https://picsum.photos/seed/course-1/600/800" },
              { title: "空中瑜珈", sub: "Aerial Yoga", desc: "利用掛布在地心引力中延展，釋放脊椎壓力，訓練核心穩定。", img: "https://picsum.photos/seed/course-2/600/800" },
              { title: "TRX 懸吊訓練", sub: "TRX Training", desc: "透過自身體重與懸吊繩，挑戰平衡與全身性肌耐力。", img: "https://picsum.photos/seed/course-3/600/800" }
            ].map((course, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-rose-gold/10 group"
              >
                <div className="arch-mask h-80 relative">
                  <img 
                    src={course.img} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 text-center">
                  <p className="text-rose-gold text-xs font-bold tracking-widest uppercase mb-2">{course.sub}</p>
                  <h3 className="text-2xl mb-4 text-brown-text">{course.title}</h3>
                  <p className="text-stone-gray/70 text-sm leading-relaxed mb-6">{course.desc}</p>
                  <button className="text-brown-text font-bold text-sm border-b border-brown-text pb-1 hover:text-rose-gold hover:border-rose-gold transition-colors">了解更多</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Transformations */}
      <section id="transformations" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-brown-text">見證改變的開始</h2>
            <p className="text-stone-gray/60">Real Results</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                {...fadeInUp}
                className="bg-bg-warm p-6 rounded-[2rem] border border-rose-gold/10"
              >
                <div className="flex space-x-2 mb-6">
                  <div className="flex-1">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2">
                      <img src={`https://picsum.photos/seed/before-${item}/300/400`} alt="Before" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <p className="text-center text-[10px] uppercase tracking-widest opacity-40">Before</p>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2 border-2 border-rose-gold">
                      <img src={`https://picsum.photos/seed/after-${item}/300/400`} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <p className="text-center text-[10px] uppercase tracking-widest text-rose-gold font-bold">After</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-stone-gray/80 text-sm italic">"持續練習 3 個月後，我的體態明顯變得挺拔，核心力量也大幅提升。"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Coach Profile */}
      <section id="coaches" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-brown-text">專業師資團隊</h2>
            <p className="text-stone-gray/60">Our Experts</p>
          </motion.div>
          
          <div className="relative group/slider">
            <div 
              ref={coachScrollRef}
              className="flex overflow-x-auto pb-12 gap-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
            >
              {[
                { name: "Sarah Lin", title: "首席教育總監", specialty: "脊椎側彎矯正、孕產PILATES", cert: "PMA® Certified Teacher, STOTT PILATES® Full Certification", img: "https://picsum.photos/seed/coach-sarah/600/800" },
                { name: "David Chen", title: "資深教練", specialty: "運動表現提升、筋膜放鬆", cert: "Polestar Pilates Comprehensive, NASM-CPT", img: "https://picsum.photos/seed/coach-david/600/800" },
                { name: "Mia Wang", title: "專業授課老師", specialty: "核心穩定、體態雕塑", cert: "BASI Pilates Comprehensive, Yoga Alliance RYT-200", img: "https://picsum.photos/seed/coach-mia/600/800" },
                { name: "Jason Hsu", title: "專業授課老師", specialty: "器械PILATES、運動按摩", cert: "Balanced Body Reformer, ACE-CPT", img: "https://picsum.photos/seed/coach-jason/600/800" }
              ].map((coach, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeInUp}
                  className="min-w-[300px] md:min-w-[450px] snap-center bg-white rounded-[2rem] p-8 shadow-sm border border-rose-gold/5"
                >
                  <div className="arch-mask aspect-[3/4] mb-8 shadow-md">
                    <img 
                      src={coach.img} 
                      alt={coach.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
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
                        <p className="text-stone-gray text-xs leading-relaxed">{coach.cert}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => coachScrollRef.current?.scrollBy({ left: -480, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-gold hover:bg-rose-gold hover:text-white transition-all z-10 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => coachScrollRef.current?.scrollBy({ left: 480, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-gold hover:bg-rose-gold hover:text-white transition-all z-10 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scroll indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-gold/20"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact & Booking Form */}
      <section id="booking" className="py-24 px-6 bg-rose-gold/10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="bg-white rounded-[3rem] overflow-hidden shadow-2xl grid md:grid-cols-2"
          >
            <div className="p-12 bg-brown-text text-white flex flex-col justify-center">
              <h2 className="text-4xl mb-6">開啟您的<br />優雅蛻變</h2>
              <p className="opacity-70 mb-8">填寫表單預約首次體驗課程，我們將根據您的身體狀況，為您規劃專屬的練習路徑。</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-rose-gold" />
                  <span>02-2345-6789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-rose-gold" />
                  <span>contact@lepilates.com</span>
                </div>
              </div>
            </div>
            
            <div className="p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">姓名</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-0 py-3 border-b border-rose-gold/20 focus:border-rose-gold outline-none transition-colors"
                    placeholder="您的姓名"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">電話</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full px-0 py-3 border-b border-rose-gold/20 focus:border-rose-gold outline-none transition-colors"
                    placeholder="您的聯絡電話"
                    value={formData.tel}
                    onChange={(e) => setFormData({...formData, tel: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-0 py-3 border-b border-rose-gold/20 focus:border-rose-gold outline-none transition-colors"
                    placeholder="您的電子郵件"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">Line ID</label>
                  <input 
                    type="text" 
                    className="w-full px-0 py-3 border-b border-rose-gold/20 focus:border-rose-gold outline-none transition-colors"
                    placeholder="您的 Line ID"
                    value={formData.lineId}
                    onChange={(e) => setFormData({...formData, lineId: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-rose-gold text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:bg-brown-text transition-all shadow-lg"
                >
                  立即預約體驗
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-footer-dark text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-wider">LE PILATES</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              我們致力於提供最精緻的PILATES體驗，讓每一位來到這裡的您，都能在呼吸中遇見更美好的自己。
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-serif">聯絡資訊</h4>
            <div className="space-y-4 text-white/60 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-rose-gold shrink-0" />
                <span>台北市信義區忠孝東路五段 123 號 8 樓</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-rose-gold shrink-0" />
                <span>02-2345-6789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-rose-gold shrink-0" />
                <span>info@lepilates.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-rose-gold shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span>週一至週五 09:00 - 21:00</span>
                  <span>週六至週日 10:00 - 18:00</span>
                </div>
              </div>
            </div>
            <button className="btn-rose-gold inline-flex items-center space-x-2 mt-4 cursor-default">
              <MessageCircle className="w-4 h-4" />
              <span>加入官方 LINE@</span>
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-white/20 text-xs tracking-widest uppercase">
          © 2024 LE PILATES STUDIO. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
