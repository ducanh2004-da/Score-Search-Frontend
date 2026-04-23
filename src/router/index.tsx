import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PageSkeleton } from '../components/PageSkeleton'; // Bạn giữ nguyên component skeleton của bạn
import MainLayout from '../layouts/MainLayout';
import ErrorBoundary from '../layouts/ErrorLayout'; // Giữ nguyên error layout của bạn

// Khai báo Lazy load cho các trang để tối ưu tốc độ load web
const Pages = {
  Main: {
    Search: lazy(() => import('../pages/SearchScore')),
    Report: lazy(() => import('../pages/ReportPage')),
    Top10: lazy(() => import('../pages/Top10Page'))
  },
};

// Hàm bọc giao diện chờ
const withSuspense = (Element: any) => (
  <Suspense fallback={<PageSkeleton />}>{<Element />}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />, // Bắt lỗi giao diện ở cấp cao nhất
    children: [
      { 
        index: true, 
        element: withSuspense(Pages.Main.Search) // Trang chủ: Tra cứu
      },
      {
        path: 'report',
        element: withSuspense(Pages.Main.Report) // Trang Phổ điểm
      },
      {
        path: 'top10',
        element: withSuspense(Pages.Main.Top10) // Trang Top 10
      }
    ],
  },
]);