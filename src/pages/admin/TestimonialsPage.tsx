import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Testimonial } from '@/lib/types';
import ImageUploader from './components/ImageUploader';

const emptyTestimonial = { quote: '', before_photo_url: '', after_photo_url: '', sort_order: 0, is_active: 1 };

export default function TestimonialsPage() {
  const { data: testimonials, refetch } = useApi<Testimonial[]>('/testimonials/admin');
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.quote) return;
    setSaving(true);
    try {
      if (editing.id) {
        await api.put(`/testimonials/${editing.id}`, editing);
      } else {
        await api.post('/testimonials', editing);
      }
      setEditing(null);
      refetch();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('確定刪除？')) return;
    await api.delete(`/testimonials/${id}`);
    refetch();
  };

  const handleToggle = async (t: Testimonial) => {
    await api.put(`/testimonials/${t.id}`, { ...t, is_active: t.is_active ? 0 : 1 });
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-brown-text">見證管理</h1>
        <button
          onClick={() => setEditing({ ...emptyTestimonial })}
          className="flex items-center space-x-2 bg-rose-gold text-white px-4 py-2 rounded-xl text-sm hover:bg-brown-text transition-colors"
        >
          <Plus className="w-4 h-4" /> <span>新增見證</span>
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-serif text-brown-text mb-6">{editing.id ? '編輯見證' : '新增見證'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-1">見證語錄</label>
                <textarea
                  value={editing.quote || ''}
                  onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-1">排序</label>
                <input
                  type="number"
                  value={editing.sort_order || 0}
                  onChange={(e) => setEditing({ ...editing, sort_order: +e.target.value })}
                  className="w-full px-4 py-2 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">Before 照片</p>
                <ImageUploader
                  value={editing.before_photo_url || ''}
                  onChange={(url) => setEditing({ ...editing, before_photo_url: url })}
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">After 照片</p>
                <ImageUploader
                  value={editing.after_photo_url || ''}
                  onChange={(url) => setEditing({ ...editing, after_photo_url: url })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-stone-gray/60">取消</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-rose-gold text-white rounded-xl text-sm hover:bg-brown-text disabled:opacity-50">
                {saving ? '儲存中...' : '儲存'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials?.map((t) => (
          <div key={t.id} className={`bg-white rounded-2xl p-6 shadow-sm border border-rose-gold/5 ${!t.is_active ? 'opacity-50' : ''}`}>
            <div className="flex space-x-2 mb-4">
              {t.before_photo_url && <img src={t.before_photo_url} alt="Before" className="w-20 h-24 rounded-lg object-cover" />}
              {t.after_photo_url && <img src={t.after_photo_url} alt="After" className="w-20 h-24 rounded-lg object-cover border-2 border-rose-gold" />}
            </div>
            <p className="text-sm text-stone-gray/80 italic mb-4">"{t.quote}"</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-gray/30">排序: {t.sort_order}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleToggle(t)}>
                  {t.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-stone-gray/30" />}
                </button>
                <button onClick={() => setEditing({ ...t })}><Pencil className="w-4 h-4 text-stone-gray/40 hover:text-rose-gold" /></button>
                <button onClick={() => handleDelete(t.id)}><Trash2 className="w-4 h-4 text-stone-gray/40 hover:text-red-500" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {(!testimonials || testimonials.length === 0) && (
        <div className="bg-white rounded-2xl p-12 text-center text-stone-gray/30 shadow-sm">暫無見證資料</div>
      )}
    </div>
  );
}
