import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Course } from '@/lib/types';
import ImageUploader from './components/ImageUploader';

const emptyCourse = { title: '', subtitle: '', description: '', photo_url: '', sort_order: 0, is_active: 1 };

export default function CoursesPage() {
  const { data: courses, refetch } = useApi<Course[]>('/courses/admin');
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.title) return;
    setSaving(true);
    try {
      if (editing.id) {
        await api.put(`/courses/${editing.id}`, editing);
      } else {
        await api.post('/courses', editing);
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
    await api.delete(`/courses/${id}`);
    refetch();
  };

  const handleToggle = async (course: Course) => {
    await api.put(`/courses/${course.id}`, { ...course, is_active: course.is_active ? 0 : 1 });
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-brown-text">課程管理</h1>
        <button
          onClick={() => setEditing({ ...emptyCourse })}
          className="flex items-center space-x-2 bg-rose-gold text-white px-4 py-2 rounded-xl text-sm hover:bg-brown-text transition-colors"
        >
          <Plus className="w-4 h-4" /> <span>新增課程</span>
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-serif text-brown-text mb-6">{editing.id ? '編輯課程' : '新增課程'}</h2>
            <div className="space-y-4">
              {[
                { label: '課程名稱', key: 'title' },
                { label: '英文副標', key: 'subtitle' },
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
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-1">課程描述</label>
                <textarea
                  value={editing.description || ''}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-rose-gold/20 rounded-xl outline-none focus:border-rose-gold resize-none"
                />
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div key={course.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-gold/5 ${!course.is_active ? 'opacity-50' : ''}`}>
            {course.photo_url && (
              <div className="h-48 overflow-hidden">
                <img src={course.photo_url} alt={course.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <p className="text-rose-gold text-xs font-bold tracking-widest uppercase mb-1">{course.subtitle}</p>
              <h3 className="text-lg font-serif text-brown-text mb-2">{course.title}</h3>
              <p className="text-sm text-stone-gray/60 mb-4 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-gray/30">排序: {course.sort_order}</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleToggle(course)}>
                    {course.is_active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-stone-gray/30" />}
                  </button>
                  <button onClick={() => setEditing({ ...course })}><Pencil className="w-4 h-4 text-stone-gray/40 hover:text-rose-gold" /></button>
                  <button onClick={() => handleDelete(course.id)}><Trash2 className="w-4 h-4 text-stone-gray/40 hover:text-red-500" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {(!courses || courses.length === 0) && (
        <div className="bg-white rounded-2xl p-12 text-center text-stone-gray/30 shadow-sm">暫無課程資料</div>
      )}
    </div>
  );
}
