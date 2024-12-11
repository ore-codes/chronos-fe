import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api/axios.ts';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();
  const mutation = useMutation({
    async mutationFn() {
      return api.post('/logout');
    },
    onSuccess() {
      enqueueSnackbar('Logged out successfully!');
      navigate('/login');
    },
    onError() {
      enqueueSnackbar('Logout failed. Please try again.', { variant: 'error' });
    },
  });

  return () => mutation.mutateAsync();
}
