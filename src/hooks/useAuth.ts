import { useState, useEffect, useCallback } from 'react';
import { api, setToken, clearToken } from '@/lib/api';

export function useAuth() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  const check = useCallback(() => {
    api.get<{ admin: boolean }>('/auth/me')
      .then(() => setAuthed(true))
      .catch(() => {
        clearToken();
        setAuthed(false);
      });
  }, []);

  useEffect(() => { check(); }, [check]);

  const login = async (password: string) => {
    const { token } = await api.post<{ token: string }>('/auth/login', { password });
    setToken(token);
    setAuthed(true);
  };

  const logout = () => {
    clearToken();
    setAuthed(false);
  };

  return { authed, login, logout };
}
