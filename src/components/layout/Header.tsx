import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, Menu, X } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';

const navLinks = [
  { name: '關於 PILATES', href: '#benefits' },
  { name: '場館介紹', href: '#venue' },
  { name: '影片介紹', href: '#video' },
  { name: '課程介紹', href: '#courses' },
  { name: '學員成果', href: '#transformations' },
  { name: '教練履歷', href: '#coaches' },
  { name: '報名表單', href: '#booking' },
];

interface HeaderProps {
  settings?: SiteSettings | null;
}

export default function Header({ settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xl md:text-2xl font-serif font-bold tracking-wider text-brown-text">
            {settings?.brand_name || 'LE PILATES STUDIO'}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-rose-gold transition-colors whitespace-nowrap">
              {link.name}
            </a>
          ))}
          <a href={settings?.line_url || '#'} className="btn-rose-gold flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>加入官方 LINE@</span>
          </a>
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
          <a href={settings?.line_url || '#'} className="btn-rose-gold text-center">
            加入官方 LINE@
          </a>
        </motion.div>
      )}
    </header>
  );
}
