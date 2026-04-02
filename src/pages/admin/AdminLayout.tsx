import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles, LayoutDashboard, Users, BookOpen, Star, Image,
  Settings, FileText, CalendarCheck, LogOut
} from 'lucide-react';
import { api, clearToken } from '@/lib/api';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/hero', label: 'Hero 區塊', icon: FileText },
  { path: '/admin/coaches', label: '教練管理', icon: Users },
  { path: '/admin/courses', label: '課程管理', icon: BookOpen },
  { path: '/admin/testimonials', label: '見證管理', icon: Star },
  { path: '/admin/venue-photos', label: '場館照片', icon: Image },
  { path: '/admin/bookings', label: '預約管理', icon: CalendarCheck },
  { path: '/admin/settings', label: '網站設定', icon: Settings },
];

export default function AdminLayout() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.get('/auth/me')
      .then(() => setAuthed(true))
      .catch(() => {
        clearToken();
        navigate('/admin/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  if (authed === null) {
    return (
      <div className="min-h-screen bg-bg-warm flex items-center justify-center">
        <div className="animate-pulse text-stone-gray/40">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-warm flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-rose-gold/10 flex flex-col shrink-0">
        <div className="p-6 flex items-center space-x-2 border-b border-rose-gold/10">
          <div className="w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-brown-text text-sm">LE PILATES 後台</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                  active
                    ? 'bg-rose-gold/10 text-rose-gold font-medium'
                    : 'text-stone-gray/60 hover:text-rose-gold hover:bg-rose-gold/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-rose-gold/10 space-y-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-sm text-stone-gray/40 hover:text-rose-gold transition-colors"
          >
            <span>↗ 查看前台</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-sm text-stone-gray/40 hover:text-red-500 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>登出</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
