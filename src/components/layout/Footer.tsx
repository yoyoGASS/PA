import { Sparkles, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';

interface FooterProps {
  settings?: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  return (
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
            {settings?.footer_text || '我們致力於提供最精緻的 PILATES 體驗，讓每一位來到這裡的您，都能在呼吸中遇見更美好的自己。'}
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-serif">聯絡資訊</h4>
          <div className="space-y-4 text-white/60 text-sm">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-rose-gold shrink-0" />
              <span>{settings?.address || '台北市信義區忠孝東路五段 123 號 8 樓'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-rose-gold shrink-0" />
              <span>{settings?.phone || '02-2345-6789'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-rose-gold shrink-0" />
              <span>{settings?.email || 'info@lepilates.com'}</span>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-rose-gold shrink-0 mt-1" />
              <div className="flex flex-col">
                <span>{settings?.hours_weekday || '週一至週五 09:00 - 21:00'}</span>
                <span>{settings?.hours_weekend || '週六至週日 10:00 - 18:00'}</span>
              </div>
            </div>
          </div>
          <a href={settings?.line_url || '#'} className="btn-rose-gold inline-flex items-center space-x-2 mt-4">
            <MessageCircle className="w-4 h-4" />
            <span>加入官方 LINE@</span>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-white/20 text-xs tracking-widest uppercase">
        &copy; {new Date().getFullYear()} LE PILATES STUDIO. All Rights Reserved.
      </div>
    </footer>
  );
}
