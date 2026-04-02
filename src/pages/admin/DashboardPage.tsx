import { Users, BookOpen, Star, CalendarCheck } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import type { Coach, Course, Testimonial, Booking } from '@/lib/types';

export default function DashboardPage() {
  const { data: coaches } = useApi<Coach[]>('/coaches');
  const { data: courses } = useApi<Course[]>('/courses');
  const { data: testimonials } = useApi<Testimonial[]>('/testimonials');
  const { data: bookings } = useApi<Booking[]>('/bookings/admin');

  const stats = [
    { label: '教練', count: coaches?.length || 0, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: '課程', count: courses?.length || 0, icon: BookOpen, color: 'bg-green-50 text-green-600' },
    { label: '見證', count: testimonials?.length || 0, icon: Star, color: 'bg-yellow-50 text-yellow-600' },
    { label: '預約', count: bookings?.length || 0, icon: CalendarCheck, color: 'bg-rose-50 text-rose-600' },
  ];

  const pendingBookings = bookings?.filter((b) => b.status === 'pending') || [];

  return (
    <div>
      <h1 className="text-3xl font-serif text-brown-text mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-gold/5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-brown-text">{s.count}</p>
              <p className="text-sm text-stone-gray/40">{s.label}</p>
            </div>
          );
        })}
      </div>

      {pendingBookings.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-gold/5">
          <h2 className="text-lg font-serif text-brown-text mb-4">最新待處理預約</h2>
          <div className="space-y-3">
            {pendingBookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-rose-gold/5 last:border-0">
                <div>
                  <span className="font-medium text-brown-text">{b.name}</span>
                  <span className="text-stone-gray/40 text-sm ml-3">{b.phone}</span>
                </div>
                <span className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full">待處理</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
