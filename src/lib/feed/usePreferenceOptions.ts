import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/lib/storage/keys.ts';
import api from '@/lib/api/axios.ts';
import { PreferenceOptionsRes } from '@/pages/Preferences/Preferences.types.ts';

export default function usePreferenceOptions() {
  return useQuery({
    queryKey: [QueryKey.preferenceOptions],
    async queryFn() {
      const res = await api.get<any, PreferenceOptionsRes>('/api/preference-options');
      return res.data;
    },
  });
}
