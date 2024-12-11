import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api/axios.ts';
import { PreferenceRes } from './Preferences.types.ts';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { enqueueSnackbar } from 'notistack';
import usePreferenceOptions from '@/lib/feed/usePreferenceOptions.ts';

export default function usePreferences() {
  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [authorSearchResults, setAuthorSearchResults] = useState([]);
  const { data: options } = usePreferenceOptions();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<any, PreferenceRes>('/api/preferences');
        if (response.data) {
          setSources(response.data.sources || []);
          setCategories(response.data.categories || []);
          setAuthors(response.data.authors || []);
        }
      } catch (error) {
        enqueueSnackbar('Failed to load preferences.', { variant: 'error' });
      }
    })();
  }, []);

  const searchAuthors = debounce(async (query) => {
    if (!query) {
      setAuthorSearchResults([]);
      return;
    }
    try {
      const response = await api.get('/api/authors/search', { params: { q: query } });
      setAuthorSearchResults(response.data || []);
    } catch (error) {
      enqueueSnackbar('Failed to search authors.', { variant: 'error' });
    }
  }, 300);

  const saveMutation = useMutation({
    async mutationFn() {
      return api.post('/api/preferences', { sources, categories, authors });
    },
    onSuccess() {
      enqueueSnackbar('Preferences saved successfully!', { variant: 'success' });
    },
    onError() {
      enqueueSnackbar('Failed to save preferences.', { variant: 'error' });
    },
  });

  return {
    sources,
    setSources,
    categories,
    setCategories,
    authors,
    setAuthors,
    options,
    searchAuthors,
    authorSearchResults,
    setAuthorSearchResults,
    saveMutation,
  };
}
