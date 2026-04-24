import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PageSkeleton } from '../components/PageSkeleton'; 
import MainLayout from '../layouts/MainLayout';
import ErrorBoundary from '../layouts/ErrorLayout';

const Pages = {
  Main: {
    Dashboard: lazy(() => import('../pages/DashboardPage')),
    Search: lazy(() => import('../pages/SearchScore')),
    Report: lazy(() => import('../pages/ReportPage')),
    Top10: lazy(() => import('../pages/Top10Page'))
  },
};

const withSuspense = (Element: any) => (
  <Suspense fallback={<PageSkeleton />}>{<Element />}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />, 
    children: [
      { 
        index: true, 
        element: withSuspense(Pages.Main.Dashboard) 
      },
      {
        path: 'search', 
        element: withSuspense(Pages.Main.Search) 
      },
      {
        path: 'report',
        element: withSuspense(Pages.Main.Report) 
      },
      {
        path: 'top10',
        element: withSuspense(Pages.Main.Top10) 
      }
    ],
  },
]);