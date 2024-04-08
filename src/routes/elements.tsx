import { Suspense, lazy } from 'react';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Loadable = (Component: React.ComponentType<any>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const MyTask = Loadable(lazy(() => import('../pages/MyTask')));
export const Settings = Loadable(lazy(() => import('../pages/Settings')));
export const NotFound = Loadable(lazy(() => import('../pages/NotFound')));
