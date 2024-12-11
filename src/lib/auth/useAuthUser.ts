import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/lib/storage/keys.ts';
import api from '@/lib/api/axios.ts';
import { AxiosResponse } from 'axios';
import { AuthUser } from '@/lib/auth/Auth.types.ts';

export default function useAuthUser() {
  return useQuery({
    queryKey: [QueryKey.user],
    async queryFn() {
      const res = await api.get<any, AxiosResponse<AuthUser>>('/api/user');
      return res.data;
    },
  });
}
