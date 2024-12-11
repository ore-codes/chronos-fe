import { useNavigate } from 'react-router-dom';
import api, { getCSRFToken } from '@/lib/api/axios.ts';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { LoginReq } from './Login.types.ts';

export default function useLogin() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email().required().label('Email address'),
        password: Yup.string().required().label('Password'),
      }).required()
    ),
  });

  const mutation = useMutation({
    async mutationFn(values: LoginReq) {
      await getCSRFToken();
      return api.post('/login', values);
    },
    onSuccess() {
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/dashboard');
    },
    onError(error) {
      console.error(error);
      enqueueSnackbar('Invalid email or password. Please try again.', { variant: 'error' });
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values), console.error);

  return { form, handleSubmit, isSubmitting: mutation.isPending };
}
