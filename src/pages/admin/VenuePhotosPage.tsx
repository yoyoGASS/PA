import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { VenuePhoto } from '@/lib/types';
import ImageUploader from './components/ImageUploader';

const emptyPhoto = { label: '', subtitle: '', photo_url: '', grid_size: '1x1', sort_order: 0, is_active: 1 };

export default function VenuePhotosPage() {
  const { data: photos, refetch } = useApi<VenuePhoto[]>('/venue-photos/admin');
  const [editing, setEditing] = useState<Partial<VenuePhoto> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.label) return;
    setSaving(true);
    try {
      if (editing.id) {
        await api.put(`/venue-photos/${editing.id}`, editing);
      } else {
        await api.post('/venue-photos', editing);
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
    await api.delete(`/venue-photos/${id}`);
    refetch();
  };

  const handleToggle = async (p: VenuePhoto) => {
    await api.put(`/venue-photos/${p.id}`, { ...p, is_active: p.is_active ? 0 : 1 });
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-brown-text">場館照片管理</h1>
        <button
          onClick={() => setEditing({ ...emptyPhoto })}
          className="flex items-center space-x-2 bg-rose-gold text-white px-4 py-2 rounded-xl text-sm hover:bg-brown-text transition-colors"
        >
          <Plus className="w-4 h-4" /> <span>新增照片</span>
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-serif text-brown-text mb-6">{editing.id ? '編輯照片' : '新增照片'}</h2>
            <div className="space-y-4">
              {[
                { label: '標題', key: 'label' },
                { label: '副標', key: 'subtitle' },
                { label: '排序', key: 'sort_order', type: 'number' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-1">{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    value={(editing as any)[f.key] || ''}
                    onChange={(e) => setEditing({ ...editing, [f.key]: f.type === 'number' ? +e.target.value : e.target.value })}
                    className="w-full px-4 py-2 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-1">格線大小</label>
                <select
                  value={editing.grid_size || '1x1'}
                  onChange={(e) => setEditing({ ...editing, grid_size: e.target.value })}
                  className="w-full px-4 py-2 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold"
                >
                  <option value="1x1">1×1</option>
                  <option value="2x1">2×1（寬）</option>
                  <option value="2x2">2×2（大）</option>
                </select>
              </div>
              <ImageUploader
                value={editing.photo_url || ''}
                onChange={(url) => setEditing({ ...editing, photo_url: url })}
              />
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos?.map((p) => (
          <div key={p.id} className={`rounded-2xl overflow-hidden shadow-sm border border-rose-gold/5 ${!p.is_active ? 'opacity-50' : ''}`}>
            {p.photo_url && <img src={p.photo_url} alt={p.label} className="w-full h-40 object-cover" />}
            <div className="p-4 bg-white">
              <p className="text-sm font-medium text-brown-text">{p.label}</p>
              <p className="text-xs text-stone-gray/40">{p.subtitle} · {p.grid_size}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-stone-gray/30">排序: {p.sort_order}</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleToggle(p)}>
                    {p.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-stone-gray/30" />}
                  </button>
                  <button onClick={() => setEditing({ ...p })}><Pencil className="w-4 h-4 text-stone-gray/40 hover:text-rose-gold" /></button>
                  <button onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 text-stone-gray/40 hover:text-red-500" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {(!photos || photos.length === 0) && (
        <div className="bg-white rounded-2xl p-12 text-center text-stone-gray/30 shadow-sm">暫無場館照片</div>
      )}
    </div>
  );
}
