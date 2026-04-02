import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { SiteSettings } from '@/lib/types';

const settingFields = [
  { key: 'brand_name', label: '品牌名稱' },
  { key: 'phone', label: '電話' },
  { key: 'email', label: 'Email' },
  { key: 'contact_email', label: '聯絡 Email' },
  { key: 'address', label: '地址' },
  { key: 'hours_weekday', label: '平日營業時間' },
  { key: 'hours_weekend', label: '假日營業時間' },
  { key: 'line_url', label: 'LINE@ 連結' },
  { key: 'footer_text', label: '頁尾描述', multiline: true },
];

export default function SettingsPage() {
  const { data: settings, refetch } = useApi<SiteSettings>('/settings');
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) setForm({ ...settings });
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/settings', form);
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
        <h1 className="text-3xl font-serif text-brown-text">網站設定</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-rose-gold text-white rounded-xl text-sm hover:bg-brown-text transition-colors disabled:opacity-50"
        >
          {saving ? '儲存中...' : saved ? '已儲存 ✓' : '儲存設定'}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-rose-gold/5">
        <div className="space-y-6 max-w-xl">
          {settingFields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">
                {f.label}
              </label>
              {f.multiline ? (
                <textarea
                  value={form[f.key] || ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={form[f.key] || ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
