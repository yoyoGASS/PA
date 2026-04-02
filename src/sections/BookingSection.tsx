import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import { api } from '@/lib/api';
import type { SiteSettings } from '@/lib/types';

const isDemo = import.meta.env.VITE_DEMO === 'true';

interface BookingSectionProps {
  settings?: SiteSettings | null;
}

export default function BookingSection({ settings }: BookingSectionProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', line_id: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isDemo) {
        // Demo mode: simulate success
        await new Promise((r) => setTimeout(r, 800));
      } else {
        await api.post('/bookings', formData);
      }
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', line_id: '' });
    } catch {
      alert('提交失敗，請稍後再試。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 bg-rose-gold/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="bg-white rounded-[3rem] overflow-hidden shadow-2xl grid md:grid-cols-2"
        >
          <div className="p-12 bg-brown-text text-white flex flex-col justify-center">
            <h2 className="text-4xl mb-6">開啟您的<br />優雅蛻變</h2>
            <p className="opacity-70 mb-8">
              填寫表單預約首次體驗課程，我們將根據您的身體狀況，為您規劃專屬的練習路徑。
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-rose-gold" />
                <span>{settings?.phone || '02-2345-6789'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-rose-gold" />
                <span>{settings?.contact_email || 'contact@lepilates.com'}</span>
              </div>
            </div>
          </div>

          <div className="p-12">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center text-rose-gold text-2xl">✓</div>
                <h3 className="text-xl text-brown-text">感謝您的報名！</h3>
                <p className="text-stone-gray/60 text-sm">專員將儘速與您聯繫。</p>
                <button onClick={() => setSubmitted(false)} className="text-rose-gold text-sm underline">
                  再填一份
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: '姓名', key: 'name', type: 'text', placeholder: '您的姓名', required: true },
                  { label: '電話', key: 'phone', type: 'tel', placeholder: '您的聯絡電話', required: true },
                  { label: 'Email', key: 'email', type: 'email', placeholder: '您的電子郵件', required: true },
                  { label: 'Line ID', key: 'line_id', type: 'text', placeholder: '您的 Line ID', required: false },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      className="w-full px-0 py-3 border-b border-rose-gold/20 focus:border-rose-gold outline-none transition-colors"
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-rose-gold text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:bg-brown-text transition-all shadow-lg disabled:opacity-50"
                >
                  {submitting ? '提交中...' : '立即預約體驗'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
