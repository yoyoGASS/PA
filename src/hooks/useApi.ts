import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { getMockData } from '@/lib/mock-data';

const isDemo = import.meta.env.VITE_DEMO === 'true';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    // Demo mode: use mock data directly
    if (isDemo) {
      setData(getMockData<T>(url));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    api.get<T>(url)
      .then(setData)
      .catch((e) => {
        // Fallback to mock data if API unavailable
        const mock = getMockData<T>(url);
        if (mock) {
          setData(mock);
        } else {
          setError(e.message);
        }
      })
      .finally(() => setLoading(false));
  }, [url]);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch };
}
