import useAuthUser from '@/lib/auth/useAuthUser.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKey } from '@/lib/storage/keys.ts';
import api from '@/lib/api/axios.ts';
import { FeedRes } from '@/pages/Dashboard/Dashboard.types.ts';
import { useState } from 'react';
import usePreferenceOptions from '@/lib/feed/usePreferenceOptions.ts';

export default function useDashboard() {
  const { data: options } = usePreferenceOptions();
  const { data: user } = useAuthUser();
  const [filters, setFilters] = useState({
    keyword: '',
    date: '',
    category: '',
    source: '',
  });

  const feedQuery = useInfiniteQuery({
    queryKey: [QueryKey.feed, filters],
    async queryFn({ pageParam = 1 }) {
      const res = await api.get<any, FeedRes>('/api/articles', {
        params: { ...filters, page: pageParam },
      });
      return res.data;
    },
    getNextPageParam(lastPage) {
      return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    feedQuery.refetch();
  };

  return { user, feedQuery, filters, handleFilterChange, handleSearch, options };
}
