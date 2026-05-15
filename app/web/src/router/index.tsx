import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { UserRole } from '@repo/types';
import AppLayout from '@/components/layout/AppLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Jobs from '@/pages/Jobs';
import WorkOrders from '@/pages/WorkOrders';
import Contractors from '@/pages/Contractors';
import Settings from '@/pages/Settings';

function ProtectedRoute() {
  const { session, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center">Loading…</div>;
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function RoleGuard({ allow }: { allow: UserRole[] }) {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (!role || !allow.includes(role)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'jobs', element: <Jobs /> },
          { path: 'work-orders', element: <WorkOrders /> },
          {
            element: <RoleGuard allow={['admin']} />,
            children: [
              { path: 'contractors', element: <Contractors /> },
            ],
          },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);
