import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Coach } from '@/lib/types';
import ImageUploader from './components/ImageUploader';

const emptyCoach = { name: '', title: '', specialty: '', certifications: '', photo_url: '', sort_order: 0, is_active: 1 };

export default function CoachesPage() {
  const { data: coaches, refetch } = useApi<Coach[]>('/coaches/admin');
  const [editing, setEditing] = useState<Partial<Coach> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.name) return;
    setSaving(true);
    try {
      if (editing.id) {
        await api.put(`/coaches/${editing.id}`, editing);
      } else {
        await api.post('/coaches', editing);
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
    await api.delete(`/coaches/${id}`);
    refetch();
  };

  const handleToggle = async (coach: Coach) => {
    await api.put(`/coaches/${coach.id}`, { ...coach, is_active: coach.is_active ? 0 : 1 });
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-brown-text">教練管理</h1>
        <button
          onClick={() => setEditing({ ...emptyCoach })}
          className="flex items-center space-x-2 bg-rose-gold text-white px-4 py-2 rounded-xl text-sm hover:bg-brown-text transition-colors"
        >
          <Plus className="w-4 h-4" /> <span>新增教練</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-serif text-brown-text mb-6">{editing.id ? '編輯教練' : '新增教練'}</h2>
            <div className="space-y-4">
              {[
                { label: '姓名', key: 'name' },
                { label: '職稱', key: 'title' },
                { label: '專長', key: 'specialty' },
                { label: '證照', key: 'certifications' },
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
              <ImageUploader
                value={editing.photo_url || ''}
                onChange={(url) => setEditing({ ...editing, photo_url: url })}
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-stone-gray/60 hover:text-stone-gray">取消</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-rose-gold text-white rounded-xl text-sm hover:bg-brown-text disabled:opacity-50">
                {saving ? '儲存中...' : '儲存'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-gold/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-warm text-stone-gray/60 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 text-left">教練</th>
              <th className="px-6 py-4 text-left">職稱</th>
              <th className="px-6 py-4 text-left">專長</th>
              <th className="px-6 py-4 text-center">排序</th>
              <th className="px-6 py-4 text-center">狀態</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {coaches?.map((coach) => (
              <tr key={coach.id} className="border-t border-rose-gold/5 hover:bg-bg-warm/50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {coach.photo_url && <img src={coach.photo_url} alt="" className="w-10 h-10 rounded-full object-cover" />}
                    <span className="font-medium text-brown-text">{coach.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-stone-gray/60">{coach.title}</td>
                <td className="px-6 py-4 text-stone-gray/60">{coach.specialty}</td>
                <td className="px-6 py-4 text-center">{coach.sort_order}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => handleToggle(coach)} title={coach.is_active ? '停用' : '啟用'}>
                    {coach.is_active ? <Eye className="w-4 h-4 text-green-500 mx-auto" /> : <EyeOff className="w-4 h-4 text-stone-gray/30 mx-auto" />}
                  </button>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => setEditing({ ...coach })} className="text-stone-gray/40 hover:text-rose-gold"><Pencil className="w-4 h-4 inline" /></button>
                  <button onClick={() => handleDelete(coach.id)} className="text-stone-gray/40 hover:text-red-500"><Trash2 className="w-4 h-4 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!coaches || coaches.length === 0) && (
          <div className="p-12 text-center text-stone-gray/30">暫無教練資料</div>
        )}
      </div>
    </div>
  );
}
