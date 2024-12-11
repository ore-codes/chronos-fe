import { useNavigate } from 'react-router-dom';
import api, { getCSRFToken } from '@/lib/api/axios.ts';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { SignUpReq } from './Register.types.ts';

export default function useRegister() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().required().label('Name'),
        email: Yup.string().email().required().label('Email address'),
        password: Yup.string()
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
            'Password must be at least six characters long and contain at least one letter and one number'
          )
          .required()
          .label('Password'),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
          .required()
          .label('Confirm Password'),
      }).required()
    ),
  });

  const mutation = useMutation({
    async mutationFn(values: SignUpReq) {
      await getCSRFToken();
      return api.post('/register', values);
    },
    onSuccess() {
      enqueueSnackbar('Registration successful! Please log in.', { variant: 'success' });
      navigate('/login');
    },
    onError(error) {
      console.error(error);
      enqueueSnackbar('Registration failed. Please check your details and try again.', {
        variant: 'error',
      });
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values), console.error);

  return { form, handleSubmit, isSubmitting: mutation.isPending };
}
