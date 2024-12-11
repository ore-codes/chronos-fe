import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import Dashboard from '@/pages/Dashboard/Dashboard.tsx';
import Preferences from '@/pages/Preferences/Preferences.tsx';
import useLogout from '@/lib/auth/useLogout.ts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="preferences" element={<Preferences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed left-0 top-0 w-full bg-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-blue-600">
            <Link to="/">Chronos</Link>
          </h1>
          <div className="space-x-4">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
              Login
            </Link>
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

const DashboardLayout = () => {
  const logout = useLogout();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <header className="bg-blue-800 py-4 shadow-md">
        <div className="nmx-auto container flex items-center justify-between px-4">
          <Link to="/dashboard">
            <h1 className="text-2xl font-bold">Chronos</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/preferences"
              className="rounded-lg bg-yellow-300 px-4 py-2 font-bold text-black transition-all hover:bg-yellow-400"
            >
              Preferences
            </Link>
            <button
              onClick={logout}
              className="rounded-lg bg-yellow-300 px-4 py-2 font-bold text-black transition-all hover:bg-yellow-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
