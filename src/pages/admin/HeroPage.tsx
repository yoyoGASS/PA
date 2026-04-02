import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Hero } from '@/lib/types';
import ImageUploader from './components/ImageUploader';

export default function HeroPage() {
  const { data: hero, refetch } = useApi<Hero>('/hero');
  const [form, setForm] = useState({ headline: '', subtext: '', cta_text: '', image_url: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hero) {
      setForm({
        headline: hero.headline || '',
        subtext: hero.subtext || '',
        cta_text: hero.cta_text || '',
        image_url: hero.image_url || '',
      });
    }
  }, [hero]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/hero', form);
      setSaved(true);
      refetch();
      setTimeout(() => setSaved(false), 2000);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-brown-text">Hero 區塊</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-rose-gold text-white rounded-xl text-sm hover:bg-brown-text transition-colors disabled:opacity-50"
        >
          {saving ? '儲存中...' : saved ? '已儲存 ✓' : '儲存'}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-rose-gold/5">
        <div className="space-y-6 max-w-xl">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">
              標題（用 \n 換行）
            </label>
            <textarea
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">副標文字</label>
            <textarea
              value={form.subtext}
              onChange={(e) => setForm({ ...form, subtext: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">CTA 按鈕文字</label>
            <input
              type="text"
              value={form.cta_text}
              onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
              className="w-full px-4 py-3 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold"
            />
          </div>
          <ImageUploader
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
          />
        </div>
      </div>
    </div>
  );
}
