import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { api, setToken } from '@/lib/api';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await api.post<{ token: string }>('/auth/login', { password });
      setToken(token);
      navigate('/admin');
    } catch {
      setError('密碼錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-warm flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xl font-serif font-bold tracking-wider text-brown-text">管理後台</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-gray/40 mb-2">
              管理員密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-rose-gold/20 rounded-xl focus:border-rose-gold outline-none transition-colors"
              placeholder="請輸入密碼"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-gold text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-brown-text transition-all disabled:opacity-50"
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-stone-gray/40 hover:text-rose-gold transition-colors">
            ← 返回首頁
          </a>
        </div>
      </div>
    </div>
  );
}
