import useLogin from '@/pages/Login/useLogin.ts';
import Input from '@/components/Input.tsx';

const Login = () => {
  const h = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Login</h2>
        <form onSubmit={h.handleSubmit} className="space-y-4">
          <Input
            label="Email"
            error={h.form.formState.errors.email?.message}
            type="email"
            {...h.form.register('email')}
            required
          />
          <Input
            label="Password"
            error={h.form.formState.errors.password?.message}
            type="password"
            {...h.form.register('password')}
            required
          />
          <button
            type="submit"
            disabled={h.isSubmitting}
            className="w-full rounded-lg bg-yellow-300 py-2 font-bold text-gray-800 transition-all hover:bg-yellow-400 disabled:opacity-50"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
