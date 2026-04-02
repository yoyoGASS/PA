import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Booking } from '@/lib/types';

const statusLabels: Record<string, { label: string; class: string }> = {
  pending: { label: '待處理', class: 'bg-yellow-50 text-yellow-600' },
  contacted: { label: '已聯繫', class: 'bg-blue-50 text-blue-600' },
  confirmed: { label: '已確認', class: 'bg-green-50 text-green-600' },
  cancelled: { label: '已取消', class: 'bg-red-50 text-red-600' },
};

export default function BookingsPage() {
  const { data: bookings, refetch } = useApi<Booking[]>('/bookings/admin');

  const handleStatus = async (id: number, status: string) => {
    await api.put(`/bookings/admin/${id}`, { status });
    refetch();
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-brown-text mb-8">預約管理</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-rose-gold/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-warm text-stone-gray/60 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 text-left">姓名</th>
              <th className="px-6 py-4 text-left">電話</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Line ID</th>
              <th className="px-6 py-4 text-left">時間</th>
              <th className="px-6 py-4 text-center">狀態</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => {
              const st = statusLabels[b.status] || statusLabels.pending;
              return (
                <tr key={b.id} className="border-t border-rose-gold/5 hover:bg-bg-warm/50">
                  <td className="px-6 py-4 font-medium text-brown-text">{b.name}</td>
                  <td className="px-6 py-4 text-stone-gray/60">{b.phone}</td>
                  <td className="px-6 py-4 text-stone-gray/60">{b.email}</td>
                  <td className="px-6 py-4 text-stone-gray/60">{b.line_id || '-'}</td>
                  <td className="px-6 py-4 text-stone-gray/40 text-xs">{b.created_at}</td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatus(b.id, e.target.value)}
                      className={`text-xs px-3 py-1.5 rounded-full border-none outline-none cursor-pointer ${st.class}`}
                    >
                      <option value="pending">待處理</option>
                      <option value="contacted">已聯繫</option>
                      <option value="confirmed">已確認</option>
                      <option value="cancelled">已取消</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!bookings || bookings.length === 0) && (
          <div className="p-12 text-center text-stone-gray/30">暫無預約資料</div>
        )}
      </div>
    </div>
  );
}
