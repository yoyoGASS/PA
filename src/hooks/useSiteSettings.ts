import { useApi } from './useApi';
import type { SiteSettings } from '@/lib/types';

export function useSiteSettings() {
  return useApi<SiteSettings>('/settings');
}
