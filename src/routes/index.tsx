import { Navigate, useRoutes } from 'react-router-dom';

import { Dashboard, MyTask } from './elements';
import NotFound from '@/pages/NotFound';
import Layout from '@/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import Settings from '@/pages/Settings';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'my_task', element: <MyTask /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    { path: '404', element: <NotFound /> },
    { path: '500', element: <ErrorPage /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
